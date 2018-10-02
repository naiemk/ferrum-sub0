
import React from 'react';
import App from './App';
import {addLocaleData, IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import {Messages} from './resources/Messages';
import { Text } from 'react-native';

addLocaleData([...en]);

export default class Index extends React.Component {
    render() {
        return (
            <IntlProvider
                locale = 'en'
                messages={Messages.en}
                textComponent={Text}
            >
                <App />
            </IntlProvider>
        );
    }
}


