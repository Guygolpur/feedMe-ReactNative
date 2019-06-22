const ingredientList = [
  {
    label: 'Choose ingredient'
  },
  {
    _id: '5c419639e7179a7d1247d557',
    label: 'paprika',
    value: 'paprika',
    type: 'spyce',
    kosher: 'yes'
  },
  {
    _id: '5c419673e7179a7d1247d562',
    label: 'salt',
    value: 'salt',
    type: 'spyce',
    kosher: 'yes'
  },
  {
    _id: '5c41968be7179a7d1247d577',
    label: 'sugar',
    value: 'sugar',
    type: 'spyce',
    kosher: 'yes'
  },
  {
    _id: '5c419714e7179a7d1247d60d',
    label: 'cinnamon',
    value: 'cinnamon',
    type: 'spyce',
    kosher: 'yes'
  },
  {
    _id: '5c4197a4e7179a7d1247d6a7',
    label: 'cumin',
    value: 'cumin',
    type: 'spyce',
    kosher: 'yes'
  },
  {
    _id: '5c419932e7179a7d1247d80d',
    label: 'couscous',
    value: 'couscous',
    type: 'pareve',
    kosher: 'yes'
  },
  {
    _id: '5c41995ee7179a7d1247d82d',
    label: 'rice',
    value: 'rice',
    type: 'pareve',
    kosher: 'yes'
  },
  {
    _id: '5c419996e7179a7d1247d851',
    label: 'eggs',
    value: 'eggs',
    type: 'pareve',
    kosher: 'yes'
  },
  {
    _id: '5c419aa9e7179a7d1247d964',
    label: 'bread',
    value: 'bread',
    type: 'pareve',
    kosher: 'yes'
  },
  {
    _id: '5c419b94e7179a7d1247d9ff',
    label: 'onion',
    value: 'onion',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419beee7179a7d1247da47',
    label: 'broccoli',
    value: 'broccoli',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419c0ce7179a7d1247da51',
    label: 'cabbage',
    value: 'cabbage',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419c25e7179a7d1247da5e',
    label: 'celery',
    value: 'celery',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419c5ce7179a7d1247da91',
    label: 'kale',
    value: 'kale',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419c75e7179a7d1247da9a',
    label: 'lettuce',
    value: 'lettuce',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419c9be7179a7d1247dabd',
    label: 'spinach',
    value: 'spinach',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419d11e7179a7d1247dae7',
    label: 'peanuts',
    value: 'peanuts',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419d34e7179a7d1247daf1',
    label: 'asparagus',
    value: 'asparagus',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419d50e7179a7d1247db31',
    label: 'garlic',
    value: 'garlic',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419d93e7179a7d1247dba5',
    label: 'carrot',
    value: 'carrot',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419dafe7179a7d1247dbab',
    label: 'ginger',
    value: 'ginger',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419dc8e7179a7d1247dbfe',
    label: 'potato',
    value: 'potato',
    type: 'vegetable',
    kosher: 'yes'
  },
  {
    _id: '5c419e42e7179a7d1247dc78',
    label: 'avocado',
    value: 'avocado',
    type: 'fruit',
    kosher: 'yes'
  },
  {
    _id: '5c419e56e7179a7d1247dc7e',
    label: 'banana',
    value: 'banana',
    type: 'fruit',
    kosher: 'yes'
  },
  {
    _id: '5c419eeee7179a7d1247dcd9',
    label: 'lemon',
    value: 'lemon',
    type: 'fruit',
    kosher: 'yes'
  },
  {
    _id: '5c419f4fe7179a7d1247dd1c',
    label: 'orange',
    value: 'orange',
    type: 'fruit',
    kosher: 'yes'
  },
  {
    _id: '5c419f8ee7179a7d1247dd9d',
    label: 'tomato',
    value: 'tomato',
    type: 'fruit',
    kosher: 'yes'
  },
  {
    _id: '5c41a01de7179a7d1247de08',
    label: 'beef',
    value: 'beef',
    type: 'meat',
    kosher: 'yes'
  },
  {
    _id: '5c41a038e7179a7d1247de1e',
    label: 'pork',
    value: 'pork',
    type: 'meat',
    kosher: 'no'
  },
  {
    _id: '5c41a08ce7179a7d1247de3f',
    label: 'chicken',
    value: 'chicken',
    type: 'meat',
    kosher: 'yes'
  },
  {
    _id: '5c41a0e0e7179a7d1247de72',
    label: 'tuna',
    value: 'tuna',
    type: 'sea food',
    kosher: 'yes'
  },
  {
    _id: '5c41a10ce7179a7d1247de90',
    label: 'flour',
    value: 'flour',
    type: 'pareve',
    kosher: 'yes'
  },
  {
    _id: '5c41a15ae7179a7d1247dea7',
    label: 'butter',
    value: 'butter',
    type: 'dairy',
    kosher: 'yes'
  },
  {
    _id: '5c41a16ee7179a7d1247deae',
    label: 'milk',
    value: 'milk',
    type: 'dairy',
    kosher: 'yes'
  },
  {
    _id: '5c41a199e7179a7d1247dec4',
    label: 'cream cheese',
    value: 'cream cheese',
    type: 'dairy',
    kosher: 'yes'
  },
  {
    _id: '5c41a1c8e7179a7d1247dee0',
    label: 'ice cream',
    value: 'ice cream',
    type: 'dairy',
    kosher: 'yes'
  }
]
export default ingredientList
