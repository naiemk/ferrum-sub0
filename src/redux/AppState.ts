
export type PageType = 'splash' | 'startup' | 'pin' | 'setupPin1' | 'setupPin2' | 'publicKey' | 'rpc';

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

export interface AppState {
    mainPage: MainPage,
    setup: SetUp,
    userInfo: UserInfo
}