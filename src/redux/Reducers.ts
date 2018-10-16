import {AnyAction, combineReducers} from 'redux';
import {MainPage, ReqData, Rpc, RpcClient, SetUp, UserInfo} from './AppState';
import {ActionTypes} from './Actions';
import {Datastore, Utils} from '../utils/Utils';
import {TransactionRequestItem} from '../components/redux/Types';
import {Alert} from 'react-native';

function mainPage(state: MainPage = {pageType: 'splash'}, action: AnyAction): MainPage {
    switch (action.type) {
        case ActionTypes.OPEN_STARTUP_PAGE:
            return { ...state, pageType: 'startup' };
        case ActionTypes.OPEN_PIN_PAGE:
            return { ...state, pageType: 'pin'};
        case ActionTypes.OPEN_PIN_PAGE_1:
            return { ...state, pageType: 'setupPin1'};
        case ActionTypes.OPEN_PIN_PAGE_2:
            return { ...state, pageType: 'setupPin2'};
        case ActionTypes.OPEN_PUBLIC_ADDR_PAGE:
            return { ...state, pageType: 'publicKey'};
        case ActionTypes.OPEN_RPC_PAGE:
            return { ...state, pageType: 'rpc'};
        case ActionTypes.OPEN_KEY_PAGE:
            return { ...state, pageType: 'pin'};
        case ActionTypes.OPEN_RPC_CLIENT_PAGE_SEND:
            return { ...state, pageType: 'rpcClient'};
        case ActionTypes.PIN_ENTERED:
            return { ...state, pageType: 'publicKey'};
        default: return state;
    }
}

function setup(state: SetUp = {}, action: AnyAction): SetUp {
    switch (action.type) {
        case ActionTypes.SETUP_SET_PIN1:
            return { ...state, pinCode1: action.payload };
        case ActionTypes.SETUP_SET_PIN2:
            // This is where we set the public key
            return { ...state, pinCode1: action.payload };
        default:
    }
    return state;
}

function _createAndSaveKeys(pin: string) {
    if (!pin) {
        throw new Error('PIN is empty!');
    }

    const { privateKey, publicKey, salt, iv } = Utils.Crypto.newKeyPair();
    const paddedOk = '_OK_' + Utils.Crypto.randomPadding();
    Datastore.saveAll({
        salt: salt,
        iv: iv,
        encryptedPaddedOk: Utils.Crypto.encryptWithPin(pin, salt, iv, paddedOk),
        encryptedPublicKey: Utils.Crypto.encryptWithPin(pin, salt, iv, publicKey),
        encryptedPrivateKey: Utils.Crypto.encryptWithPin(pin, salt, iv, privateKey)
    });
    return { privateKey: privateKey, publicKey: publicKey };
}

function userInfo(state: UserInfo = { invalidPin: false }, action: AnyAction): UserInfo {
    switch (action.type) {
        case ActionTypes.OPEN_PIN_PAGE:
            return { invalidPin: false };
        case ActionTypes.SETUP_COMPLETE:
            const { privateKey, publicKey } = _createAndSaveKeys(state.pin!);

            return { ...state, publicKey: publicKey, privateKey: privateKey };
        case ActionTypes.PIN_ENTERED:
            const encryptedData = Datastore.loadAll()!;
            const pin = action.payload as string;
            const { salt, iv } = encryptedData;
            try {
                const paddedOk = Utils.Crypto.decryptWithPin(pin, salt, iv, encryptedData.encryptedPaddedOk);
                if (!paddedOk || !(paddedOk.indexOf('OK') >= 0)) {
                    return { invalidPin: true };
                }
            } catch (e) {
                if (e.toString().toLowerCase().substring('nvalid utf-8')) {
                    return { invalidPin: true };
                }
            }

            const decodedPrivateKey = Utils.Crypto.decryptWithPin(pin, salt, iv, encryptedData.encryptedPrivateKey);
            const decodedPublicKey = Utils.Crypto.decryptWithPin(pin, salt, iv, encryptedData.encryptedPublicKey);
            return {
                invalidPin: false,
                pin: 'X',
                publicKey: decodedPublicKey,
                privateKey: decodedPrivateKey
            };
        case ActionTypes.SETUP_SET_PIN2:
            // Creating the pin because we want to later save it
            return { ...state, pin: action.payload };
        default:
    }
    return state;
}

function rpc(state: Rpc = { view: 'receive' }, action: AnyAction): Rpc {
    switch (action.type) {
        case ActionTypes.OPEN_RPC_PAGE:
            return { ...state, view: 'receive', requests: undefined };
        case ActionTypes.OPEN_RPC_SEND_PAGE:
            return { ...state, view: 'send' };
        case ActionTypes.OPEN_RPC_VALIDATE_PAGE:
            return { ...state, view: 'validate' };
        case ActionTypes.OPEN_RPC_SUCCESS_PAGE:
            return { ...state, view: 'receive' };
        case ActionTypes.RPC_DATA_READ:
            return { ...state, requests: action.payload as ReqData[], view: 'success' };
        default:
    }
    return state;
}

function rpcClient(state: RpcClient = { view: 'info' }, action: AnyAction): RpcClient {
    console.log('aaa', action)
    switch (action.type) {
        case ActionTypes.OPEN_RPC_CLIENT_PAGE_SEND:
            const payload = action.payload;
            console.log('Payload is ', payload);
            const path = (payload || {}).path as string;
            const queryParams = (payload || {}).queryParams as TransactionRequestItem;
            console.log('Payload f is ', path, queryParams)
            const isTx = path === 'sign/tx';
            console.log('isTx ', isTx)
            // @ts-ignore
            const queryData = queryParams.data;
            // @ts-ignore
            const returnUrl = queryParams.returnUrl;
            const reqData = isTx ?
                {
                    to: queryParams.to,
                    amount: Number(queryParams.amount),
                    nonce: Number(queryParams.nonce || 0),
                    from: queryParams.from,
                    coinAddress: queryParams.coinAddress,
                    currency: queryParams.currency,
                    network: queryParams.network || queryParams.currency,
                    gasPrice: Number(queryParams.gasPrice || 0),
                    gasLimit: Number(queryParams.gasLimit || 0)
                } : { message: queryData };
            return { ...state, view: 'send', request: reqData, returnUrl: returnUrl };
        case ActionTypes.OPEN_RPC_CLIENT_PAGE_RECEIVE:
            return { ...state, view: 'receive' };
        case ActionTypes.OPEN_RPC_CLIENT_PAGE_INFO:
            return { view: 'info' };
        case ActionTypes.RPC_CLIENT_DATA_READ:
            // TODO: Redirect to the returnUrl with signed data.
            setTimeout(() => Alert.alert('Transaction was successfully signed'), 100);
            return { view: 'info' };
        default:
    }
    return state;
}

export const rootReducer = combineReducers({
    mainPage,
    setup,
    userInfo,
    rpc,
    rpcClient
    }
);
