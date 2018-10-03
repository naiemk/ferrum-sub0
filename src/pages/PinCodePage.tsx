import React from 'react';
import {Page} from '../components/Page';
import {StyleSheet, TextInput, View} from 'react-native';

export interface PinCodeProps {
    pin: string;
}

export interface PinCodeDispatch {
    onSubmit: (pinCode: string) => void;
}

export class PinCodePage extends React.Component<PinCodeProps&PinCodeDispatch> {
    inputRef: TextInput | undefined = undefined;

    componentDidMount() {
        this.inputRef!.focus();
    }

    render() {
        return (
            <Page>
                <View style={styles.container}>
                    <TextInput
                        ref={el => this.inputRef = el!}
                        placeholder= 'Enter Pin Code'
                        keyboardType= 'number-pad'
                        secureTextEntry={true}
                        onChangeText={this.props.onSubmit}
                    />
                </View>
                <View style={{flex: 3}}>
                </View>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
