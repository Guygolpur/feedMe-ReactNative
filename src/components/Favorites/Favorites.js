import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from 'react-native'
import { Icon } from 'react-native-elements'
import Instruction from '../Instruction/Instruction'
import { Gmail } from '../Register/Register'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    height: 80,
    paddingTop: 17
  },
  image: {
    width: 300,
    height: 300,
    alignItems: 'center'
  },
  emptyArrayText: {
    marginTop: 30,
    fontSize: 40,
    textAlign: 'center'
  },
  imageContainer: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  nameMeal: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  load: {
    marginTop: 200
  }
})

export default class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteList: [],
      openInstructionMode: false,
      count: 0,
      loading: true
    }
    this.recipeToOpenInstruction = {}
    this.add = this.add.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.getData = this.getData.bind(this)
    this.emptyListMessage = this.emptyListMessage.bind(this)
    this.whileLoading = this.whileLoading.bind(this)
    this.nextID = this.nextID.bind(this)
    this.openInstruction = this.openInstruction.bind(this)
    this.changeOpenInstructionMode = this.changeOpenInstructionMode.bind(this)
    this.renderFavorite = this.renderFavorite.bind(this)
  }
  componentDidMount() {
    this.getData()
  }
  emptyListMessage() {
    return (
      <View>
        <Text style={styles.emptyArrayText}>No Result Were Found</Text>
      </View>
    )
  }
  whileLoading() {
    return (
      <View style={styles.load}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  async getData() {
    if (!Gmail) {
      return
    }
    const url = `https://feedme24.herokuapp.com/profileFavorite?gmailAccount=${Gmail}`
    try {
      const res = await fetch(`${url}`)
      const data = await res.json()
      data.map(favorite =>
        this.add(favorite.strMeal, favorite.strArea, favorite.strMealThumb, favorite.strYoutube)
      )
      this.setState({ loading: false })
    } catch (err) {
      return new Error(err)
    }
  }
  onDelete(nameMealToDelete) {
    if (!Gmail) {
      return
    }
    const url = `https://feedme24.herokuapp.com/removeFavorite`
    fetch(`${url}`, {
      method: 'POST',
      body: `gmailAccount=${Gmail}&favName=${nameMealToDelete}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .catch(err => new Error(err))
    const filteredArray = this.state.favoriteList.filter(item => item.name !== nameMealToDelete)
    this.setState({ favoriteList: filteredArray })
  }

  nextID() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }
  add(nameMeal = null, areaMeal = null, imageMeal = null, youtubeLink = null) {
    this.setState(prevState => ({
      favoriteList: [
        ...prevState.favoriteList,
        {
          id: this.nextID(),
          name: nameMeal,
          area: areaMeal,
          image: imageMeal,
          youtube: youtubeLink
        }
      ]
    }))
  }
  openInstruction(item) {
    this.recipeToOpenInstruction = item
    this.setState({ openInstructionMode: !this.state.openInstructionMode })
  }
  changeOpenInstructionMode() {
    this.setState({ openInstructionMode: !this.state.openInstructionMode })
  }
  renderFavorite() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        {this.state.loading && (
          <View style={styles.load}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!this.state.loading && (
          <FlatList
            data={this.state.favoriteList}
            numColumns={1}
            ListEmptyComponent={this.emptyListMessage}
            renderItem={({ item }) => {
              return (
                <View style={styles.imageContainer}>
                  <Text style={styles.nameMeal}>{item.name}</Text>
                  <TouchableOpacity onPress={() => this.openInstruction(item)}>
                    <ImageBackground style={styles.image} source={{ uri: item.image }} />
                  </TouchableOpacity>
                  <Icon onPress={() => this.onDelete(item.name)} name="delete" size={50} />
                </View>
              )
            }}
            keyExtractor={item => item.id.toString()}
            onEndThreshold={0}
          />
        )}
      </View>
    )
  }
  render() {
    if (!this.state.openInstructionMode) return this.renderFavorite()
    return (
      <Instruction
        recipe={this.recipeToOpenInstruction}
        backToRecipeList={this.changeOpenInstructionMode}
      />
    )
  }
}
