import React from 'react';
import {Page} from '../components/Page';
import {Image, Linking, TouchableOpacity} from 'react-native';
import logo from '../assets/sub0-header.png';
import {ReceiveView, SendView} from './RpcPage';
import {AppState, ReqData, RpcView} from '../redux/AppState';
import {Dispatch} from 'redux';
import {ActionTypes, addAction} from '../redux/Actions';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Utils} from '../utils/Utils';
import {PageContent} from '../components/PageContent';
import {Panel} from '../components/Panel';
import {Flex} from 'antd-mobile-rn';
import {Colors} from '../assets/Colors';

export const InfoView: React.StatelessComponent<{}> = () => (
    <PageContent height={270} width={250} padding={8}>
        <Panel>
            <Panel.Header style={{height: 40, padding: 8, backgroundColor: Colors.shadhowsLighter}}>
                {<FormattedMessage id='app.rpcClientInfo'/>}
            </Panel.Header>
            <Panel.Body style={{paddingTop: 50, paddingBottom: 50, paddingLeft: 16, paddingRight: 16}}>
                <Flex align='center' justify='around' >
                    <FormattedMessage id='app.rpcClientInfoDetails' />
                </Flex>
                <Flex align='center' justify='around' >
                    <TouchableOpacity onPress={() => Linking.openURL('https://sub0.ferrum.network')}>
                        <FormattedMessage id='app.rpcClientInfoLink' />
                    </TouchableOpacity>
                </Flex>
            </Panel.Body>
        </Panel>
    </PageContent>
);

export class RpcClientPage extends React.Component<RpcClientProps&RpcClientDispatch, {}> {
    constructor(props: RpcClientProps&RpcClientDispatch) {
        super(props);
        this.closeClicked = this.closeClicked.bind(this);
        this.nextView = this.nextView.bind(this);
    }

    nextView() {
        this.props.onNext(this.props.view);
    }

    closeClicked() {
        this.props.onClose();
    }

    renderReceive() {
        switch (this.props.view) {
            case 'send':
                return (
                    <SendView
                        titleId='app.clientSendTitle'
                        titleHelpId='app.clientSendTitleDetails'
                        message={this.props.message!}
                        onClose={() => this.closeClicked()}
                        onNext={() => this.nextView()}
                        style={{backgroundColor: '#FEFADF'}}
                    />
                );
            case 'receive':
                return (
                    <ReceiveView
                        titleId='app.clientReceiveTitle'
                        titleHelpId='app.clientReceiveTitleDetails'
                        onDataRead={this.props.onDataRead}
                        onClose={this.closeClicked}
                        onNext={this.nextView}
                        reqDataIsRead={false}
                        style={{backgroundColor: 'yellow'}}
                    />);
            case 'info':
                return ( <InfoView /> );
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

interface RpcClientProps {
    view: RpcView,
    message: string,
}

interface RpcClientDispatch {
    onNext: (v: RpcView) => void;
    onClose: () => void;
    onDataRead: (d: ReqData[]) => void;
}

const mapStateToProps = (state: AppState): RpcClientProps => {
    return {
        view: state.rpcClient.view,
        message: Utils.stringifyRequest([ state.rpcClient.request! ])
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RpcClientDispatch>): RpcClientDispatch => {
    return {
        onNext: (p: RpcView) => {
            switch (p) {
                case 'send':
                    dispatch(addAction(ActionTypes.OPEN_RPC_CLIENT_PAGE_RECEIVE, {}));
                    break;
                default:
            }
        },
        onClose: () => {
            dispatch(addAction(ActionTypes.OPEN_RPC_CLIENT_PAGE_INFO, {}));
        },
        onDataRead: (d: ReqData[]) => {
            dispatch(addAction(ActionTypes.RPC_CLIENT_DATA_READ, d));
        }
    };
};

export const RpcClientContainer = connect<RpcClientProps, RpcClientDispatch, {}, AppState> (
    mapStateToProps,
    mapDispatchToProps
)(RpcClientPage);
