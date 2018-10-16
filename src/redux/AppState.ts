import {SignableMessageItem, TransactionRequestItem} from '../components/redux/Types';

export type PageType = 'splash' | 'invalidPin' | 'startup' | 'pin' | 'setupPin1' | 'setupPin2' | 'publicKey' | 'rpc' | 'rpcClient';

export type RpcView = 'receive' | 'success' | 'send' | 'validate' | 'info';

export type ReqData = TransactionRequestItem | SignableMessageItem;

export interface MainPage {
    pageType: PageType;
}

export interface UserInfo {
    privateKey?: string;
    publicKey?: string;
    pin?: string;
    invalidPin: boolean;
}

export interface SetUp {
    pinCode1?: string;
    pinCode2?: string;
}

export interface Rpc {
    view: RpcView;
    requests?: ReqData[];
}

export interface RpcClient {
    view: RpcView;
    request?: ReqData;
    returnUrl?: string;
}

export interface AppState {
    mainPage: MainPage,
    setup: SetUp,
    userInfo: UserInfo
    rpc: Rpc,
    rpcClient: RpcClient,
}