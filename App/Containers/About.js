import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Colors, Metrics, Fonts } from '../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    padding: Metrics.doubleBaseMargin
  },
  headerText: {
    fontSize: Fonts.size.h1,
    color: Colors.banner
  },
  description: {
    marginTop: Metrics.doubleBaseMargin,
    padding: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.h3,
    color: Colors.text
  }
})

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          VumonicApp
        </Text>
        <Text style={styles.description}>
          App built as a part of assessment for Vumonic DataLabs. Has Google sign-in, a post feed with likes and comments features.
        </Text>
      </View>
    );
  }
}
 
export default About;