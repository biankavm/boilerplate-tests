import { TaskList } from './task-list'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import { GET_TASKS } from '@/graphql'

const mocks = [
  {
    request: {
      query: GET_TASKS
    },
    result: {
      data: {
        tasks: [
          {
            id: '1',
            title: 'some title',
            completed: false,
            createdAt: '30/10/25'
          }
        ]
      }
    }
  }
]

const mocksNoTasks = [
  {
    request: {
      query: GET_TASKS
    },
    error: new Error('some error')
  }
]

jest.mock('@/components/tasks', () => ({
  TaskItem: jest.fn(({ id, title }) => (
    <div>
      {id} {title}
    </div>
  )),
  CreateTask: jest.fn(() => <div> create task test</div>)
}))

describe('TaskList', () => {
  const renderComp = () =>
    render(
      <MockedProvider mocks={mocks}>
        <TaskList />
      </MockedProvider>
    )

  it('should render correctly', async () => {
    const { container } = renderComp()

    expect(screen.getByText(/carregando tarefas.../i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/some title/i)).toBeVisible()
    })

    expect(screen.queryByText(/carregando tarefas.../i)).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('should render messages no tasks exists', async () => {
    render(
      <MockedProvider mocks={mocksNoTasks}>
        <TaskList />
      </MockedProvider>
    )

    // expect(
    //   await screen.findByText(/Nenhuma tarefa cadastrada ainda/i)
    // ).toBeInTheDocument()
    // expect(
    //   await screen.findByText(/Comece criando sua primeira tarefa acima!/i)
    // ).toBeInTheDocument()
    expect(
      await screen.findByText(/Erro ao carregar tarefas/i)
    ).toBeInTheDocument()
  })
})
