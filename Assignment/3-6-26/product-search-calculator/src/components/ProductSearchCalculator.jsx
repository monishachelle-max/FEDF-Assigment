import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'

const ProductSearchCalculator = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 79.99 },
    { id: 4, name: 'Monitor', price: 299.99 },
    { id: 5, name: 'Headphones', price: 149.99 },
    { id: 6, name: 'USB Cable', price: 9.99 }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (searchTerm.trim() === '') {
      document.title = '🛒 Product Search - All Products'
    } else {
      document.title = `🔍 Product Search - "${searchTerm}"`
    }
  }, [searchTerm])

  const filteredProducts = useMemo(() => {
    console.log('🔍 Filtering products...')
    if (searchTerm.trim() === '') return products
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  const totalPrice = useMemo(() => {
    console.log('💰 Calculating total price...')
    return filteredProducts.reduce((sum, product) => sum + product.price, 0)
  }, [filteredProducts])

  const statistics = useMemo(() => {
    const averagePrice = filteredProducts.length > 0 ? totalPrice / filteredProducts.length : 0
    const highestPrice = filteredProducts.length > 0 ? Math.max(...filteredProducts.map(p => p.price)) : 0
    const lowestPrice = filteredProducts.length > 0 ? Math.min(...filteredProducts.map(p => p.price)) : 0
    return { averagePrice, highestPrice, lowestPrice, productCount: filteredProducts.length }
  }, [filteredProducts, totalPrice])

  const handleRemoveProduct = useCallback((idToRemove) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== idToRemove))
  }, [])

  const handleAddProduct = () => {
    if (newProductName.trim() === '') {
      alert('⚠️ Please enter a product name')
      return
    }
    const price = parseFloat(newProductPrice)
    if (isNaN(price) || price <= 0) {
      alert('⚠️ Please enter a valid price')
      return
    }
    setProducts([...products, { id: Date.now(), name: newProductName.trim(), price }])
    setNewProductName('')
    setNewProductPrice('')
  }

  const focusSearchInput = () => searchInputRef.current?.focus()
  const clearSearch = () => {
    setSearchTerm('')
    searchInputRef.current?.focus()
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>🛍️ Product Search & Price Calculator</h1>
      <p style={{ textAlign: 'center' }}>Assignment 2 - React Hooks Implementation</p>

      {/* Search Section */}
      <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
        <h2>🔍 Search Products</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name..."
            style={{ flex: 1, padding: '10px' }}
          />
          <button onClick={focusSearchInput} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Focus Search
          </button>
          <button onClick={clearSearch} style={{ padding: '10px 20px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Clear
          </button>
        </div>
        {searchTerm && <p>Showing results for: "{searchTerm}" ({filteredProducts.length} products found)</p>}
      </div>

      {/* Price Summary */}
      <div style={{ background: '#e8f5e8', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
        <h2>💰 Price Summary</h2>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>Average Price: ${statistics.averagePrice.toFixed(2)}</p>
        <p>Highest Price: ${statistics.highestPrice.toFixed(2)}</p>
        <p>Lowest Price: ${statistics.lowestPrice.toFixed(2)}</p>
        <p>Products Displayed: {statistics.productCount}</p>
      </div>

      {/* Add Product */}
      <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
        <h2>➕ Add New Product</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} placeholder="Product name" style={{ flex: 1, padding: '10px' }} />
          <input type="number" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} placeholder="Price" style={{ flex: 0.5, padding: '10px' }} />
          <button onClick={handleAddProduct} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
        <h2>📦 Product List</h2>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Product Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{product.name}</td>
                  <td style={{ padding: '10px' }}>${product.price.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => handleRemoveProduct(product.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ProductSearchCalculator