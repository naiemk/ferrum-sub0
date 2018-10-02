import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'antd-mobile-rn';
import {FormattedMessage} from 'react-intl';
import {AppState} from './AppState';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionTypes, addAction} from './components/redux/Actions';

interface AppProps {
    name: string;
}

interface AppDispatch {
    onClick: () => void;
}

class App extends React.Component<AppProps & AppDispatch> {
    render() {
        return (
            <View style={styles.container}>
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
            </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
