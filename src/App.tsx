import React from 'react';
import {Text} from 'react-native';
import {Button} from 'antd-mobile-rn';
import {FormattedMessage} from 'react-intl';
import {AppState} from './AppState';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionTypes, addAction} from './components/redux/Actions';
import {Page} from './components/Page';
import {NextAndBackPage} from './pages/NextAndBackPage';

// @ts-ignore
import intl from 'intl';
import {PageContent} from './components/PageContent';
import {MainMenuPage} from './pages/MainMenuPage';

// @ts-ignore
global.Intl = intl;

interface AppProps {
    name: string;
}

interface AppDispatch {
    onClick: () => void;
}

class App extends React.Component<AppProps & AppDispatch> {
    render() {
        if (1 === 1) {
            return (
                <MainMenuPage />
            );
        }
        if (1 === 1) {
            return (
                <NextAndBackPage title= 'Select a PIN Code' onBack={() => {console.log('BACK');}} onNext={() => {}} showBack={true} showNext={true}>
                    <PageContent width={250} height={150}>
                        <Text>
                            You entered a valid PIN code1. Thank you buddy!
                        </Text>
                    </PageContent>
                </NextAndBackPage>
            );
        }
        return (
            <Page
                showHeader={true}
                title = 'title'
                headerLeft = 'Yo'
                headerRight = 'Ho'
            >
                <PageContent>
                    <FormattedMessage
                        id='app.hello'
                        description='Main hello message'
                        values={{
                            name: this.props.name
                        }}
                    />
                    <Button onClick={this.props.onClick}>
                        Start
                    </Button>
                </PageContent>
            </Page>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {name: state.message.name} as AppProps;
};

const mapDispatchToProps = (dispatch: Dispatch<AppDispatch>) => {
    return {
        onClick: () => {
            return dispatch(addAction(ActionTypes.SAY_HI, {}));
        }
    } as AppDispatch;
};

export const AppContainer = connect<AppProps, AppDispatch, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(App);

