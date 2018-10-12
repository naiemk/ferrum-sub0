import {SignableMessageItem, TransactionRequestItem} from '../components/redux/Types';

export type PageType = 'splash' | 'startup' | 'pin' | 'setupPin1' | 'setupPin2' | 'publicKey' | 'rpc';

export type RpcView = 'receive' | 'success' | 'send' | 'validate';

export type ReqData = TransactionRequestItem | SignableMessageItem;

export interface MainPage {
    pageType: PageType;
}

export interface UserInfo {
    privateKey?: string;
    publicKey?: string;
    pin?: string;
}

export interface SetUp {
    pinCode1?: string;
    pinCode2?: string;
}

export interface Rpc {
    view: RpcView,
    requests?: ReqData[]
}

export interface AppState {
    mainPage: MainPage,
    setup: SetUp,
    userInfo: UserInfo
    rpc: Rpc,
}