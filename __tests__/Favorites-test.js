import React from 'react'
import renderer from 'react-test-renderer'
import Favorites from '../src/components/Favorites/Favorites'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

if (!global.fetch) {
  global.fetch = require('node-fetch')
}
describe('Favorites component tests', () => {
  test('renders correctly', async () => {
    const tree = await renderer
      .create(<Favorites gmailAccount={'barazouri24@gmail.com'} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('check toHaveProperty props', async () => {
    const testRenderer = await renderer.create(<Favorites gmailAccount={'barazouri24@gmail.com'} />)
    expect(testRenderer.root.props).toHaveProperty('gmailAccount')
  })
  test('check changeOpenInstructionMode function', () => {
    const wrapper = shallow(<Favorites gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    expect(wrapper.state('openInstructionMode')).toBe(false)
    componentInstance.changeOpenInstructionMode()
    expect(wrapper.state('openInstructionMode')).toBe(true)
  })
  test('check openInstruction function', () => {
    const wrapper = shallow(<Favorites gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    expect(wrapper.state('openInstructionMode')).toBe(false)
    componentInstance.openInstruction({})
    expect(wrapper.state('openInstructionMode')).toBe(true)
  })
  test('check loading', async () => {
    const wrapper = shallow(<Favorites gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    expect(wrapper.state('loading')).toBe(true)
    await componentInstance.getData()
    expect(wrapper.state('loading')).toBe(false)
  })
})
