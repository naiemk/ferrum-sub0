
export namespace Messages {
    export const en = {
        'app.title': 'Ferrum Network',
        'app.setupDescription': 'Welcome to Ferrum SubZero Wallet. Please make sure this phone is completely offline.' +
            ' Airplane mode is always on. No SIM card is in the device and WIFI is disabled.' +
            ' Visit https://sub0.ferrum.network before continuing',
        'app.youraddress': 'Your ETH Address',
        'app.calceljob': 'Are you sure?',
        'app.requestTitle': 'Ready for Wallet',
        'app.requestTitleDetails': 'Scan the QR code from your Ferrum Wallet. Once the transaction request is read, we will show you its details' +
            ' and you can sign or cancel the transaction.',
        'app.requestSuccess': 'Request Received',
        'app.requestSuccessMessage': 'Click next to review the request',
        'app.requestSuccessDetails': 'We have received a request from the wallet application. In the next step you check and sign' +
            ' the request.',
        'app.validate': 'Confirm the Request',
        'app.validateDetails': 'Please carefully review the request and make sure addresses and values are exactly what you have provided' +
            ' in the wallet',
        'app.selectPin': 'Select a PIN',
        'app.repeatPin': 'Repeat Your PIN',

        'btn.setup': 'Setup Me Up',
        'btn.previous': 'Back',
        'btn.next': 'Next',
        'btn.start': 'Start',
        'btn.more': 'More',
        'btn.ok': 'Ok',
        'btn.cancel': 'Cancel',
        'btn.close': 'close',

        'menu.backup': 'Backup',
        'menu.backupDetails': 'Create a backup of your private key',
        'menu.restore': 'Restore',
        'menu.restoreDetails': 'Restore your private key from backup'
    };

    export function message(id: string): string {
        // @ts-ignore
        return en[id] as string;
    }
}