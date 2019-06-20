import React from 'react'
import renderer from 'react-test-renderer'
import Profile from '../src/components/Profile/Profile'

test('renders correctly', () => {
    const tree = renderer.create(<Profile />).toJSON()
    expect(tree).toMatchSnapshot()
})
