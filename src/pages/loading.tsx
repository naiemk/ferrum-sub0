import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import wallpaper from '../assets/sub0wallpaper.png';
import logo from '../assets/logo.png';

export const Loading: React.StatelessComponent<{onLoad: () => void}> = props => {
    const dim = Dimensions.get('window');

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={wallpaper}
                onLoad={props.onLoad}
            />
            <View style={{position: 'absolute', top: 60, left: dim.width / 2 - 40, width: 100, height: 100}} >
                <Image source={logo} style={{opacity: 0.7}} />
            </View>
        </View>
    );
};