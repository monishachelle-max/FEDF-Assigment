import React from 'react'

// Child Component - Product List
// Receives memoized remove function from parent (useCallback)
const ProductList = React.memo(({ products, onRemoveProduct }) => {
    console.log('📝 ProductList rendered')

    // Empty State - When no products match search
    if (products.length === 0) {
        return (
            <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                    <div className="display-1 mb-3">🔍</div>
                    <h5 className="text-muted">No products found</h5>
                    <p className="text-muted small">Try a different search term or add a new product!</p>
                </div>
            </div>
        )
    }

    // Product List Table
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4 d-flex justify-content-between align-items-center">
                <h3 className="h4 mb-0">📦 Product List</h3>
                <span className="badge bg-primary rounded-pill fs-6">
                    {products.length} product{products.length !== 1 ? 's' : ''}
                </span>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Product Name</th>
                                <th className="text-center" style={{ width: '150px' }}>Price</th>
                                <th className="text-center" style={{ width: '100px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <strong>{product.name}</strong>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge bg-success fs-6">
                                            💵 ${product.price.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => onRemoveProduct(product.id)}
                                            className="btn btn-danger btn-sm"
                                            aria-label={`Remove ${product.name}`}
                                        >
                                            🗑️ Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="table-light">
                            <tr>
                                <td colSpan="3" className="text-muted small py-3">
                                    <strong>Total Products:</strong> {products.length} |
                                    <strong> Total Value:</strong> ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
})

ProductList.displayName = 'ProductList'

export default ProductList