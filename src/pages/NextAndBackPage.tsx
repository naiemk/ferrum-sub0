import React from 'react';
import {Page} from '../components/Page';
import {StyleSheet, View} from 'react-native';
import {Button} from 'antd-mobile-rn';
import {FormattedMessage} from 'react-intl';

export interface NextAndBackPageProps {
    showNext: boolean;
    showBack: boolean;
    title: string;
}

export interface NextAndBackPageDispatch {
    onNext: () => void;
    onBack: () => void;
}

export class NextAndBackPage extends React.Component<NextAndBackPageProps&NextAndBackPageDispatch> {
    render() {
        const {showNext, showBack} = this.props;
        const footer = (
            <View style={styles.footer}>
                <View>
                    {showBack && <Button style={styles.btn} type='warning' onClick={this.props.onBack} > <FormattedMessage id= 'btn.previous' />
                                 </Button>}
                </View>
                <View>
                    {showNext && <Button style={styles.btn} type='primary' onClick={this.props.onNext}> <FormattedMessage id= 'btn.next' /> </Button>}
                </View>
            </View>
        );

        return (
            <Page showHeader={true} title={this.props.title} showFooter={true} footer={footer}>
                {this.props.children}
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    btn: {
        height: 30
    }
});
