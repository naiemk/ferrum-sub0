
import React from 'react';
import { AppContainer } from './App';
import {addLocaleData, IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import {Messages} from './resources/Messages';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
// @ts-ignore
import { Asset, AppLoading, SplashScreen } from 'expo';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import wallpaper from './assets/sub0wallpaper.png';
import logo from './assets/logo.png';
import asset1 from './assets/backup.png';
import asset2 from './assets/burger.png';
import asset3 from './assets/burger-white.png';
import asset4 from './assets/camera-white.png';
import asset5 from './assets/cancel.png';
import asset6 from './assets/check.png';
import asset7 from './assets/info.png';
import asset8 from './assets/next.png';
import asset9 from './assets/restore.png';
import asset10 from './assets/sub0-header.png';

import {
    createStore,
    applyMiddleware
} from 'redux';
import {Datastore, Utils} from './utils/Utils';
import {Loading} from './pages/loading';
import {rootReducer} from './redux/Reducers';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

addLocaleData([...en]);

interface IndexState {
    isSplashReady: boolean,
    isAppReady: boolean
}

export default class Index extends React.Component<{}, IndexState> {
    state = {
        isSplashReady: false,
        isAppReady: false
    };

    _cacheSplashResourcesAsync = async () => {
        const gif = wallpaper;
        return Asset.fromModule(gif).downloadAsync();
    }

    _cacheResourcesAsync = async () => {
        SplashScreen.hide();
        const images = [
            asset1, asset2, asset3, asset4, asset5, asset6, asset7, asset8, asset9, asset10,
            logo
        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });

        await Promise.all(cacheImages);
        await Datastore.loadAllAsync(); // Cache the data
        await Utils.Crypto.sleep(1000);
        this.setState({ isAppReady: true });
    }

    render() {

        if (!this.state.isSplashReady) {
            return ( <AppLoading startAsync={this._cacheSplashResourcesAsync}
                    onFinish={() => this.setState({ isSplashReady: true })}
                    onError={console.warn}
                    autoHideSplash={false}
                />
            );
        }

        if (!this.state.isAppReady) {
            return (
                <Loading onLoad={this._cacheResourcesAsync}/>
            );
        }

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
