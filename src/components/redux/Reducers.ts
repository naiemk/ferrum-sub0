import {TextWithName} from './Types';
import {AnyAction} from 'redux';
import {ActionTypes} from './Actions';

export function textWithNameReducer(state: TextWithName = {name: 'Yo'}, action: AnyAction): TextWithName {
    switch (action.type) {
        case ActionTypes.SAY_HI:
            return { ...state, name: state.name === 'Yo' ? 'Ja' : 'Yo' };
        default: return state;
    }
}