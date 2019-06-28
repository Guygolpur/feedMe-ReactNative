import React from 'react'
import renderer from 'react-test-renderer'
import Profile from '../src/components/Profile/Profile'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

if (!global.fetch) {
  global.fetch = require('node-fetch')
}
describe('Profile tests component', () => {
  test('match snapshot', () => {
    const testRenderer = renderer.create(<Profile gmailAccount={'barazouri@gmail.com'} />).toJSON()
    expect(testRenderer).toMatchSnapshot()
  })
  test('check props exist', () => {
    const testRenderer = renderer.create(<Profile gmailAccount={'barazouri@gmail.com'} />)
    expect(testRenderer.root.props).toHaveProperty('gmailAccount')
  })
  test('check edit function and handle save', () => {
    const wrapper = shallow(<Profile gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    expect(wrapper.state('editing')).toBe(false)
    componentInstance.edit()
    expect(wrapper.state('editing')).toBe(true)
    componentInstance.handleSave()
    expect(wrapper.state('editing')).toBe(false)
  })
  test('check add function', async () => {
    const wrapper = await shallow(<Profile gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    expect(wrapper.state('profile')).toStrictEqual([])
    await componentInstance.add('gmailAccount', 'prohibitions', 'imageUrl', 'userName')
    expect(wrapper.state('profile')).toStrictEqual({
      id: 1,
      gmailAccount: 'gmailAccount',
      prohibitions: 'prohibitions',
      imageUrl: 'imageUrl',
      userName: 'userName'
    })
  })
  test('check handleProhabition function and handle save', async () => {
    const wrapper = shallow(<Profile gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    await componentInstance.handleProhabition('tuna')
    expect(componentInstance.prohibitions).toBe('tuna')
  })
  test('check handleUserName and handleImageUrl function and handle save', async () => {
    const wrapper = shallow(<Profile gmailAccount={'barazouri24@gmail.com'} />)
    const componentInstance = wrapper.instance()
    await componentInstance.handleUserName('bar')
    expect(componentInstance.userName).toBe('bar')
    await componentInstance.handleImageUrl('handleImageUrl')
    expect(componentInstance.imageUrl).toBe('handleImageUrl')
  })
})
