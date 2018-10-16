import React from 'react';
import {PageContent} from '../components/PageContent';
import {ActionSheet, Badge, Flex, Modal, WhiteSpace} from 'antd-mobile-rn';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
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
import {AppState, ReqData, RpcView} from '../redux/AppState';
import {Dispatch} from 'redux';
import {ActionTypes, addAction} from '../redux/Actions';
import {connect} from 'react-redux';
import {getSignedReqData} from '../redux/Selectors';

const alert = Modal.alert;

interface BodyProps {
    titleId: string;
    titleHelpId: string;
    nextDisabled: boolean;
    onCloseClicked: () => void;
    onNextClicked: () => void;
    style?: ViewStyle;
}

export class Body extends React.Component<BodyProps, {}> {
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
            <PageContent height={270} width={250} padding={8} style={this.props.style}>
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

export interface SubPageProps {
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
    titleId: string;
    titleHelpId: string;
    style?: ViewStyle;
}

export class SendView extends React.Component<SendViewProps, {}> {
    render() {
        console.log('SENDING ', this.props.message);
        return (
            <Body
                nextDisabled={false }
                onCloseClicked={this.props.onClose}
                titleId={this.props.titleId}
                titleHelpId={this.props.titleHelpId}
                onNextClicked={this.props.onNext}
                style={this.props.style}
            >
            <View style={{width: 240, height: 180, flexDirection: 'column', alignItems: 'center'}}>
                <Sender message={this.props.message} playing={true} size={170}/>
            </View>
            </Body>
        );
    }
}

interface RequestViewProps extends SubPageProps {
    onDataRead: (data: ReqData[]) => void;
    reqDataIsRead: boolean;
    style?: ViewStyle;
    titleId: string;
    titleHelpId: string;
}

export class ReceiveView extends React.Component<RequestViewProps, {}> {
    componentDidMount() {
        const dummyRequests = [
            {
                nonce: 1,
                from: '0x1b0182339d88dec8ffe1855d7f4fba0ef5a20b06',
                to: '0xce0182339d88dec8ffe1855d7f4fba0ef5a20b06',
                coinAddress: undefined, // '0xre0182339d88dec8ffe1855d7f4fba0ef5a20b06',
                currency: 'ETH',
                network: 'ETH',
                amount: 4.44, // gasPrice=0.000000005&gasLimit=21000 (ed
                gasPrice: 0.000000005,
                gasLimit: 18000
            },
            { message: 'Hey Yo!' },
            { message: 'Danke '},
            { message: 'SIKTIR!!!'},
            { message: 'Hey Yo!' },
            { message: 'Danke '},
            { message: 'SIKTIR!!!'},
            { message: 'Hey Yo!' },
            { message: 'Danke '},
            { message: 'SIKTIR!!!'}
        ];
        setTimeout(() => this.props.onDataRead(dummyRequests), 3000);
    }

    render() {

        return (
            <Body
                nextDisabled={!this.props.reqDataIsRead}
                onCloseClicked={this.props.onClose}
                titleId={this.props.titleId}
                titleHelpId={this.props.titleHelpId}
                onNextClicked={this.props.onNext}
            >
            <View style={{width: 240, height: 180, flexDirection: 'column', alignItems: 'center'}}>
                <Receiver onDataRead={data => this.props.onDataRead(data)} width={220} height={150}/>
            </View>
            </Body>
        );
    }
}

export class RpcPage extends React.Component<RpcProps&RpcDispatch, {}> {
    constructor(props: RpcProps&RpcDispatch) {
        super(props);
        this.nextView = this.nextView.bind(this);
        this.closeClicked = this.closeClicked.bind(this);
    }

    nextView() {
        this.props.onNext(this.props.view);
    }

    closeClicked() {
        this.props.onClose(this.props.view);
    }

    renderReceive() {
        switch (this.props.view) {
            case 'receive':
                return (
                    <ReceiveView
                        titleId='app.requestTitle'
                        titleHelpId='app.requestTitleDetails'
                        onDataRead={this.props.onDataRead}
                        onClose={this.closeClicked}
                        onNext={this.nextView}
                        reqDataIsRead={this.props.requests !== undefined}
                    />);
            case 'success':
                return ( <SuccessView onClose={this.closeClicked} onNext={this.nextView}/> );
            case 'send':
                return (
                    <SendView
                        titleId='app.send'
                        titleHelpId='app.sendDetails'
                        message={this.props.message!}
                        onClose={this.closeClicked}
                        onNext={this.nextView}/>
                );
            case 'validate':
                return ( <ValidateView requests={this.props.requests!} onClose={this.closeClicked} onNext={this.nextView}/> );
            default:
                return undefined;
        }
    }

    render() {

        return (
            <Page
                showHeader={true}
                title={<Image source={logo} />}
            >
                {this.renderReceive()}
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

interface RpcProps {
    view: RpcView,
    message?: string,
    requests?: ReqData[]
}

interface RpcDispatch {
    onNext: (v: RpcView) => void;
    onClose: (v: RpcView) => void;
    onDataRead: (d: ReqData[]) => void;
}

const mapStateToProps = (state: AppState): RpcProps => {
    return {
        view: state.rpc.view,
        message: state.rpc.requests && state.rpc.view === 'send' ? getSignedReqData(state) : undefined,
        requests: state.rpc.requests
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RpcDispatch>): RpcDispatch => {
    return {
        onNext: (p: RpcView) => {
            switch (p) {
                case 'receive':
                    dispatch(addAction(ActionTypes.OPEN_RPC_SUCCESS_PAGE, {}));
                    break;
                case 'success':
                    dispatch(addAction(ActionTypes.OPEN_RPC_VALIDATE_PAGE, {}));
                    break;
                case 'validate':
                    dispatch(addAction(ActionTypes.OPEN_RPC_SEND_PAGE, {}));
                    break;
                case 'send':
                    Alert.alert('Transaction Completed!');
                    dispatch(addAction(ActionTypes.OPEN_PUBLIC_ADDR_PAGE, {}));
                    break;
                default:
            }
        },
        onClose: (p: RpcView) => {
            switch (p) {
                case 'receive':
                case 'validate':
                case 'success':
                case 'send':
                    dispatch(addAction(ActionTypes.OPEN_PUBLIC_ADDR_PAGE, {}));
                    break;
                default:
            }
        },
        onDataRead: (d: ReqData[]) => {
            dispatch(addAction(ActionTypes.RPC_DATA_READ, d));
        }
    };
};

export const RpcContainer = connect<RpcProps, RpcDispatch, {}, AppState> (
    mapStateToProps,
    mapDispatchToProps
)(RpcPage);