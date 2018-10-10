
export interface TextWithName {
    name: string;
}

export interface SignableMessageItem {
    message: string;
}

export interface TransactionRequestItem {
    nonce: number;
    from: string;
    to: string;
    coinAddress?: string;
    currency: string;
    network: string;
    amount: number;
    gasPrice: number;
    gasLimit: number;
}