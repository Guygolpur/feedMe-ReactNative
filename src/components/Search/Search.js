import React, { Component } from 'react';
import { ScrollView, FlatList, Platform, SectionList, StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Button } from 'react-native';
import { Picker } from 'react-native-picker-dropdown'
import { Icon } from 'react-native-elements'
import Instruction from '../Instruction/Instruction'
import { Gmail } from '../Register/Register'

const ingredientList = [
  {
    label: "Choose ingredient"
  },
  {
    _id: "5c419639e7179a7d1247d557",
    label: "paprika",
    value: "paprika",
    type: "spyce",
    kosher: "yes"
  },
  {
    _id: "5c419673e7179a7d1247d562",
    label: "salt",
    value: "salt",
    type: "spyce",
    kosher: "yes"
  },
  {
    _id: "5c41968be7179a7d1247d577",
    label: "sugar",
    value: "sugar",
    type: "spyce",
    kosher: "yes"
  },
  {
    _id: "5c419714e7179a7d1247d60d",
    label: "cinnamon",
    value: "cinnamon",
    type: "spyce",
    kosher: "yes"
  },
  {
    _id: "5c4197a4e7179a7d1247d6a7",
    label: "cumin",
    value: "cumin",
    type: "spyce",
    kosher: "yes"
  },
  {
    _id: "5c419932e7179a7d1247d80d",
    label: "couscous",
    value: "couscous",
    type: "pareve",
    kosher: "yes"
  },
  {
    _id: "5c41995ee7179a7d1247d82d",
    label: "rice",
    value: "rice",
    type: "pareve",
    kosher: "yes"
  },
  {
    _id: "5c419996e7179a7d1247d851",
    label: "eggs",
    value: "eggs",
    type: "pareve",
    kosher: "yes"
  },
  {
    _id: "5c419aa9e7179a7d1247d964",
    label: "bread",
    value: "bread",
    type: "pareve",
    kosher: "yes"
  },
  {
    _id: "5c419b94e7179a7d1247d9ff",
    label: "onion",
    value: "onion",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419beee7179a7d1247da47",
    label: "broccoli",
    value: "broccoli",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419c0ce7179a7d1247da51",
    label: "cabbage",
    value: "cabbage",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419c25e7179a7d1247da5e",
    label: "celery",
    value: "celery",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419c5ce7179a7d1247da91",
    label: "kale",
    value: "kale",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419c75e7179a7d1247da9a",
    label: "lettuce",
    value: "lettuce",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419c9be7179a7d1247dabd",
    label: "spinach",
    value: "spinach",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419d11e7179a7d1247dae7",
    label: "peanuts",
    value: "peanuts",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419d34e7179a7d1247daf1",
    label: "asparagus",
    value: "asparagus",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419d50e7179a7d1247db31",
    label: "garlic",
    value: "garlic",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419d93e7179a7d1247dba5",
    label: "carrot",
    value: "carrot",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419dafe7179a7d1247dbab",
    label: "ginger",
    value: "ginger",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419dc8e7179a7d1247dbfe",
    label: "potato",
    value: "potato",
    type: "vegetable",
    kosher: "yes"
  },
  {
    _id: "5c419e42e7179a7d1247dc78",
    label: "avocado",
    value: "avocado",
    type: "fruit",
    kosher: "yes"
  },
  {
    _id: "5c419e56e7179a7d1247dc7e",
    label: "banana",
    value: "banana",
    type: "fruit",
    kosher: "yes"
  },
  {
    _id: "5c419eeee7179a7d1247dcd9",
    label: "lemon",
    value: "lemon",
    type: "fruit",
    kosher: "yes"
  },
  {
    _id: "5c419f4fe7179a7d1247dd1c",
    label: "orange",
    value: "orange",
    type: "fruit",
    kosher: "yes"
  },
  {
    _id: "5c419f8ee7179a7d1247dd9d",
    label: "tomato",
    value: "tomato",
    type: "fruit",
    kosher: "yes"
  },
  {
    _id: "5c41a01de7179a7d1247de08",
    label: "beef",
    value: "beef",
    type: "meat",
    kosher: "yes"
  },
  {
    _id: "5c41a038e7179a7d1247de1e",
    label: "pork",
    value: "pork",
    type: "meat",
    kosher: "no"
  },
  {
    _id: "5c41a08ce7179a7d1247de3f",
    label: "chicken",
    value: "chicken",
    type: "meat",
    kosher: "yes"
  },
  {
    _id: "5c41a0e0e7179a7d1247de72",
    label: "tuna",
    value: "tuna",
    type: "sea food",
    kosher: "yes"
  },
  {
    _id: "5c41a10ce7179a7d1247de90",
    label: "flour",
    value: "flour",
    type: "pareve",
    kosher: "yes"
  },
  {
    _id: "5c41a15ae7179a7d1247dea7",
    label: "butter",
    value: "butter",
    type: "dairy",
    kosher: "yes"
  },
  {
    _id: "5c41a16ee7179a7d1247deae",
    label: "milk",
    value: "milk",
    type: "dairy",
    kosher: "yes"
  },
  {
    _id: "5c41a199e7179a7d1247dec4",
    label: "cream cheese",
    value: "cream cheese",
    type: "dairy",
    kosher: "yes"
  },
  {
    _id: "5c41a1c8e7179a7d1247dee0",
    label: "ice cream",
    value: "ice cream",
    type: "dairy",
    kosher: "yes"
  }
];

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      afterStringify: '',
      firstPick: "",
      secondPick: "",
      thirdPick: "",
      recipesList: [],
      openInstructionMode: false,
    }
    this.recipeToOpenInstruction = {}
    this.addRecipe = this.addRecipe.bind(this)
    this.nextID = this.nextID.bind(this)
    this.openInstruction = this.openInstruction.bind(this)
    this.changeOpenInstructionMode = this.changeOpenInstructionMode.bind(this)
  }

  handleClick = () => {
      if(!Gmail){
        console.log("Need to log in")
        return;
    }
    this.setState({ recipesList: [] })
    const url = `https://feedme24.herokuapp.com/recipes?gmailAccount=${Gmail}&ingredient1=${this.state.firstPick}&ingredient2=${this.state.secondPick}&ingredient3=${this.state.thirdPick}`;
    fetch(`${url}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.map(item =>
          this.addRecipe(item.strMeal, item.strMealThumb, item.idMeal))
      })
      .catch(err => console.error(err))
  }

  addRecipe(strMeal = null, strMealThumb = null, idMeal = null) {
    this.setState(prevState => ({
      recipesList: [
        ...prevState.recipesList,
        {
          id: this.nextID(),
          name: strMeal,
          strMealThumb: strMealThumb,
          idMeal: idMeal,

        }
      ]
    }))
  }

  nextID() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  onAddToFav(nameMealToAdd){
    if(!Gmail){
        console.log("Need to log in")
        return;
    }
    const url = `https://feedme24.herokuapp.com/addFavorite`;
    fetch(`${url}`,
      {method:'POST',
      body:`gmailAccount=${Gmail}&favName=${nameMealToAdd}`,                      //**** */
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
   }})
    .then(res => res.json())
      .catch(err => console.error(err));
}

  async componentDidMount() {
    // try {
    //   const responseIngredients = await fetch('https://feedme24.herokuapp.com/ingredients/getAllIngredients')
    //   const jsonIngredients = await responseIngredients.json()

    //   for (const ingredient of jsonIngredients) {
    //     this.setState(prevState => ({
    //       ingredients: [
    //         ...prevState.ingredients, ingredient.ingredient]
    //     }))
    //     // console.log(ingredient.ingredient)
    //   }
    //   this.ObjToStr(this.state.ingredients[1])
    //   console.log(this.state.ingredients[0])
    //   console.log(this.state.afterStringify)
    // } catch (error) {
    //   throw new Error(error)
    // }
  }


  ///////////////////////////////////////////////////27/05 10:30
  openInstruction(item) {
    this.recipeToOpenInstruction = item
    this.setState({ openInstructionMode: !this.state.openInstructionMode })
  }
  changeOpenInstructionMode() {
    this.setState({ openInstructionMode: !this.state.openInstructionMode })
  }




  render() {
    console.log(Gmail)
    if (!this.state.openInstructionMode)
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bgp}
          source={require('../photos/searchPhoto.jpeg')}
        >
          <Text style={styles.Title}>Search Recipe</Text>
          <Text style={styles.instruction}>Enter 3 ingredients</Text>
          <View style={styles.DropDownPos}>
            <Picker textStyle={styles.pickerText1}
              selectedValue={this.state.firstPick}
              onValueChange={itemValue => this.setState({ firstPick: itemValue })}>
              {ingredientList.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value} />
              ))}
            </Picker>

            <Picker textStyle={styles.pickerText2}
              selectedValue={this.state.secondPick}
              onValueChange={itemValue => this.setState({ secondPick: itemValue })}>
              {ingredientList.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value} />
              ))}
            </Picker>

            <Picker textStyle={styles.pickerText3}
              selectedValue={this.state.thirdPick}
              onValueChange={itemValue => this.setState({ thirdPick: itemValue })}>
              {ingredientList.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value} />
              ))}
            </Picker>
          </View>

          <FlatList
            data={this.state.recipesList}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <View style={styles.resultContainer}>
                  <Text style={styles.recipeName}>{item.name}</Text>
                  <Icon onPress={() => this.onAddToFav(item.name)}
                    name='favorite' size={40} />
                  <TouchableOpacity onPress={() => this.openInstruction(item)}>
                    <ImageBackground source={{ uri: item.strMealThumb }} style={styles.image} />
                  </TouchableOpacity>
                </View>
              )
            }}
            keyExtractor={item => item.id.toString()}
            onEndThreshold={0}
          />
          <Button style={styles.submitButton}
            onPress={this.handleClick}
            title="Submit"
            color="#841584"
          />
        </ImageBackground>
      </View>
    )
    return (
      <Instruction
        recipe={this.recipeToOpenInstruction}
        backToRecipeList={this.changeOpenInstructionMode}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bgp: {
    width: 360,
    height: 590,
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
  instruction: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  DropDownPos: {
    // flex: 1,
    marginLeft: 100,
    // height: 300,
  },
  pickerText1: {
    marginTop: 15,
    width: 195,
  },
  pickerText2: {
    marginTop: 15,
    width: 195,
  },
  pickerText3: {
    marginTop: 15,
    width: 195,
  },
  submitButton: {
    // marginTop: 950,
  },
  resultContainer: {
    marginTop: 0,
    // flex: 1,
    height: 240,
  },
  recipeName: {
    fontSize: 12,
    width: 150,
    height: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  image: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 28,
    marginRight: 40,
  },
})

////////////////////////////////27/05 17:14