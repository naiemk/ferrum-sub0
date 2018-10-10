import {Platform, StyleSheet} from 'react-native';

export namespace Colors {
    export const ferrumBkg = '#efefef'; // '#052532';
    export const pageBkg = '#fff';
    export const shadhows = '#838383';
    export const shadhowsLighter = '#A3A3A3';
    export const error = '#ca002a';

    export const styles = StyleSheet.create({
        ferrumTxt: {
            color: '#FFFFFF'
        },
        monoTxt: {
            fontFamily: Platform.OS === 'android'
                ? 'monospace'
                    : 'Courier New'
        },
        titleTxt: {
            color: '#052532',
            fontSize: 16,
            fontWeight: 'bold'
        }
    });
}