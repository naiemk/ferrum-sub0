import React from 'react';
import {Page} from '../components/Page';
import {PageContent} from '../components/PageContent';
import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Flex, WhiteSpace} from 'antd-mobile-rn';
import {FormattedMessage} from 'react-intl';
import QRCode from 'react-native-qrcode';
import {Colors} from '../assets/Colors';
import burger from'../assets/burger.png';
import backup from'../assets/backup.png';
import restore from'../assets/restore.png';
import { Col, Row, Grid } from 'react-native-easy-grid';
import logo from '../assets/sub0-header.png';
import {Panel} from '../components/Panel';

export interface MainMenuPageProps {
    address: string;
}

export interface MainMenuPageDispatch {
    onBackupPress: () => void;
    onRestorePress: () => void;
    onStartPress: () => void;
}

export class MainMenuPage extends React.Component<MainMenuPageProps&MainMenuPageDispatch, {menu: boolean}> {
    state = {
        menu: false
    };

    renderAddress() {
        const address1 = this.props.address.substring(0, 21);
        const address2 = this.props.address.substring(21);
        return (
            <PageContent width={250} height={340} padding={8}>
                <Panel style={{padding: 8}}>
                    <Panel.Header style={{height: 40, alignContent: 'center', justifyContent: 'center'}}>
                        <FormattedMessage id='app.youraddress' />
                    </Panel.Header>
                    <Panel.Body>
                        <WhiteSpace />
                        <Flex align='center' justify='around' >
                            <QRCode
                                value={this.props.address}
                                size={180}
                                bgColor='black'
                                fgColor='white'/>
                        </Flex>
                        <WhiteSpace />
                        <Panel style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={Colors.styles.monoTxt}>{address1}</Text>
                            <Text style={Colors.styles.monoTxt}>{address2}</Text>
                        </Panel>
                        <WhiteSpace />
                        <Panel.Footer>
                            <Button type='primary' size='large' onClick={this.props.onStartPress}> <FormattedMessage id='btn.start'/> </Button>
                        </Panel.Footer>
                    </Panel.Body>
                </Panel>
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
                title={<Image source={logo} />}
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
