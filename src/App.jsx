import { useState } from 'react'
import ProductsList from './ProductsList'
import SearchList from './SearchList'

function App() {
  const [products, setProducts] = useState([])

  return (
    <div>
      <SearchList setProducts={setProducts} />
      <ProductsList products={products} setProducts={setProducts}/>
    </div>
  )
}

export default App
