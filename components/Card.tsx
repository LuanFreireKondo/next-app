import { Item } from '../types/item'

// styles
import styles from '../styles/Card.module.scss'

interface Props {
  data: Item
  last: string
}

function Card (props: Props) {
  const {
    data: {
      id, 
      price, 
      title,
    }, 
    last 
  } = props

  const currency = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  return (
    <div data-item="card" data-id={id} data-last={last} className={styles.card}>
      <div className="card__image"></div>

      <span className="card__title">
        {title}
      </span>

      <span className="card__price">
        {currency}
      </span>
    </div>
  )
}

export default Card