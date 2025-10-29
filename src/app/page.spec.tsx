import Home from './page'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/topbar', () => ({
  Topbar: jest.fn(() => <div>my topbar</div>)
}))

jest.mock('./task-list', () => ({
  TaskList: jest.fn(() => <div>my task list</div>)
}))

describe('Home', () => {
  const renderComp = () => render(<Home />)

  it('should render component', () => {
    renderComp()
    expect(screen.getByText('my topbar')).toBeInTheDocument()
    expect(screen.getByText(/my task list/i)).toBeInTheDocument()
  })
})
