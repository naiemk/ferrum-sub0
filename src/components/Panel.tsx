import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Colors} from '../assets/Colors';

export interface PanelProps {
    style?: ViewStyle;
}

export interface PanelHeaderProps {
    style?: ViewStyle;
}

export class Panel extends React.Component<PanelProps, {}> {
    static readonly Header: React.StatelessComponent<PanelHeaderProps> = props => (
        <View style={[styles.panelHeaderStyle, props.style || {}]}>
            {props.children}
        </View>
    )

    static readonly Body: React.StatelessComponent<PanelProps> = props => (
        <View style={[styles.panelBodyStyle, props.style || {}]}>
            {props.children}
        </View>
    )

    static readonly Footer: React.StatelessComponent<PanelProps> = props => (
        <View style={[styles.panelFooterStyle, props.style || {}]}>
            {props.children}
        </View>
    )

    render() {
        return (
            <View style={[styles.panelStyle, this.props.style || {}]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panelStyle: {
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Colors.shadhows,
        borderRadius: 8,
        backgroundColor: Colors.pageBkg
    },
    panelFooterStyle: {
        borderWidth: 0,
        borderColor: Colors.shadhowsLighter,
        borderTopWidth: 1
    },
    panelHeaderStyle: {
        borderWidth: 0,
        borderColor: Colors.shadhowsLighter,
        borderBottomWidth: 1
    },
    panelBodyStyle: {
        padding: 8
    }
});
