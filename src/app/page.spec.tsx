import Home from './page'
import { render, screen } from '@testing-library/react'

jest.mock('./task-list', () => ({
  TaskList: jest.fn(() => <div>my task list</div>)
}))

describe('Home', () => {
  const renderComp = () => render(<Home />)

  it('should render component', () => {
    renderComp()
    expect(screen.getByText(/my task list/i)).toBeInTheDocument()
  })
})
