import React from 'react'
// import Intro from '../Intro'
import renderer from 'react-test-renderer'
import { Favorites } from '../src/components/Favorites/Favorites'

test('renders correctly', () => {
    const tree = renderer.create(<Favorites />).toJSON()
    expect(tree).toMatchSnapshot()
})
// describe('Favorites tests', function() {
//     test('renders correctly', async () => {
//       const testRenderer = renderer.create(
//         <Favorites headerMode={false} favoritePage={false} zoomInPhoto={false} />
//       )
//       expect(testRenderer.root.props).toHaveProperty('headerMode')
//       expect(testRenderer.root.props).toHaveProperty('favoritePage')
//       expect(testRenderer.root.props).toHaveProperty('zoomInPhoto')
//     })
// })

// it('App renders without crashing', () => {
//     const rendered = renderer.create(<Favorites />).toJSON();
//     expect(rendered).toBeTruthy();
//     });
//     it('App test against snapshot', () => {
//     const tree = renderer.create(<Favorites />).toJSON();
//     expect(tree).toMatchSnapshot();
//     });