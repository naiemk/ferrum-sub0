import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {Colors} from '../assets/Colors';

export const FormattedText: React.StatelessComponent<{bold?: boolean, style?: TextStyle}> = props => (
    <Text
        style={[
            Colors.styles.monoTxt,
            styles.text,
            { fontWeight: (props.bold || false) ? 'bold' : undefined },
            props.style || {}
            ]}
    >
        {props.children}
    </Text>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 14
    }
});