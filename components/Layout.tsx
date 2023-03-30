import Head from 'next/head'

// styles
import styles from '../styles/Layout.module.scss'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        HEADER
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        FOOTER
      </footer>
    </>
  )
}