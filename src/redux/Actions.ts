import {AnyAction} from 'redux';
import {PageActionTypes} from '../components/redux/Actions';

export enum ActionTypes {
    OPEN_STARTUP_PAGE = 'OPEN_STARTUP_PAGE',
    OPEN_PIN_PAGE = 'OPEN_PIN_PAGE',
    OPEN_PIN_PAGE_1 = 'OPEN_PIN_PAGE_1',
    OPEN_PIN_PAGE_2 = 'OPEN_PIN_PAGE_2',
    OPEN_PUBLIC_ADDR_PAGE = 'OPEN_PUBLIC_ADDR_PAGE',
    OPEN_RPC_PAGE = 'OPEN_RPC_PAGE',
    OPEN_KEY_PAGE = 'OPEN_KEY_PAGE',

    SETUP_SET_PIN1 = 'SETUP_SET_PIN1',
    SETUP_SET_PIN2 = 'SETUP_SET_PIN2',
    SETUP_COMPLETE = 'SETUP_COMPLETE'
}

export function addAction<T>(aType: ActionTypes | PageActionTypes, payload: T): AnyAction {
    return {
        type: aType,
        payload: payload
    };
}
