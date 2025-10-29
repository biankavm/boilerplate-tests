import { TaskList } from './task-list'
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
