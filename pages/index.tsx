import { useEffect, useState } from 'react'

// config
import { API_ENDPOINT } from '../config'


// styles
import styles from '../styles/Home.module.scss'

// components
import List from '../components/List'
import Layout from '../components/Layout'

// types
interface Item {
  id: string
}

// constants
let observer: IntersectionObserver
let currentPage: number = 0

// fetch
async function search (currentPage: number) {
  const limit = 6
  const skip = currentPage * limit / 1

  const res = await fetch(`${API_ENDPOINT}/api/products?limit=${limit}&skip=${skip}`)
  const { products } = await res.json()

  return { items: products }
}

export default function Home(data: { items: Array<Array<Item>> }) {
  const [loading, setLoading ] = useState(false)
  const [items, setItems] = useState(data.items)

  useEffect(() => {
    function handleIntersect (e, o) {
      e.forEach((entry) => {
        if (entry.isIntersecting) {
          // log
          console.log('viewed item:', entry.target.dataset.id)

          if (entry.target.dataset.last === 'true') {
            currentPage++
            setLoading(true)

            search(currentPage).then((res) => {
              if (!res?.items?.length) {
                setLoading(false)
                return
              }

              setTimeout(() => {
                setItems([...items, res.items])
                setLoading(false)
              }, 1000)
            })
          }
    
          o.unobserve(entry.target)
        }
      })
    }

    observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '0px',
      threshold: 1.0,
    })

    items[currentPage].forEach(({ id }) => {
      observer.observe(document.querySelector(`div[data-id="${id}"]`) as HTMLDivElement)
    })
  }, [items])

  return (
    <>
      <Layout>
        <section className={`wrapper ${styles.home}`}>
          <h1>Marcas</h1>

          <List items={items} loading={loading} />
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const { items } = await search(0)

  return { 
    props: { 
      items: [items]
    } 
  }
}
