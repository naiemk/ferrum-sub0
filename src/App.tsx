import React from 'react';
import {AppState, PageType} from './redux/AppState';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

// @ts-ignore
import intl from 'intl';
import {Text} from 'react-native';
import {ActionTypes, addAction} from './redux/Actions';
import {Loading} from './pages/loading';
import {StartupPage} from './pages/StartupPage';
import {Datastore} from './utils/Utils';
import {SetupPin} from './pages/SetupPin';
import {MainMenuPage} from './pages/MainMenuPage';
import {RpcPage} from './pages/RpcPage';

// @ts-ignore
global.Intl = intl;

interface AppProps {
    page: PageType;
    isSetup: boolean;
    pin1?: string;
    pin2?: string;
    address?: string;
}

// TODO: Separate these into different containers
interface AppDispatch {
    onNextPage: (page: PageType) => void;
    onGoToMain: (page: PageType) => void;

    onPin1Change: (pin: string) => void;
    onPin2Change: (pin: string) => void;
}

class App extends React.Component<AppProps & AppDispatch, {}> {
    componentDidMount() {
        if (this.props.isSetup) {
            this.props.onNextPage('splash'); // Show the PIN page
        } else {
            this.props.onGoToMain('setupPin1'); // Show the startup page
        }
    }

    render() {
        switch (this.props.page) {
            case 'splash':
                return <Loading onLoad={() => {}} />;
            case 'startup':
                return <StartupPage onNextPage={this.props.onNextPage} />;
            case 'setupPin1':
                return (
                    <SetupPin
                            onSubmit={(pin) => {this.props.onPin1Change(pin); this.props.onNextPage(this.props.page); }}
                            onBack={() => this.props.onGoToMain(this.props.page)}
                    />);
            case 'setupPin2':
                return (
                    <SetupPin
                        onSubmit={(pin) => {this.props.onPin2Change(pin); this.props.onNextPage(this.props.page); }}
                        onBack={() => this.props.onGoToMain(this.props.page)}
                        checkAgainst={this.props.pin1}
                    />);
            case 'publicKey':
                return (
                    <MainMenuPage address={this.props.address!}
                                  onBackupPress={() => {}}
                                  onRestorePress={() => {}}
                                  onStartPress={() => this.props.onNextPage(this.props.page)}
                    />
                );
            case 'rpc':
                return (
                    <RpcPage
                        step='receive'
                        receiveCompleted={() => {}}
                        onCloseClicked={() => this.props.onGoToMain(this.props.page)}
                        successConfirmed={() => {}}
                        requestApproved={() => {}}/>
                );
            default:
                return (<Text> Yo </Text>);
        }
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        page: state.mainPage.pageType,
        pin1: state.setup.pinCode1,
        pin2: state.setup.pinCode2,
        isSetup: (Datastore.loadAll() || {}).privateKey !== undefined,
        address: state.userInfo.publicKey
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppDispatch>) => {
    return {
        onNextPage: (p: PageType) => {
           switch (p) {
               case 'splash':
                   dispatch(addAction(ActionTypes.OPEN_PIN_PAGE, {}));
                   break;
               case 'startup':
                   dispatch(addAction(ActionTypes.OPEN_PIN_PAGE_1, {}));
                   break;
               case 'setupPin1':
                   dispatch(addAction(ActionTypes.OPEN_PIN_PAGE_2, {}));
                   break;
               case 'setupPin2':
                   dispatch(addAction(ActionTypes.OPEN_PUBLIC_ADDR_PAGE, {}));
                   dispatch(addAction(ActionTypes.SETUP_COMPLETE, {}));
                   break;
               case 'publicKey':
                   dispatch(addAction(ActionTypes.OPEN_RPC_PAGE, {}));
                   break;
               case 'rpc':
                   dispatch(addAction(ActionTypes.OPEN_PUBLIC_ADDR_PAGE, {}));
                   break;
               case 'pin':
                   dispatch(addAction(ActionTypes.OPEN_PUBLIC_ADDR_PAGE, {}));
                   break;
               default:
           }
       },
        onGoToMain: (p: PageType) => {
            switch (p) {
                case 'rpc':
                    dispatch(addAction(ActionTypes.OPEN_PUBLIC_ADDR_PAGE, {}));
                    break;
                case 'setupPin1':
                case 'setupPin2':
                    dispatch(addAction(ActionTypes.OPEN_STARTUP_PAGE, {}));
                    break;
                default:
            }
        },
        onPin1Change: (p: string) => dispatch(addAction(ActionTypes.SETUP_SET_PIN1, p)),
        onPin2Change: (p: string) => dispatch(addAction(ActionTypes.SETUP_SET_PIN2, p))
    } as AppDispatch;
};

export const AppContainer = connect<AppProps, AppDispatch, {}, AppState> (
    mapStateToProps,
    mapDispatchToProps
)(App);