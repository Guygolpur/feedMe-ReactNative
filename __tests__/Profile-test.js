import React from 'react'
import renderer from 'react-test-renderer'
import Profile from '../src/components/Profile/Profile'
if (!global.fetch) {
  global.fetch = require('node-fetch')
}

test('renders correctly', () => {
  const tree = renderer.create(<Profile />).toJSON()
  expect(tree).toMatchSnapshot()
})
