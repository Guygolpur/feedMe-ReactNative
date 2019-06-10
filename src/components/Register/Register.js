import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native'
import * as Expo from "expo"
import { androidClientId } from "../../../superSecretKey"

export let Gmail = null
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: "",
            email: "",
        }
    }

    LoggedInPage = props => {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Welcome:{props.name}</Text>
                <Image style={styles.image} source={{ uri: props.photoUrl } } />
                <Button onPress={()=>this.props.changeGmailMode()} title="Press Me"></Button>
            </View>
        )
    }

    signIn = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: androidClientId,
                scopes: ["profile", "email"]
            })
            // console.log(result.user.email)
            if (result.type === "success") {
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl,
                    email: result.user.email
                }, () => {
                    Gmail = this.state.email
                    const url = `https://feedme24.herokuapp.com/addProfile`;
                    fetch(`${url}`,
                        {
                            method: 'POST',
                            body: `gmailAccount=${this.state.email}`,                      //** */
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            }
                        })
                        // this.props.changeGmailMode()
                })
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }
    render() {
        if (this.email == null)
            // console.log(this.state.email)
        return (
            <View style={styles.container}>
                {this.state.signedIn ? (
                    <this.LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
                ) : (
                        <LoginPage signIn={this.signIn} />
                    )}
                {/* <Navigation /> */}
            </View>
        );
    }
}

const LoginPage = props => {
    return (
        <View>
            <Text style={styles.header}>Sign In With Google</Text>
            <Button title="Sign in with Google" onPress={() => props.signIn()} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 74,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 25
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    }
})
