import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native'
import Navigation from './src/components/Navigation/Navigation'
import { name as appName } from './app.json'
import Register, { Gmail } from './src/components/Register/Register'
const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gmailMode: false
    }
    this.changeGmailMode = this.changeGmailMode.bind(this)
  }
  changeGmailMode(){
    this.setState({gmailMode: !this.state.gmailMode})
  }
  render() {
    if (this.state.gmailMode == false)
    return(
      <Register changeGmailMode={this.changeGmailMode} />
    )
    return (
      <View style={styles.container}>
          <Navigation changeGmailMode={this.changeGmailMode} />
      </View>
    );
  }
}
