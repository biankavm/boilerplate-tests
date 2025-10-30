import { Topbar } from './topbar'
import { render, screen } from '@testing-library/react'

describe('Topbar', () => {
  const renderComp = () => render(<Topbar />)

  it('should render correctly', () => {
    const { container } = renderComp()
    expect(container).toMatchSnapshot()
  })

  it('should render text links', () => {
    renderComp()
    expect(screen.getByText(/tarefas/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /perfil/i }))
  })

  it('should links have correct attributes', async () => {
    renderComp()
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[1]).toHaveAttribute('href', '/profile')
  })
})
