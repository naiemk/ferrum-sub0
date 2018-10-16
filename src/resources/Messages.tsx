
export namespace Messages {
    export const en = {
        'app.title': 'Ferrum Network',
        'app.setupDescription': 'Welcome to Ferrum SubZero Wallet. Please make sure this phone is completely offline.' +
            ' Airplane mode is always on. No SIM card is in the device and WIFI is disabled.' +
            ' Visit https://sub0.ferrum.network before continuing',
        'app.youraddress': 'Your ETH Address',
        'app.calceljob': 'Are you sure?',
        'app.requestTitle': 'Scan from Warm Wallet',
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
        'app.send': 'Signed - Use Warm Wallet',
        'app.sendDetails': 'This code represents the requests signed using your private key.' +
            ' Use your Sub0 warm wallet to scan this code and complete your transaction',
        'app.invalidPinDescription': 'The PIN you entered is not valid',

        'app.rpcClientOnClose': 'You can close this app or keep it in background',
        'app.rpcClientInfo': 'Ferrum SUB90 Warm Wallet',
        'app.rpcClientInfoDetails': 'Use your favorite app with Ferrum SUB0 support in conjunction with this wallet.' +
            ' You need a Ferrum SUB0 cold wallet already set up.',
        'app.rpcClientInfoLink': 'Visit https://sub0.ferrum.network for more information',
        'app.clientSendTitle': 'Use Cold Wallet to Scan',
        'app.clientSendTitleDetails': 'Use your SUB0 cold wallet to scan this request. You can then follow the instructions on the ' +
            ' SUB0 cold wallet to approve and complete the request.',
        'app.clientReceiveTitle': 'Scan Signed Data from Cold Wallet',
        'app.clientReceiveTitleDetails': 'If you have used the previous page to send a request to the Ferrum SUB0 Cold Wallet, and continued' +
            ' the prompts on the cold wallet, you can now use this page to read the signed request from the cold wallet.',

        'btn.setup': 'Setup Me Up',
        'btn.previous': 'Back',
        'btn.next': 'Next',
        'btn.start': 'Start',
        'btn.more': 'More',
        'btn.ok': 'Ok',
        'btn.cancel': 'Cancel',
        'btn.close': 'close',
        'btn.tryAgain': 'Try Again',

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