import React from 'react'
import renderer from 'react-test-renderer'
import Profile from '../src/components/Profile/Profile'

//TODO: fetch is not defined in nodejs
// so we are checking globally if fetch exists
// This code snippet should be moved to a generic place for test setup.
// see Jest documentation of how to do that
if (!global.fetch) {
  global.fetch = require('node-fetch')
}

test('renders correctly', () => {
  const tree = renderer.create(<Profile />).toJSON()
  expect(tree).toMatchSnapshot()
})
