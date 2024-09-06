import React, { useState, useEffect } from 'react'

export default function SearchList(props) {
  const { setProducts } = props
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const fetchFilterProducts = async () =>{
      // const resp = await fetch(`https://dummyjson.com/products/search?q=${id}`)
      const resp = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=10&skip=${(currentPage - 1) * 10}`)
      const result = await resp.json()
      setProducts(result.products)
      setTotalPages(Math.ceil(result.total / 10))
  }
  // useEffect(() => {
  //   let sto = setTimeout(() => {
  //     setDebouncedTerm(searchTerm)
  //   },1000)

  //   return () => {
  //     clearTimeout(sto)
  //   }
  // },[searchTerm])

  useEffect(() => {
    console.log('useEffect run...')
    const sto = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 1000)

    return () => {
      console.log('clear timeout...')
      clearTimeout(sto)
    }
  }, [searchTerm])

  useEffect(() => {
    if (debouncedTerm) {
      fetchFilterProducts(searchTerm)
    }
  }, [debouncedTerm, setProducts,currentPage])

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-5xl font-bold mb-4 text-center items-center text-orange-500">Product Search</h1>
     
      <input
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         className="w-full p-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <div className='flex justify-center text-sm gap-2 mx-auto items-center p-2 m-2'>
      <button 
      className='p-1 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-600 hover:text-white'
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      >prev</button>
      <p>page {currentPage} of {totalPages}</p>
      <button 
      className='p-1 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-600 hover:text-white'
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      >next</button>
      </div>
    </div>
  )
}
