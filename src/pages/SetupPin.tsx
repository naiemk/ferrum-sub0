import React from 'react';
import {Messages} from '../resources/Messages';
import {PinCode} from './PinCodePage';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Colors} from '../assets/Colors';
import {Button} from 'antd-mobile-rn';

interface SetupPinProps {
    checkAgainst?: string;
    onSubmit: (p: string) => void;
    onBack: () => void;
}

export class SetupPin extends React.Component<SetupPinProps, {pin: string}> {
    constructor(props: SetupPinProps) {
        super(props);
        this.state = {
            pin: ''
        };
    }

    submit() {
        const pin = this.state.pin;
        this.setState({pin: ''});
        this.props.onSubmit(pin);
    }

    back() {
        this.setState({pin: ''});
        this.props.onBack();
    }

    render() {
        let pinIsReady = this.state.pin.length === 8;
        if (this.props.checkAgainst) {
            pinIsReady = this.state.pin === this.props.checkAgainst;
        }

        const title = this.props.checkAgainst ? Messages.message('app.repeatPin') : Messages.message('app.selectPin');

        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior= 'padding' enabled>
                <Grid>
                    <Row style={{height: 80, borderBottomColor: Colors.shadhowsLighter, borderBottomWidth: 1}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Text style={Colors.styles.titleTxt}>{title}</Text>
                        </View>
                    </Row>
                    <Row style={{flex: 1}}>
                        <PinCode pin={this.state.pin} onSubmit={p => this.setState({pin: p})}/>
                    </Row>
                    <Row style={{height: 58, paddingLeft: 8, paddingRight: 8}}>
                        <Grid>
                            <Col style={{flex: 1}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Button style={{height: 50}} type='ghost' onClick={() => this.back()}>
                                        <Text>Back</Text>
                                    </Button>
                                </View>
                            </Col>
                            <Col style={{flex: 1}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <Button
                                        style={{height: 50}}
                                        type='ghost'
                                        disabled={!pinIsReady}
                                        onClick={() => this.submit()}
                                    >
                                        <Text>Next</Text>
                                    </Button>
                                </View>
                            </Col>
                        </Grid>
                    </Row>
                </Grid>
            </KeyboardAvoidingView>
        );
    }
}

