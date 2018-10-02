import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../assets/Colors';

export interface PageProps {
    title: ReactNode,
    headerLeft: ReactNode,
    headerRight: ReactNode
}

export const Page: React.StatelessComponent<PageProps> = props => {
    return (
        <View style={styles.body}>
            <View style={styles.toolbar}>
                <View style={styles.toolbarButtonLeft}>
                    <View style={styles.pushBottom}>
                        <Text style={Colors.styles.ferrumTxt}>
                            {props.headerLeft}
                        </Text>
                    </View>
                </View>
                <View style={styles.toolbarTitle}>
                    <View style={styles.pushBottom}>
                        <Text style={[Colors.styles.ferrumTxt, {textAlign: 'center', fontWeight: 'bold'}]}>
                            {props.title}
                        </Text>
                    </View>
                </View>
                <View style={styles.toolbarButtonRight}>
                    <View style={styles.pushBottom}>
                        <Text style={[Colors.styles.ferrumTxt, {textAlign: 'right'}]}>
                            {props.headerRight}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column'
    },
    toolbar: {
        backgroundColor: Colors.ferrumBkg,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between'
    },
    toolbarButtonLeft: {
        width: 50
    },
    toolbarButtonRight: {
        width: 50
    },
    toolbarTitle: {
        flex: 1
    },
    content: {
        backgroundColor: '#ebeef0',
        flex: 1,
        alignContent: 'stretch'
    },
    pushBottom: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }
});
