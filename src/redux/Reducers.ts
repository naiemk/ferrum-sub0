import {AnyAction, combineReducers} from 'redux';
import {MainPage, SetUp, UserInfo} from './AppState';
import {ActionTypes} from './Actions';

function mainPage(state: MainPage = {pageType: 'splash'}, action: AnyAction): MainPage {
    switch (action.type) {
        case ActionTypes.OPEN_STARTUP_PAGE:
            return { ...state, pageType: 'startup' };
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

function userInfo(state: UserInfo = {}, action: AnyAction): UserInfo {
    switch (action.type) {
        case ActionTypes.SETUP_COMPLETE:
            return { ...state, publicKey: '0x1b0182339d88dec8ffe1855d7f4fba0ef5a20b06'};
        default:
    }
    return state;
}

export const rootReducer = combineReducers({
    mainPage,
    setup,
    userInfo
    }
);
