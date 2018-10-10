import React from 'react';
import {PageContent} from '../components/PageContent';
import {ActionSheet, Badge, Flex, Modal, WhiteSpace} from 'antd-mobile-rn';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {Col, Grid} from 'react-native-easy-grid';
import {Messages} from '../resources/Messages';
import {Panel} from '../components/Panel';
import {Page} from '../components/Page';
import check from '../assets/check.png';
import info from '../assets/info.png';
import {SignableMessageItem, TransactionRequestItem} from '../components/redux/Types';
import Carousel from 'react-native-snap-carousel';
import {Colors} from '../assets/Colors';
import {FormattedText} from '../components/FormattedText';
import {Receiver} from '../components/qrcom/Receiver';
import {Sender} from '../components/qrcom/Sender';
import cancel from '../assets/cancel.png';
import next from '../assets/next.png';
import logo from '../assets/sub0-header.png';
const alert = Modal.alert;

interface BodyProps {
    titleId: string;
    titleHelpId: string;
    nextDisabled: boolean;
    onCloseClicked: () => void;
    onNextClicked: () => void;
}

class Body extends React.Component<BodyProps, {}> {
    state = {
    };

    showActionSheet() {
        ActionSheet.showActionSheetWithOptions({
            options: [ Messages.message('btn.close') ],
            cancelButtonIndex: 0,
            destructiveButtonIndex: 0,
            message: Messages.message(this.props.titleHelpId)
        }, () => { console.log('Action clicked'); });
    }

    showDeleteAlert() {
        alert(Messages.message('btn.cancel'), Messages.message('app.calceljob'), [
            { text: Messages.message('btn.cancel'), onPress: () => console.log('cancel'), style: 'default' },
            { text: Messages.message('btn.ok'), onPress: this.props.onCloseClicked }
        ]);
    }

    render() {
        const cardTitle = (
          <Grid style={{padding: 8}}>
              <Col style={{flex: 1}}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <FormattedMessage id={this.props.titleId} />
                  </View>
              </Col>
              <Col style={{width: 50, alignContent: 'flex-end'}}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                      <TouchableOpacity onPress={() => this.showActionSheet()}>
                          <Image style={{width: 25, height: 25}} source={info}/>
                      </TouchableOpacity>
                  </View>
              </Col>
          </Grid>
        );
        return (
            <PageContent height={270} width={250} padding={8}>
                <Panel style={styles.card}>
                    <Panel.Header style={{height: 40}}>{cardTitle}</Panel.Header>
                    <Panel.Body style={styles.carBody}>
                        <Flex align='center' justify='around' >
                            {this.props.children}
                        </Flex>
                    </Panel.Body>
                    <Panel.Footer style={{height: 40, padding: 8}}>
                        <Grid>
                            <Col style={{width: 40}}>
                                <TouchableOpacity onPress={() => this.showDeleteAlert()} >
                                    <Image source={cancel} style={{width: 30, height: 30}} />
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                {undefined}
                            </Col>
                            <Col style={{width: 30, alignSelf: 'center'}}>
                                <TouchableOpacity disabled={this.props.nextDisabled} onPress={this.props.onNextClicked} >
                                    <Image source={next} style={{width: 30, height: 30, opacity: this.props.nextDisabled ? 0.5 : 1}} />
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </Panel.Footer>
                </Panel>
            </PageContent>
        );
    }
}

interface SubPageProps {
    onClose: () => void;
    onNext: () => void; }

export const SuccessView: React.StatelessComponent<SubPageProps> = props => (
    <Body
        nextDisabled={false}
        onCloseClicked={props.onClose}
        titleId='app.requestSuccess'
        titleHelpId='app.requestSuccessDetails'
        onNextClicked={props.onNext}
    >
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image source={check} />
            <WhiteSpace/>
            <FormattedMessage id='app.requestSuccessMessage' />
        </View>
    </Body>
);

const RequestItem: React.StatelessComponent<{ item: ReqData, index: number, size: number}> = props => {
    const message = (props.item as SignableMessageItem).message;
    const req = props.item as TransactionRequestItem;
    const renderCoinAddress = (address: string) => (
        <View>
            <View style={{flexDirection: 'row'}}>
                <FormattedText bold={true}>ERC-20 Contract:</FormattedText>
            </View>
            <View style={{flexDirection: 'row'}}>
                <FormattedText bold={true}>to:</FormattedText>
                <FormattedText> {address.substring(0, 21)} </FormattedText>
            </View>
            <View style={{flexDirection: 'row'}}>
                <FormattedText bold={true}>   </FormattedText>
                <FormattedText> {address.substring(21)} </FormattedText>
            </View>
        </View>
    );

    const content = message ? (
        <Text>
            {message}
        </Text>
    ) : (
        <View>
            <View style={{flexDirection: 'row'}}>
                <FormattedText style={{color: Colors.error}} bold={true}>{req.amount.toFixed(6)} </FormattedText>
                <FormattedText>{req.currency} </FormattedText>
            </View>
            <View style={{flexDirection: 'row'}}>
                <FormattedText bold={true}>to:</FormattedText>
                <FormattedText> {req.to.substring(0, 21)} </FormattedText>
            </View>
            <View style={{flexDirection: 'row'}}>
                <FormattedText bold={true}>   </FormattedText>
                <FormattedText> {req.to.substring(21)} </FormattedText>
            </View>
            <View style={{flexDirection: 'row'}}>
                <FormattedText bold={true}>gas:</FormattedText>
                <FormattedText> {(req.gasPrice * req.gasLimit).toFixed(6)} </FormattedText>
            </View>
            {req.coinAddress && renderCoinAddress(req.coinAddress!)}
            <View style={{flexDirection: 'row'}}>
                <FormattedText bold={true}>network:</FormattedText>
                <FormattedText> {req.network} </FormattedText>
            </View>
        </View>
    );

    const badge = () => (
        <Badge text={<Text>{props.index + 1} / {props.size}</Text>} style={{position: 'absolute', top: 16, right: 24}}>
        </Badge>);
    return (
        <Panel style={{flex: 1, backgroundColor: Colors.shadhowsLighter}}>
            <Panel.Body style={{position: 'relative'}}>
                {content}
            </Panel.Body>
            { props.size > 1 && badge() }
        </Panel>
    );
};

type ReqData = TransactionRequestItem | SignableMessageItem;

interface ValidateViewProps extends SubPageProps {
    requests: ReqData[];
}

export class ValidateView extends React.Component<ValidateViewProps, { allVisited: boolean }> {
    state = {
        allVisited: false
    };

    visited = new Set([0]);

    componentDidMount() {
        this.snapTo(0);
    }

    snapTo(idx: number) {
        this.visited.add(idx);
        if (!this.state.allVisited && this.visited.size === this.props.requests.length) {
            this.setState({ allVisited: true });
        }
    }

    renderItem(item: {item: ReqData, index: number}) {
        return(
            <RequestItem key={item.index} {...item} size={this.props.requests.length} />
        );
    }

    render() {
        return (
            <Body
                nextDisabled={!this.state.allVisited}
                onCloseClicked={this.props.onClose}
                titleId='app.validate'
                titleHelpId='app.validateDetails'
                onNextClicked={this.props.onNext}
            >
            <View style={{width: 240, height: 180, flexDirection: 'column', alignItems: 'center'}}>
                <Carousel
                    data={this.props.requests}
                    renderItem={item => this.renderItem(item)}
                    sliderWidth={240}
                    itemWidth={230}
                    onSnapToItem={i => this.snapTo(i)}
                />
            </View>
            </Body>
        );
    }
}

interface SendViewProps extends SubPageProps {
    message: string;
}

export class SendView extends React.Component<SendViewProps, {}> {
    render() {
        return (
            <Body
                nextDisabled={false }
                onCloseClicked={this.props.onClose}
                titleId='app.send'
                titleHelpId='app.sendDetails'
                onNextClicked={this.props.onNext}
            >
            <View style={{width: 240, height: 180, flexDirection: 'column', alignItems: 'center'}}>
                <Sender message={this.props.message} playing={true} size={220}/>
            </View>
            </Body>
        );
    }
}

interface RequestViewProps extends SubPageProps {
}

export class ReceiveView extends React.Component<RequestViewProps, {}> {
    onDataRead(data: string) {
        console.log('Got data ', data);
    }

    render() {
        return (
            <Body
                nextDisabled={true}
                onCloseClicked={this.props.onClose}
                titleId='app.requestTitle'
                titleHelpId='app.requestTitleDetails'
                onNextClicked={this.props.onNext}
            >
            <View style={{width: 240, height: 180, flexDirection: 'column', alignItems: 'center'}}>
                <Receiver onDataRead={data => this.onDataRead(data)} width={220} height={150}/>
            </View>
            </Body>
        );
    }
}

export interface RpcPageProps {
    step: 'receive' | 'success' | 'send' | 'validate';
    request?: string[];
}

export interface RpcPageDispatch {
    receiveCompleted: (request: string) => void;
    onCloseClicked: () => void;
    successConfirmed: () => void;
    requestApproved: () => void;
}

export class RpcPage extends React.Component<RpcPageProps&RpcPageDispatch, {}> {

    nextView() {
        console.log('next view');
    }

    render() {
        // const dummyRequests = [
        //     {
        //         from: '0x1b0182339d88dec8ffe1855d7f4fba0ef5a20b06',
        //         to: '0xre0182339d88dec8ffe1855d7f4fba0ef5a20b06',
        //         coinAddress: '0xre0182339d88dec8ffe1855d7f4fba0ef5a20b06',
        //         currency: 'ETH',
        //         network: 'ETH',
        //         amount: 4.44,
        //         gas: 0.01
        //     },
        //     { message: 'Hey Yo!' },
        //     { message: 'Danke '},
        //     { message: 'SIKTIR!!!'},
        //     { message: 'Hey Yo!' },
        //     { message: 'Danke '},
        //     { message: 'SIKTIR!!!'},
        //     { message: 'Hey Yo!' },
        //     { message: 'Danke '},
        //     { message: 'SIKTIR!!!'}
        // ];
        return (
            <Page
                showHeader={true}
                title={<Image source={logo} />}
            >
                <ReceiveView onClose={this.props.onCloseClicked} onNext={() => this.nextView}/>
            </Page>);
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1
    },
    carBody: {
        flex: 1,
        padding: 8,
        alignContent: 'center',
        justifyContent: 'center'
    },
    textArea: {
        height: 170,
        justifyContent: 'flex-start'
    }
});