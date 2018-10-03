import {Platform, StyleSheet} from 'react-native';

export namespace Colors {
    export const ferrumBkg = '#052532';

    export const styles = StyleSheet.create({
        ferrumTxt: {
            color: '#FFFFFF'
        },
        monoTxt: {
            fontFamily: Platform.OS === 'android'
                ? 'monospace'
                    : 'Courier New'
        }
    });
}