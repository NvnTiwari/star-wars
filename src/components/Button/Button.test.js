import React from 'react'
import { render } from '@testing-library/react'
import Button from './index'

test('Should render button with provided text, text="Submit"', () => {
  const testMessage = 'Submit'
  const { getByText } = render(
    <Button onClick={() => {}}>{testMessage}</Button>,
  )

  expect(getByText(testMessage)).toBeInTheDocument()
})