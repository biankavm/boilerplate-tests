import { TaskList } from '@/components/tasks'
import styles from './page.module.scss'
import { Topbar } from '@/components/topbar'

export default function Home() {
  return (
    <div className={styles.page}>
      <Topbar />
      <main className={styles.main}>
        <TaskList />
      </main>
    </div>
  )
}
