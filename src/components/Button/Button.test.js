import React from 'react'
import { render } from '@testing-library/react'
import Button from './index'

test('shows the children when the checkbox is checked', () => {
  const testMessage = 'Submit'
  const { getByText } = render(
    <Button onClick={() => {}}>{testMessage}</Button>,
  )

  expect(getByText(testMessage)).toBeInTheDocument()
})