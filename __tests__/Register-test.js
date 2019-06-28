import React from 'react'
import renderer from 'react-test-renderer'
import Register from '../src/components/Register/Register'

if (!global.fetch) {
  global.fetch = require('node-fetch')
}

jest.mock('expo', () => ({
  Permissions: {
    askAsync: jest.fn()
  }
}))

describe('Register component tests', () => {
  test('renders correctly', async () => {
    const mockFunck = jest.fn()
    const tree = await renderer
      .create(<Register changeGmailMode={mockFunck} changeGmailAccount={mockFunck} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('check props exist', async () => {
    const changeGmailMode = jest.fn()
    const changeGmailAccount = jest.fn()
    const testRenderer = await renderer.create(
      <Register changeGmailMode={changeGmailMode} changeGmailAccount={changeGmailAccount} />
    )
    expect(testRenderer.root.props).toHaveProperty('changeGmailMode')
    expect(testRenderer.root.props).toHaveProperty('changeGmailAccount')
  })
  test('call action changeGmailMode', async () => {
    const changeGmailMode = jest.fn()
    const changeGmailAccount = jest.fn()
    const testRenderer = renderer.create(
      <Register changeGmailMode={changeGmailMode} changeGmailAccount={changeGmailAccount} />
    )
    const RegisterComponent = testRenderer.root.findAllByType(Register)[0]
    RegisterComponent.props.changeGmailMode()
    expect(changeGmailMode).toHaveBeenCalledTimes(1)
    RegisterComponent.props.changeGmailAccount('barazouri24@gmail.com')
    expect(changeGmailAccount).toHaveBeenCalledTimes(1)
  })
})
