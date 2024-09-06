import { useEffect } from 'react'
export default function ProductsList(props) {
  const { products, setProducts } = props

  const fetchProductsLists = async () => {
      const resp = await fetch('https://dummyjson.com/products/search?q=phone')
      const result = await resp.json()
      setProducts(result.products)
  }

  useEffect(() => {
    fetchProductsLists(); 
  }, [])

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ul className="space-y-4">
        {products.map((el) => (
          <li className="p-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50" key={el.id}>
            {/* <p className="block text-lg font-semibold">{el.title} | {el.category} | ${el.price}</p> */}
            <p className="block text-lg font-semibold">{el.title}</p> 
            <p className="block text-sm text-gray-600">{el.category}</p>
            <p className="block text-md font-medium text-orange-500">${el.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
