import Link from 'next/link'
import styles from './topbar.module.scss'

export function Topbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.navLink}>
        Tarefas
      </Link>
      <Link href="/profile" className={styles.navLink}>
        Perfil
      </Link>
    </nav>
  )
}
