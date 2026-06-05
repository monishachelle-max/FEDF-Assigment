import React, { memo } from 'react'

const PriceSummary = memo(({ totalPrice, statistics }) => {
  const { averagePrice, highestPrice, lowestPrice, productCount } = statistics

  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
      <h2>💰 Price Summary</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '32px' }}>💵</span>
          <div>
            <div style={{ fontSize: '12px', color: '#666' }}>TOTAL PRICE</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>${totalPrice.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '32px' }}>📊</span>
          <div>
            <div style={{ fontSize: '12px', color: '#666' }}>AVERAGE PRICE</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>${averagePrice.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '32px' }}>⬆️</span>
          <div>
            <div style={{ fontSize: '12px', color: '#666' }}>HIGHEST PRICE</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>${highestPrice.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '32px' }}>⬇️</span>
          <div>
            <div style={{ fontSize: '12px', color: '#666' }}>LOWEST PRICE</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>${lowestPrice.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '32px' }}>🔢</span>
          <div>
            <div style={{ fontSize: '12px', color: '#666' }}>PRODUCTS DISPLAYED</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{productCount}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

PriceSummary.displayName = 'PriceSummary'
export default PriceSummary