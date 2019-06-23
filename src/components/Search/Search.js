import React, { Component } from 'react'
import {
  ScrollView,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  ActivityIndicator,
  Picker
} from 'react-native'
import propTypes from 'prop-types'
// import { Picker } from 'react-native-picker-dropdown'
// import { Icon } from 'react-native-elements'
import { Ionicons as Icon } from '@expo/vector-icons'
import Instruction from '../Instruction/Instruction'
import ingredientList from './ingredientList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height
  },
  bgp: {
    width: '100%',
    height: Dimensions.get('window').height
  },
  bgpRecipes: {
    width: '100%',
    flex: 1
  },
  Title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    height: 80,
    paddingTop: 17
  },
  instruction: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  pickerText1: {
    marginTop: 15,
    left: '30%',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerText2: {
    marginTop: 15,
    left: '30%',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerText3: {
    marginTop: 15,
    left: '30%',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  submitButton: {
    marginTop: 130
  },
  resultContainer: {
    marginTop: 0,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recipeName: {
    fontSize: 12,
    width: 150,
    height: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  like: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 28,
    marginRight: 40
  },
  load: {
    marginTop: 50
  }
})

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: [],
      afterStringify: '',
      firstPick: '',
      secondPick: '',
      thirdPick: '',
      recipesList: [],
      openInstructionMode: false,
      loading: false
    }
    this.recipeToOpenInstruction = {}
    this.addRecipe = this.addRecipe.bind(this)
    this.nextID = this.nextID.bind(this)
    this.openInstruction = this.openInstruction.bind(this)
    this.changeOpenInstructionMode = this.changeOpenInstructionMode.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    try {
      this.setState({ recipesList: [] })
      this.setState({ loading: true })
      const url = `https://feedme24.herokuapp.com/recipes?gmailAccount=${this.props.gmailAccount}&ingredient1=${this.state.firstPick}&ingredient2=${this.state.secondPick}&ingredient3=${this.state.thirdPick}`
      const res = await fetch(`${url}`)
      const data = await res.json()
      data.map(item => this.addRecipe(item.strMeal, item.strMealThumb, item.idMeal))
      this.setState({ loading: false })
    } catch (err) {
      return new Error(err)
    }
  }
  addRecipe(strMeal = null, strMealThumb = null, idMeal = null) {
    this.setState(prevState => ({
      recipesList: [
        ...prevState.recipesList,
        {
          id: this.nextID(),
          name: strMeal,
          strMealThumb,
          idMeal
        }
      ]
    }))
  }

  nextID() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  onAddToFav(nameMealToAdd) {
    const url = `https://feedme24.herokuapp.com/addFavorite`
    fetch(`${url}`, {
      method: 'POST',
      body: `gmailAccount=${this.props.gmailAccount}&favName=${nameMealToAdd}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .catch(err => new Error(err))
  }

  openInstruction(item) {
    this.recipeToOpenInstruction = item
    this.setState({ openInstructionMode: !this.state.openInstructionMode })
  }
  changeOpenInstructionMode() {
    this.setState({ openInstructionMode: !this.state.openInstructionMode })
  }

  render() {
    if (!this.state.openInstructionMode)
      return (
        <ScrollView style={styles.container}>
          <ImageBackground
            style={this.state.recipesList.length ? styles.bgpRecipes : styles.bgp}
            source={require('../photos/searchPhoto.jpeg')}
          >
            <Text style={styles.Title}>Search Recipe</Text>
            <Text style={styles.instruction}>Enter 3 ingredients</Text>
            <Picker
              style={styles.pickerText1}
              selectedValue={this.state.firstPick}
              onValueChange={itemValue => this.setState({ firstPick: itemValue })}
            >
              {ingredientList.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value} />
              ))}
            </Picker>

            <Picker
              style={styles.pickerText2}
              selectedValue={this.state.secondPick}
              onValueChange={itemValue => this.setState({ secondPick: itemValue })}
            >
              {ingredientList.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value} />
              ))}
            </Picker>

            <Picker
              style={styles.pickerText3}
              selectedValue={this.state.thirdPick}
              onValueChange={itemValue => this.setState({ thirdPick: itemValue })}
            >
              {ingredientList.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value} />
              ))}
            </Picker>
            <Button
              style={styles.submitButton}
              onPress={this.handleClick}
              title="Submit"
              color="#841584"
            />
            {this.state.loading && (
              <View style={styles.load}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            <FlatList
              data={this.state.recipesList}
              numColumns={2}
              renderItem={({ item }) => {
                return (
                  <View style={styles.resultContainer}>
                    <Text style={styles.recipeName}>{item.name}</Text>
                    <Icon onPress={() => this.onAddToFav(item.name)} name="md-heart" size={40} style={styles.like}/>
                    <TouchableOpacity onPress={() => this.openInstruction(item)}>
                      <ImageBackground source={{ uri: item.strMealThumb }} style={styles.image} />
                    </TouchableOpacity>
                  </View>
                )
              }}
              keyExtractor={item => item.id.toString()}
              onEndThreshold={0}
            />
          </ImageBackground>
        </ScrollView>
      )
    return (
      <Instruction
        recipe={this.recipeToOpenInstruction}
        backToRecipeList={this.changeOpenInstructionMode}
      />
    )
  }
}
Search.propTypes = {
  gmailAccount: propTypes.string
}
