
export namespace Messages {
    export const en = {
        'app.hello': 'Hello, {name}',
        'app.youraddress': 'Your ETH Address',
        'app.calceljob': 'Are you sure?',

        'btn.previous': 'Back',
        'btn.next': 'Next',
        'btn.start': 'Start',
        'btn.more': 'More',
        'btn.ok': 'Ok',
        'btn.cancel': 'Cancel',

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