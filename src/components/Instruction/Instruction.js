import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
// import { WebView } from 'react-native-webview'
import { Icon } from 'react-native-elements'
import propTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    height: 80,
    flexDirection: 'row',
    paddingLeft: 30,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center'
  },
  imagePos: {
    alignItems: 'center'
  },
  youtubeVideo: {
    height: 300,
    width: 300,
    paddingTop: 30,
  },
  backArrow: {
    paddingLeft: 30,
    left: 30
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 30
  },
  nameMeal: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 17
  },
  strArea: {
    textAlign: 'center',
    fontSize: 20
  },
  strInstructions: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 17
  }
})

export default class Instruction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      instructions: {
        strMeal: '',
        strCategory: '',
        strArea: '',
        strInstructions: '',
        strMealThumb: '',
        strYoutube: ''
      },
      ready: false
    }
    this.getInstructionData = this.getInstructionData.bind(this)
    this.addInstruction = this.addInstruction.bind(this)
  }
  componentDidMount() {
    this.getInstructionData(this.props.recipe.name)
  }
  getInstructionData(MealName) {
    const url = `https://feedme24.herokuapp.com/getInstruction/${MealName}`
    fetch(`${url}`)
      .then(res => res.json())
      .then(data =>
        this.addInstruction(
          data[0].strMeal,
          data[0].strCategory,
          data[0].strArea,
          data[0].strInstructions,
          data[0].strMealThumb,
          data[0].strYoutube
        )
      )
      .catch(err => new Error(err))
  }
  addInstruction(
    strMeal = null,
    strCategory = null,
    strArea = null,
    strInstructions = null,
    strMealThumb = null,
    strYoutube = null
  ) {
    this.setState(
      {
        instructions: {
          strMeal,
          strCategory,
          strArea,
          strInstructions,
          strMealThumb,
          strYoutube
        }
      },
      () => {
        this.setState({ ready: true })
      }
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => this.props.backToRecipeList()}>
            <Icon style={styles.backArrow} name="arrow-back" size={50} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.title}>Instruction</Text>
        </View>
        <ScrollView>
          <Text style={styles.nameMeal}>{this.state.instructions.strMeal}</Text>
          <Text style={styles.strArea}>{this.state.instructions.strArea}</Text>
          <Text style={styles.strInstructions}>{this.state.instructions.strInstructions}</Text>
          {this.state.ready && (
            <View style={styles.imagePos}>
              {/* <WebView source={{ uri: `${this.state.instructions.strYoutube}` }} /> */}
              <ImageBackground style={styles.youtubeVideo} source={{ uri: this.state.instructions.strMealThumb }} />
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}
Instruction.propTypes = {
  recipe: propTypes.object,
  backToRecipeList: propTypes.func
}
