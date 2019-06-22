import React, { Component } from 'react'
import { Image, Button, StyleSheet, Text, View } from 'react-native'
import * as Expo from 'expo'
import { androidClientId, iosClientId } from '../../../superSecretKey'
import propTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150
  },
  continue: {
    marginTop: 25
  }
})

// export let Gmail = null
export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: '',
      photoUrl: '',
      email: ''
    }
    this.LoggedInPage = this.LoggedInPage.bind(this)
    this.signIn = this.signIn.bind(this)
    this.LoginPage = this.LoginPage.bind(this)
  }

  LoggedInPage(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome:{props.name}</Text>
        <Image style={styles.image} source={{ uri: props.photoUrl }} />
        <View style={styles.continue}>
          <Button onPress={() => this.props.changeGmailMode()} title="Continue"></Button>
        </View>
      </View>
    )
  }

  async signIn() {
    const result = await Expo.Google.logInAsync({
      androidClientId,
      iosClientId,
      scopes: ['profile', 'email']
    })
    if (result.type === 'success') {
      this.setState(
        {
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          email: result.user.email
        },
        () => {
          this.props.changeGmailAccount(this.state.email)
          const url = `https://feedme24.herokuapp.com/addProfile`
          fetch(`${url}`, {
            method: 'POST',
            body: `gmailAccount=${this.state.email}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
        }
      )
    }
  }
  LoginPage(props) {
    return (
      <View>
        <Text style={styles.header}>Sign In With Google</Text>
        <Button title="Sign in with Google" onPress={() => props.signIn()} />
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <this.LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <this.LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

Register.propTypes = {
  changeGmailMode: propTypes.func,
  changeGmailAccount: propTypes.func
}
