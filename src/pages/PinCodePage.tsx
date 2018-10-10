import React from 'react';
import {KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native';

export interface PinCodeProps {
    pin: string;
}

export interface PinCodeDispatch {
    onSubmit: (pinCode: string) => void;
}

export class PinCode extends React.Component<PinCodeProps&PinCodeDispatch> {
    inputRef: TextInput | undefined = undefined;

    componentDidMount() {
        this.inputRef!.focus();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <TextInput
                        ref={el => this.inputRef = el!}
                        placeholder= 'Enter 8 digit Pin Code'
                        keyboardType= 'numeric'
                        secureTextEntry={true}
                        onChangeText={this.props.onSubmit}
                        value={this.props.pin}
                        maxLength={8}
                        style={{fontSize: 36}}
                    />
                </View>
            </View>
        );
    }
}

export const PinCodePage: React.StatelessComponent<PinCodeProps&PinCodeDispatch> = props => (
    <KeyboardAvoidingView style={{flex: 1}} behavior= 'padding' enabled>
        <PinCode pin={props.pin} onSubmit={props.onSubmit}/>
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
