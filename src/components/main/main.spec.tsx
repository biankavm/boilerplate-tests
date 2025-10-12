import { Main } from './main'
import { render, screen } from '@testing-library/react'

describe('Main', () => {
  it('should render', () => {
    render(<Main />)
    expect(screen.getByText('Main')).toBeInTheDocument()
  })
})
