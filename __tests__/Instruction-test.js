import React from 'react'
import renderer from 'react-test-renderer'
import Instruction from '../src/components/Instruction/Instruction'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

if (!global.fetch) {
  global.fetch = require('node-fetch')
}
describe('Instruction component tests', () => {
  test('renders correctly', async () => {
    const mockFunck = await jest.fn()
    const tree = await renderer
      .create(<Instruction backToRecipeList={mockFunck} recipe={{ name: 'Budino Di Ricotta' }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('check toHaveProperty props', async () => {
    const mockFunck = await jest.fn()
    const testRenderer = await renderer.create(
      <Instruction backToRecipeList={mockFunck} recipe={{ name: 'Budino Di Ricotta' }} />
    )
    expect(testRenderer.root.props).toHaveProperty('backToRecipeList')
    expect(testRenderer.root.props).toHaveProperty('recipe')
  })
  test('check addInstruction function', async () => {
    const mockFunck = await jest.fn()
    const wrapper = shallow(
      <Instruction backToRecipeList={mockFunck} recipe={{ name: 'Budino Di Ricotta' }} />
    )
    const componentInstance = wrapper.instance()
    expect(wrapper.state('ready')).toBe(false)
    expect(wrapper.state('instructions')).toStrictEqual({
      strMeal: '',
      strCategory: '',
      strArea: '',
      strInstructions: '',
      strMealThumb: '',
      strYoutube: ''
    })
    await componentInstance.addInstruction(
      'meal',
      'catagory',
      'strArea',
      'strInstructions',
      'strMealThumb',
      'strYoutube'
    )
    expect(wrapper.state('ready')).toBe(true)
    expect(wrapper.state('instructions')).toStrictEqual({
      strMeal: 'meal',
      strCategory: 'catagory',
      strArea: 'strArea',
      strInstructions: 'strInstructions',
      strMealThumb: 'strMealThumb',
      strYoutube: 'strYoutube'
    })
  })
  test('check calling backToRecipeList', async () => {
    const mockFunck = await jest.fn()
    const wrapper = await shallow(
      <Instruction backToRecipeList={mockFunck} recipe={{ name: 'Budino Di Ricotta' }} />
    ).instance()
    wrapper.props.backToRecipeList()
    expect(mockFunck).toHaveBeenCalled()
    expect(mockFunck).toHaveBeenCalledTimes(1)
  })
})
