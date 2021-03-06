import React from 'react';
// @ts-ignore
import {BarCodeScanner, Camera, Permissions} from 'expo';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {FormattedText} from '../FormattedText';
import camera from '../../assets/camera-white.png';
import {ReqData} from '../../redux/AppState';
import {Utils} from '../../utils/Utils';

interface ReceiverProps {
    onDataRead: (data: ReqData[]) => void;
    width?: number;
    height?: number;
}

interface ReceiverState {
    hasCameraPermission: boolean | undefined;
    type: string;
    messages: Set<string>;
    progress: number,
    messageSize: number | undefined,
}

export class Receiver extends React.Component<ReceiverProps, ReceiverState> {
    camera: Camera | undefined = undefined;
    constructor(props: ReceiverProps) {
        super(props);
        this.reset();
    }

    reset() {
        this.state = {
            hasCameraPermission: undefined,
            type: Camera.Constants.Type.back,
            messages: new Set(),
            progress: 0,
            messageSize: undefined
        };
    }

    addBarcode(data: string) {
        console.log('REeaderrrr', data);
        if (data.indexOf('|') > 0) {
            this.state.messages.add(data);
            this.checkIsDone();
        }
        console.log('GOT ', data);
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    componentWillUnmount() {
        if (this.camera) {
            this.camera = undefined;
        }
    }

    checkIsDone() {
        const msgs = Array.from(this.state.messages);
        console.log('SIZE', this.state.messageSize, msgs.length)
        if (!this.state.messageSize) {
            const last = msgs.find(m => m.indexOf('___END___') >= 0);
            if (last) {
                const size = Number(last.split('|')[0]) + 1;
                this.setState({...this.state, messageSize: size});
            }
        } else {
            if (this.state.messageSize === msgs.length) {
                const items = Array.from(this.state.messages).map(t => t.split('|', 2));
                items.sort((a, b) => Number(a[0]) - Number(b[0]));
                console.log('ITEMS', items)
                const fullText = items.map(t => t[1]).join('').replace('___END___', '');
                console.log('Got full data', fullText);
                const reqData = Utils.parseReq(fullText);
                if (!reqData) {
                    Alert.alert('Error', 'Received data cannot be parsed');
                } else {
                    this.props.onDataRead(reqData);
                }
            }
        }
    }

    renderProgress() {
        const progress = this.state.messageSize ? 100 * this.state.messages.size / this.state.messageSize : undefined;
        const reading = this.state.messages.size;
        if (!reading) {
            return (
                <FormattedText> no sender detected </FormattedText>
            );
        }
        if (progress) {
            return (
                <FormattedText> {this.state.messages.size} out of {this.state.messageSize} lines </FormattedText>
            );
        } else {
            return (
                <FormattedText> {this.state.messages.size} lines read </FormattedText>
            );
        }
    }

    renderCam() {
       // @ts-ignore
        return  (<Camera barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }}
                        ref={(ref: any) => { this.camera = ref; }}
                        style={{flex: 0, width: this.props.width || 300, height: this.props. height || 300}} type={this.state.type}
                        onBarCodeScanned={(d: { type: string; data: string; }) => this.addBarcode(d.data)}
            >
               <View
                   style={{
                       flex: 1,
                       backgroundColor: 'transparent',
                       flexDirection: 'row'
                   }}>
                   <TouchableOpacity
                       style={{
                           flex: 0.2,
                           alignSelf: 'flex-end',
                           alignItems: 'center'
                       }}
                       onPress={() => {
                           this.setState({
                               type: this.state.type === Camera.Constants.Type.back
                                   ? Camera.Constants.Type.front
                                   : Camera.Constants.Type.back
                           });
                       }}>
                       <Image source={camera} style={{height: 40, width: 40}} />
                   </TouchableOpacity>
               </View>
           </Camera>
       );
    }

    render() {
        const { hasCameraPermission } = this.state;

        return (
            <View>
                {hasCameraPermission === null ? <View /> :
                    hasCameraPermission === false ? <Text>No access to camera</Text> :
                        this.renderCam()}
                {this.renderProgress()}
            </View>
        );
    }
}