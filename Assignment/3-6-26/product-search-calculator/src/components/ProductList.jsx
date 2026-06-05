import React, { memo } from 'react'

const ProductList = memo(({ products, onRemoveProduct }) => {
  console.log('📝 Rendering ProductList')

  if (products.length === 0) {
    return (
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
        <h2>📦 Product List</h2>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px' }}>🔍</div>
          <p>No products found</p>
          <p style={{ fontSize: '14px', color: '#666' }}>Try a different search term or add a new product!</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>📦 Product List</h2>
        <span style={{ background: '#667eea', color: 'white', padding: '5px 12px', borderRadius: '20px' }}>
          {products.length} products
        </span>
      </div>

      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.5fr', background: '#f8f9fa', padding: '15px', fontWeight: 'bold', borderBottom: '2px solid #e0e0e0' }}>
          <span>Product Name</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {products.map((product) => (
          <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.5fr', padding: '15px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
            <span style={{ fontWeight: '500' }}>{product.name}</span>
            <span style={{ color: '#28a745', fontWeight: '600' }}>${product.price.toFixed(2)}</span>
            <button
              onClick={() => onRemoveProduct(product.id)}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '80px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#c82333'}
              onMouseLeave={(e) => e.target.style.background = '#dc3545'}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
})

ProductList.displayName = 'ProductList'
export default ProductList