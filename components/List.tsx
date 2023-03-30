// styles
import styles from '../styles/Layout.module.scss'

// components
import Card from '../components/Card'

export default function List ({ items, loading }) {
  const list = items.flat()
  const last = list[list.length - 1]

  return (
    <div className="list">
      {list.map((item) => (
        <Card key={item.id} data={item} last={item.id === last.id} />
      ))}

      <span className={styles.loading}>
        { loading ? 'loading...' : ('') }
      </span>
    </div>
  )
}