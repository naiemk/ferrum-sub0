import React from 'react';
import {Page} from '../components/Page';
import {PageContent} from '../components/PageContent';
import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, Flex, WhiteSpace, WingBlank} from 'antd-mobile-rn';
import {FormattedMessage} from 'react-intl';
import QRCode from 'react-native-qrcode';
import {Colors} from '../assets/Colors';
import burger from'../assets/burger-white.png';
import backup from'../assets/backup.png';
import restore from'../assets/restore.png';

export interface MainMenuPageProps {
}

export interface MainMenuPageDispatch {
}

export class MainMenuPage extends React.Component<MainMenuPageProps&MainMenuPageDispatch, {menu: boolean}> {
    state = {
        menu: false
    };

    renderAddress() {
        return (
            <PageContent height={300} padding={8}>
                <WingBlank size='lg'>
                    <Card style={{minWidth: 250, padding: 16}}>
                        <Card.Header title={<FormattedMessage id='app.youraddress' />} />
                        <Card.Body style={{padding: 8, alignContent: 'center', justifyContent: 'center'}}>
                            <Flex align='center' justify='around' >
                                <QRCode
                                    value={'ASKLDJJASDLASJDLASDJ'}
                                    size={180}
                                    bgColor='black'
                                    fgColor='white'/>
                            </Flex>
                            <WhiteSpace />

                            <Card>
                                <Card.Body style={{padding: 4}}>
                                    <Text style={Colors.styles.monoTxt}>0xsej434kj534l5jh34j34j5hb34kj53kl5h3k4h53k534</Text>
                                </Card.Body>
                            </Card>

                            <WhiteSpace />

                            <WingBlank size='sm'>
                                <Button type='primary' size='large'> <FormattedMessage id='btn.start'/> </Button>
                            </WingBlank>
                        </Card.Body>
                    </Card>
                </WingBlank>
            </PageContent>
        );
    }

    renderMenuItem(textId: string, detailsId: string, icon: ImageSourcePropType) {
        return (
            <View style={styles.menuItem}>
                <TouchableOpacity>
                    <Flex direction='row'  justify='start'>
                        <Image source={icon}/>
                        <Flex direction='column' justify='start' align='start'>
                            <FormattedMessage id={textId}>
                                {
                                    (txt) => <Text style={styles.menuItemText}>{txt}</Text>
                                }
                            </FormattedMessage>
                            <FormattedMessage id={detailsId}>
                                {
                                    (txt) => <Text style={styles.menuItemTextDetails}>{txt}</Text>
                                }
                            </FormattedMessage>
                        </Flex>
                    </Flex>
                </TouchableOpacity>
            </View>
        );
    }

    renderMenu() {
        return (
            <View style={{flex: 1, padding: 8}}>
                {this.renderMenuItem('menu.backup', 'menu.backupDetails', backup)}
                {this.renderMenuItem('menu.restore', 'menu.restoreDetails', restore)}
            </View>
        );
    }

    render() {
        const burgerMenu = (
            <TouchableOpacity onPress={() => this.setState({...this.state, menu: !this.state.menu})}>
                <Image source={burger} />
            </TouchableOpacity>
        );

        return (
            <Page
                showHeader={true}
                title='Ferrum Sub Zero Wallet'
                headerRight={burgerMenu}
            >
                {this.state.menu ? this.renderMenu() : this.renderAddress()}
            </Page>);
    }
}

const styles = StyleSheet.create({
    menuItem: {
        flex: 0,
        width: '100%',
        height: 75,
        marginRight: 4,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    menuItemText: {
        fontSize: 18
    },
    menuItemTextDetails: {
        fontSize: 12,
        marginTop: 4
    }
});
