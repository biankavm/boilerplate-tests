import { CreateTask } from './create-task'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CREATE_TASK } from '@/graphql'
import { MockedProvider } from '@apollo/client/testing/react'

const createTaskMock = (title: string) => ({
  request: {
    query: CREATE_TASK,
    variables: { title }
  },
  result: {
    data: {
      createTask: {
        id: '1',
        title,
        completed: false,
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    }
  }
})

describe('CreateTask', () => {
  const renderComp = ({ title = 'my task' }: { title?: string } = {}) => {
    const mocks = title ? [createTaskMock(title)] : []

    return render(
      <MockedProvider mocks={mocks}>
        <CreateTask />
      </MockedProvider>
    )
  }

  it('should render correctly', () => {
    const { container } = renderComp()
    expect(container).toMatchSnapshot()
  })

  it('should have a correctly placeholder in input', () => {
    renderComp()

    expect(
      screen.getByPlaceholderText(/digite uma nova tarefa/i)
    ).toBeInTheDocument()
  })

  it('should create task when filling input and clicking button', async () => {
    const taskTitle = 'Nova tarefa'

    renderComp({ title: taskTitle })

    const user = userEvent.setup() // criando instância de usuário (com contexto próprio)

    const input = screen.getByPlaceholderText(/digite uma nova tarefa/i)
    const button = screen.getByRole('button', { name: /criar/i })

    expect(button).toBeDisabled() // botão começa desabilitado

    // simula o usuário preenchendo o input
    await userEvent.type(input, taskTitle)

    expect(button).not.toBeDisabled() // após o usuário digitar, habilitamos

    expect(input).toHaveValue(taskTitle) // após o usuário digitar, o input tem o valor da task

    await user.click(button)
    expect(button).toHaveTextContent('Criando...') // botão muda para "Criando..."

    // após criar a task, o input é limpo
    // waitFor: é um método que espera uma condição ser true
    await waitFor(() => {
      expect(input).toHaveValue('')
      expect(button).toHaveTextContent('Criar')
    })
  })
})
