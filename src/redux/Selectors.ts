import {AppState, ReqData} from './AppState';
import {createSelector} from 'reselect';
import {Utils} from '../utils/Utils';

const getPrivateKey = (state: AppState) => state.userInfo.privateKey!;
const getReqData = (state: AppState) => state.rpc.requests!;

export const getSignedReqData = createSelector(
    [getPrivateKey, getReqData],
    (privateKey: string, data: ReqData[]) => {
        const signed = data.map((r: ReqData) => Utils.Crypto.signReqData(privateKey, r));
        return signed.join('_&_');
    }
);