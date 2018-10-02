import {AnyAction} from 'redux';

export enum ActionTypes {
    SAY_HI = 'SAY_HI'
}

export function addAction<T>(aType: ActionTypes, payload: T): AnyAction {
    return {
        type: aType,
        payload: payload
    };
}