import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

export const PageContent: React.StatelessComponent<{padding?: number, width?: number | string, height?: number, style?: ViewStyle}> = props => (
    <View style={[styles.container, {padding: props.padding || 50}, props.style || {}]}>
        <View style={{flex: 0, width: props.width, height: props.height}} >
            {props.children}
        </View>
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
