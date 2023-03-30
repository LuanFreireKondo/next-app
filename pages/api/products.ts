// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    limit = 10, 
    skip = 0 
  } = req.query

  const data = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,id,price`)
  const { products } = await data.json()

  res.status(200).json({ products })
}
