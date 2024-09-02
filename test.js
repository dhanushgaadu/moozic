
import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello, World!'
    };
  }

  render() {
    const { message } = this.state;
    return (
      <View>
        <Text>{message}</Text>
      </View>
    );
  }
}

export default MyComponent;