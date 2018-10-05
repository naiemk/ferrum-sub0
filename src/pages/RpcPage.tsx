import React from 'react';
import {Page} from '../components/Page';
import {PageContent} from '../components/PageContent';
import {ActionSheet, Button, Card, Flex, Modal, WhiteSpace, WingBlank} from 'antd-mobile-rn';
import {StyleSheet, Text, TouchableOpacity,} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Messages} from '../resources/Messages';
const alert = Modal.alert;

interface BodyProps {
    titleId: string;
    titleHelpId: string;
    nextDisabled: boolean;
    onCloseClicked: () => void;
}

class Body extends React.Component<BodyProps, {}> {
    state = {
    };

    showActionSheet() {
        ActionSheet.showActionSheetWithOptions({
            options: [ Messages.message('btn.close') ],
            cancelButtonIndex: 0,
            destructiveButtonIndex: 0,
            message: Messages.message('brn.close'),
        }, () => { console.log('Action clicked'); });
    }

    showDeleteAlert() {
        alert(Messages.message('btn.cancel'), Messages.message('app.calceljob'), [
            { text: Messages.message('btn.cancel'), onPress: () => console.log('cancel'), style: 'default' },
            { text: Messages.message('brn.ok'), onPress: this.props.onCloseClicked },
        ]);
    }

    render() {
        const cardTitle = (
          <Grid>
              <Row>
                  <Col>
                      <FormattedMessage id={this.props.titleId} />
                  </Col>
                  <Col>
                      <TouchableOpacity onPress={() => this.showActionSheet()}>
                          <Text>I</Text>
                      </TouchableOpacity>
                  </Col>
              </Row>
          </Grid>
        );
        return (
            <PageContent height={300} padding={8}>
                <WingBlank size='lg'>
                    <Card style={styles.card}>
                        <Card.Header title={cardTitle} />
                        <Card.Body style={styles.carBody}>
                            <Flex align='center' justify='around' >
                                {this.props.children}
                            </Flex>

                            <WhiteSpace />

                            <WingBlank size='sm'>
                                <Grid>
                                    <Row>
                                        <Col>
                                            <Button type='primary' onPress={() => this.showDeleteAlert()} size='large'> {'X'} </Button>
                                        </Col>
                                        <Col>
                                            <Button type='primary' disabled={this.props.nextDisabled} size='large'> {'>'} </Button>
                                        </Col>
                                    </Row>
                                </Grid>
                            </WingBlank>
                        </Card.Body>
                    </Card>
                </WingBlank>
            </PageContent>
        );
    }
}

export interface RpcPageProps {
    step: 'receive' | 'success' | 'send' | 'validate';
    request?: string[];
}

export interface RpcPageDispatch {
    receiveCompleted: (request: string) => void;
    onClosePressed: () => void;
    successConfirmed: () => void;
    requestApproved: () => void;
}

export class RpcPage extends React.Component<RpcPageProps&RpcPageDispatch, {}> {

    render() {
        return (
            <Page
                showHeader={true}
                title='Ferrum Sub Zero Wallet'
            >
                <Body />
            </Page>);
    }
}

const styles = StyleSheet.create({
    card: {
        minWidth: 250,
        padding: 16
    },
    carBody: {
        padding: 8,
        alignContent: 'center',
        justifyContent: 'center'
    }
});
