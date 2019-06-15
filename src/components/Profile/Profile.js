import React, { Component } from 'react';
import { Image, FormInput, FormLabel, SectionList, StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import { Gmail } from '../Register/Register'


export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {
                id: this.nextID(),
                gmailAccount: "",
                prohibitions: "",
                imageUrl: "null",
                userName: ""
            },
            editing: false,
        }

        this.getData = this.getData.bind(this)
        this.add = this.add.bind(this)
        this.nextID = this.nextID.bind(this)
        this.save = this.save.bind(this)
        this.edit = this.edit.bind(this)
        this.handleImageUrl = this.handleImageUrl.bind(this)
        this.handleProhabition = this.handleProhabition.bind(this)
        this.handleUserName = this.handleUserName.bind(this)
        this.setDataInDB = this.setDataInDB.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    nextID() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }

    getData() {
        if (!Gmail) {
            console.log("Need to log in")
            return;
        }
        this.setState({ profile: [] })
        const url = `https://feedme24.herokuapp.com/getProfileByGmailAccount?gmailAccount=${Gmail}`
        fetch(`${url}`)
            .then(res => res.json())
            .then(data => data.map(profile =>
                this.add(profile.gmailAccount, profile.prohibitions, profile.imageUrl, profile.userName)
            ))
            .catch(err => console.error(err))
    }

    add(gmailAccount = null, prohibitions = null, imageUrl = null, userName = null) {
        this.setState(() => ({
            profile:
            {
                id: this.nextID(),
                gmailAccount: gmailAccount,
                prohibitions: prohibitions,
                imageUrl: imageUrl,
                userName: userName

            },
        }))
    }

    eachProfile(profile, i) {
        return (
            <div key={`profile${i}`}>
                <img alt="" className="profileImg" src={profile.imageUrl}></img>
                <h2 className="profileName">{profile.userName}</h2>
                <h3 className="profileDetails">{profile.gmailAccount}</h3>
                <h4 className="profileDetails">Prohabitions: {profile.prohibitions}</h4>
            </div>
        )
    }

    edit() {
        this.setState({ editing: true })
    }

    setDataInDB() {
        if (!Gmail) {
            console.log("Need to log in")
            return;
        }
        let userName = this.userName ? this.userName : this.state.profile.userName
        let prohibitions = this.prohibitions ? this.prohibitions : this.state.profile.prohibitions
        let imageUrl = this.imageUrl ? this.imageUrl : this.state.profile.imageUrl
        const url = "https://feedme24.herokuapp.com/editProfile";
        fetch(`${url}`, {
            method: 'POST',
            body: `userName=${userName}&prohibitions=${prohibitions}&imageUrl=${imageUrl}&gmailAccount=${this.state.profile.gmailAccount}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
        this.setState({
            profile:
            {
                gmailAccount: this.state.profile.gmailAccount,
                prohibitions: prohibitions,
                imageUrl: imageUrl,
                userName: userName
            }
        })


    }

    save() {
        this.setDataInDB()
        this.setState({ editing: false })
    }

    handleProhabition(input) {
        this.prohibitions = input
    }
    handleUserName(input) {
        this.userName = input
    }
    handleImageUrl(input) {
        this.imageUrl = input
    }

    renderForm() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.bgp}
                    source={require('../photos/searchPhoto.jpeg')}
                >
                    <Text style={styles.Title}>Edit Profile</Text>
                    <View style={styles.profile}>
                        <Image style={styles.profileImg} source={{ uri: this.state.profile.imageUrl }}></Image>
                        <Text style={styles.profileName}>{this.state.profile.userName}</Text>
                        <Text style={styles.profileDetails}>{this.state.profile.gmailAccount}</Text>
                        <Text style={styles.profileProhibition}>Prohabitions: {this.state.profile.prohibitions}</Text>
                    </View>
                    <View style={styles.profileForm}>

                        <Text>User name</Text>
                        <TextInput
                            placeholder="Type here to change user name!"
                            onChangeText={this.handleUserName}
                        />

                        <Text>Prohebition</Text>
                        <TextInput
                            placeholder="Type here to change Prohebition!"
                            onChangeText={this.handleProhabition}
                        />

                        <Text>Image url</Text>
                        <TextInput
                            placeholder="Type here to change profile picture!"
                            onChangeText={this.handleImageUrl}
                        />

                        <Button title="Save Changes" onPress={this.save}></Button>
                    </View>
                </ImageBackground>
            </View>
        )
    }
    renderUI() {
        return (
            <View>
                <ImageBackground style={styles.bgp}
                    source={require('../photos/searchPhoto.jpeg')}
                >
                    <Text style={styles.Title}>Profile</Text>
                    <View style={styles.profile}>
                        <Image style={styles.profileImg} source={{ uri: this.state.profile.imageUrl }}></Image>
                        <Text style={styles.profileName}>{this.state.profile.userName}</Text>
                        <Text style={styles.profileDetails}>{this.state.profile.gmailAccount}</Text>
                        <Text style={styles.profileProhibition}>Prohabitions: {this.state.profile.prohibitions}</Text>
                        <Icon onPress={() => this.edit()} name='edit' size={40}></Icon>
                    </View>
                </ImageBackground>
            </View>
        )
    }
    render() {
        return this.state.editing ? this.renderForm() : this.renderUI()

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgp: {
        width: '100%',
        height: '100%',
    },
    Title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        height: 80,
        paddingTop: 17,
    },
    profile: {
        marginTop: 40,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImg: {
        height: 200,
        width: 200,
    },
    profileName: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    profileDetails: {
        fontWeight: 'bold',
    },
    profileProhibition: {
        fontWeight: 'bold',
        color: 'red',
    },
    profileForm: {
        top: 237,
    },
    profileForm: {
    },
});