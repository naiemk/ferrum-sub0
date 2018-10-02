
import React from 'react';
import { AppContainer } from './App';
import {addLocaleData, IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import {Messages} from './resources/Messages';
import { Text } from 'react-native';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
    createStore,
    applyMiddleware
} from 'redux';
import { rootReducer } from './Reducers';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

addLocaleData([...en]);

export default class Index extends React.Component {
    render() {
        return (
            <IntlProvider
                locale = 'en'
                messages={Messages.en}
                textComponent={Text}
            >
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </IntlProvider>
        );
    }
}
