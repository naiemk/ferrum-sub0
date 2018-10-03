import React from 'react';
import {StyleSheet, View} from 'react-native';

export const PageContent: React.StatelessComponent<{padding?: number, width?: number | string, height?: number}> = props => (
    <View style={[styles.container, {padding: props.padding || 50, width: props.width, height: props.height}]}>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
