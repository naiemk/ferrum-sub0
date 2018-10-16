import CryptoJS from 'crypto-js';
import { AsyncStorage } from 'react-native';
import {SignableMessageItem, TransactionRequestItem} from '../components/redux/Types';
import {ReqData} from '../redux/AppState';
import {Buffer} from 'buffer';

class EthereumTx {
    public data: string = '';
    constructor(public parms: Object) {}

    sign(pKey: Buffer): void {
        console.log(pKey);
    }
}

export class StorageError extends Error {}

export namespace Utils {
    export namespace Crypto {
        const KEY_SIZE = 256;
        const IV_SIZE = 128;
        const ITERATIONS = 100;

        export function sleep(ms: number): Promise<void> {
            return new Promise(resolve => setTimeout(resolve, ms));
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

        export function signString(privateKey: string, data: string): string {
            // TODO: Sign actually
            return data + privateKey;
        }

        export function signReqData(privateKey: string, data: ReqData): string {
            const message = data as  SignableMessageItem;
            if (message.message) {
                return signString(privateKey, message.message);
            }

            // let tx = transactionFromRequest(data as TransactionRequestItem);
            // tx = sign(privateKey, tx);
            // return tx.data;

            // TODO. Return actual transaction
            const toSign = data;
            // @ts-ignore
            toSign.signature = '0xaafcfc9893829e482u98cf89cy9c7987f987f98x7987x87987e898798798798f7e98';
            return JSON.stringify(toSign);
        }

        export function decryptWithPin(pin: string, salt: string, iv: string, data: string) {
            console.log('DEcoding', pin, salt, iv, data);
            salt = CryptoJS.enc.Hex.parse(salt);
            iv = CryptoJS.enc.Hex.parse(iv);
            const key = CryptoJS.PBKDF2(pin, salt, {
                keySize: KEY_SIZE / 32,
                iterations: ITERATIONS
            });

            const decrypted = CryptoJS.AES.decrypt(data, key, {
                iv: iv,
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC
            }).toString();

            const decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(decrypted));

            console.log('GOT DEC', decoded);
            return decoded;
        }

        export function getSalt() {
            return CryptoJS.lib.WordArray.random(IV_SIZE / 8).toString();
        }

        export function encryptWithPin(pin: string, salt: string, iv: string, data: string) {
            const key = CryptoJS.PBKDF2(pin, CryptoJS.enc.Hex.parse(salt), {
                keySize: KEY_SIZE / 32,
                iterations: ITERATIONS
            });
            const encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: CryptoJS.enc.Hex.parse(iv),
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC
            }).toString();

            console.log('Enc got', encrypted);
            return encrypted;
        }

        export function newKeyPair() {
            return { privateKey: '0x', publicKey: '0x1b0182339d88dec8ffe1855d7f4fba0ef5a20b06', salt: getSalt(), iv: getSalt() };
        }

        export function randomPadding() {
            return (Math.random() * 10000000).toString();
        }
    }

    export function parseReq(json: string): ReqData[] | undefined {
        try {
            return JSON.parse(json);
        } catch (e) {
            return undefined;
        }
    }

    export function stringifyRequest(requests: ReqData[]) {
        return JSON.stringify(requests);
    }
}

export interface Json {
    [x: string]: string|number|boolean|Date|Json|JsonArray;
}
interface JsonArray extends Array<string|number|boolean|Date|Json|JsonArray> { }

export namespace Datastore {
    const cache: Map<string, string> = new Map<string, string>();
    const ALL_ITEMS_KEY = '@Sub0Store:allData';

    export interface PersistentData {
        salt: string;
        iv: string;
        encryptedPrivateKey: string;
        encryptedPublicKey: string;
        encryptedPaddedOk: string;
    }

    export async function saveAll(data: PersistentData): Promise<void> {
        try {
            const key = ALL_ITEMS_KEY;
            const value = JSON.stringify(data);
            console.log('SAVING', value);
            cache.set(key, value);
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    export function loadAll(): PersistentData | undefined {
        if (cache.has(ALL_ITEMS_KEY)) {
            return JSON.parse(cache.get(ALL_ITEMS_KEY)!);
        }

        return undefined;
    }

    export async function loadAllAsync(): Promise<PersistentData | undefined> {
        try {
            let value = loadAll();
            if (!value) {
                const newValue = await AsyncStorage.getItem(ALL_ITEMS_KEY);
                console.log('LOADING FROM PERS', newValue);
                if (newValue) {
                    cache.set(ALL_ITEMS_KEY, newValue!);
                    return JSON.parse(newValue!) as PersistentData;
                }
            }

            return value;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    export async function deleteaAll(): Promise<void> {
        await AsyncStorage.removeItem(ALL_ITEMS_KEY);
    }
}