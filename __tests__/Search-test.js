import React from 'react'
import renderer from 'react-test-renderer'
import Search from '../src/components/Search/Search'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

if (!global.fetch) {
  global.fetch = require('node-fetch')
}
describe('Search component tests', () => {
  test('renders correctly', async () => {
    const tree = await renderer.create(<Search gmailAccount={'barazouri24@gmail.com'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('check props exist', async () => {
    const testRenderer = await renderer.create(<Search gmailAccount={'barazouri24@gmail.com'} />)
    expect(testRenderer.root.props).toHaveProperty('gmailAccount')
  })
  test('check initialize states', () => {
    const wrapper = shallow(<Search gmailAccount={'barazouri24@gmail.com'} />)
    expect(wrapper.state('openInstructionMode')).toBe(false)
    expect(wrapper.state('firstPick')).toBe('')
    expect(wrapper.state('secondPick')).toBe('')
    expect(wrapper.state('thirdPick')).toBe('')
    expect(wrapper.state('openInstructionMode')).toBe(false)
    expect(wrapper.state('loading')).toBe(false)
  })
  test('check openInstruction function', () => {
    const wrapper = shallow(<Search gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    expect(wrapper.state('openInstructionMode')).toBe(false)
    componentInstance.openInstruction({})
    expect(wrapper.state('openInstructionMode')).toBe(true)
  })
  test('check handleClick function', async () => {
    const wrapper = shallow(<Search gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    expect(wrapper.state('loading')).toBe(false)
    await componentInstance.handleClick()
    expect(wrapper.state('loading')).toBe(false)
  })
  test('check changeOpenInstructionMode function', () => {
    const wrapper = shallow(<Search gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    expect(wrapper.state('openInstructionMode')).toBe(false)
    componentInstance.changeOpenInstructionMode()
    expect(wrapper.state('openInstructionMode')).toBe(true)
  })
})
