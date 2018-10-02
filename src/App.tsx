import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Button} from 'antd-mobile-rn';
import {FormattedMessage} from 'react-intl';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FormattedMessage
            id='app.hello'
            description='Main hello message'
            values={{
                name: 'Yo!'
            }}
        />
        <Button>
          Start
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
