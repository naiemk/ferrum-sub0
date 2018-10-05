import React from 'react';
import {Page} from '../components/Page';
import {PageContent} from '../components/PageContent';
import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Card, Flex, WhiteSpace, WingBlank} from 'antd-mobile-rn';
import {FormattedMessage} from 'react-intl';
import QRCode from 'react-native-qrcode';
import {Colors} from '../assets/Colors';
import burger from'../assets/burger-white.png';
import backup from'../assets/backup.png';
import restore from'../assets/restore.png';
import { Col, Row, Grid } from 'react-native-easy-grid';

export interface MainMenuPageProps {
    address: string;
}

export interface MainMenuPageDispatch {
    onBackupPress: () => void;
    onRestorePress: () => void;
}

export class MainMenuPage extends React.Component<MainMenuPageProps&MainMenuPageDispatch, {menu: boolean}> {
    state = {
        menu: false
    };

    renderAddress() {
        const address1 = this.props.address.substring(0, 21);
        const address2 = this.props.address.substring(21);
        return (
            <PageContent height={300} padding={8}>
                <WingBlank size='lg'>
                    <Card style={{minWidth: 250, padding: 16}}>
                        <Card.Header title={<FormattedMessage id='app.youraddress' />} />
                        <Card.Body style={{padding: 8, alignContent: 'center', justifyContent: 'center'}}>
                            <Flex align='center' justify='around' >
                                <QRCode
                                    value={this.props.address}
                                    size={180}
                                    bgColor='black'
                                    fgColor='white'/>
                            </Flex>
                            <WhiteSpace />

                            <Card >
                                <Card.Body style={{padding: 4, alignItems: 'center'}}>
                                    <Text style={Colors.styles.monoTxt}>{address1}</Text>
                                    <Text style={Colors.styles.monoTxt}>{address2}</Text>
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

    renderMenuItem(textId: string, detailsId: string, icon: ImageSourcePropType, onPress: () => void) {
        return ( <Grid style={{height: 80}} onTouchStart={onPress}>
                <Row style={[styles.menuItem, {height: 80, alignItems: 'center'}]}>
                    <Col style={{width: 70}}>
                        <Image source={icon}/>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
            </Grid>
        );
    }

    renderMenu() {
        return (
            <Grid>
                <Row style={{height: 170, padding: 4}}>
                    <Col>
                        {this.renderMenuItem('menu.backup', 'menu.backupDetails', backup, () => this.props.onBackupPress)}
                        {this.renderMenuItem('menu.restore', 'menu.restoreDetails', restore, () => this.props.onRestorePress)}
                    </Col>
                </Row>
            </Grid>
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
        // flex: 0,
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
