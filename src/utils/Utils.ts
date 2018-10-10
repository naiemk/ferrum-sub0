import CryptoJS from 'crypto-js';
import { AsyncStorage } from 'react-native';
import {SignableMessageItem, TransactionRequestItem} from '../components/redux/Types';

class EthereumTx {
    constructor(public parms: Object) {}

    sign(pKey: Buffer): void {
        console.log(pKey);
    }
}

export class StorageError extends Error {}

export namespace Utils {
    export namespace Crypto {

        export function sleep(ms: number): Promise<void> {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        export function encrypt(base64Data: string): string {
            return base64Data;
        }

        export function decrypt(bas64Data: string): string {
            return bas64Data;
        }

        export function base64decode(data: string): any {
            return CryptoJS.enc.Base64.parse(data);
        }

        export function base64encode(data: any): string {
            return CryptoJS.enc.Base64.stringify(data);
        }

        export function parseRequest(req: string): TransactionRequestItem | SignableMessageItem {
            const obj: Object = JSON.parse(req) as Object;
            // @ts-ignore
            const { type, data } = obj;
            if (type === 'tx') {
                return JSON.parse(base64decode(data)) as TransactionRequestItem;
            }

            if (type === 'message') {
                return { message: base64decode(data) };
            }

            throw new Error(`Unsupported type ${type}`);
        }

        export function padZero(s: string, len: number, addZx: boolean = false) {
            const newS = '0'.repeat(len) + s;
            return (addZx ? '0x' : '') + newS.substring(newS.length - len);
        }

        export function erc20MethodCall(req: TransactionRequestItem): string {
            if (!req.coinAddress) {
                return '';
            }

            return `0xa9059cbb${padZero(req.to, 64)}${padZero(req.amount.toString(16), 64)}`;
        }

        /**
         * Returns an Ethereum transaction from a request.
         * @param req The request. Request must follow these rules:
         *  - toAddress and the contract address must be checksumed. Checksums are validated
         */
        export function transactionFromRequest(req: TransactionRequestItem): EthereumTx {
            const txParams = {
                nonce: req.nonce,
                gasPrice: req.gasPrice,
                gasLimit: req.gasLimit,
                to: req.coinAddress || req.to,
                value: req.coinAddress ? 0 : req.amount,
                data: erc20MethodCall(req),
                chainId: 1
            };
            // TODO: Validate addresses and values
            return new EthereumTx(txParams);
        }

        export function sign(privateKey: string, tx: EthereumTx): EthereumTx {
            tx.sign(new Buffer(privateKey));
            return tx;
        }
    }
}

export interface Json {
    [x: string]: string|number|boolean|Date|Json|JsonArray;
}
interface JsonArray extends Array<string|number|boolean|Date|Json|JsonArray> { }

export namespace Datastore {
    const cache: Map<string, string> = new Map<string, string>();
    const ALL_ITEMS_KEY = '@Sub0Store:allData';

    export async function saveAll(data: Object): Promise<void> {
        try {
            const key = ALL_ITEMS_KEY;
            const value = JSON.stringify(data);
            cache.set(key, value);
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    export function loadAll(): Json | undefined {
        if (cache.has(ALL_ITEMS_KEY)) {
            return JSON.parse(cache.get(ALL_ITEMS_KEY)!);
        }

        return undefined;
    }

    export async function loadAllAsync(): Promise<Json | undefined> {
        try {
            let value = loadAll();
            if (!value) {
                const newValue = await AsyncStorage.getItem(ALL_ITEMS_KEY);
                if (newValue) {
                    cache.set(ALL_ITEMS_KEY, newValue!);
                    return JSON.parse(newValue!);
                }
            }

            return value;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}