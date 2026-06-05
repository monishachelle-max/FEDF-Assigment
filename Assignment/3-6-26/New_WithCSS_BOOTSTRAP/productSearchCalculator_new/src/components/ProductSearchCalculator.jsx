import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import ProductList from './ProductList'
import PriceSummary from './PriceSummary'

const ProductSearchCalculator = () => {
    // ========== useState: Store products with names and prices ==========
    const [products, setProducts] = useState([
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Mouse', price: 29.99 },
        { id: 3, name: 'Keyboard', price: 79.99 },
        { id: 4, name: 'Monitor', price: 299.99 },
        { id: 5, name: 'Headphones', price: 149.99 },
        { id: 6, name: 'USB Cable', price: 9.99 }
    ])

    // ========== useState: Search feature ==========
    const [searchTerm, setSearchTerm] = useState('')

    // ========== useState: Add new product ==========
    const [newProductName, setNewProductName] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    // ========== useRef: Focus search input ==========
    const searchInputRef = useRef(null)

    // ========== useEffect: Update browser tab title with search text ==========
    useEffect(() => {
        if (searchTerm.trim() === '') {
            document.title = '🛒 Product Search - All Products'
        } else {
            document.title = `🔍 Product Search - "${searchTerm}"`
        }
    }, [searchTerm])

    // ========== useEffect: Auto-focus search input on load ==========
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [])

    // ========== useMemo: Filter products based on search term ==========
    const filteredProducts = useMemo(() => {
        console.log('🔍 Filtering products...')
        if (searchTerm.trim() === '') {
            return products
        }
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [products, searchTerm])

    // ========== useMemo: Calculate total price of displayed products ==========
    const totalPrice = useMemo(() => {
        console.log('💰 Calculating total price...')
        return filteredProducts.reduce((sum, product) => sum + product.price, 0)
    }, [filteredProducts])

    // ========== useMemo: Additional statistics ==========
    const statistics = useMemo(() => {
        console.log('📊 Calculating statistics...')
        const averagePrice = filteredProducts.length > 0
            ? totalPrice / filteredProducts.length
            : 0
        const highestPrice = filteredProducts.length > 0
            ? Math.max(...filteredProducts.map(p => p.price))
            : 0
        const lowestPrice = filteredProducts.length > 0
            ? Math.min(...filteredProducts.map(p => p.price))
            : 0

        return {
            averagePrice,
            highestPrice,
            lowestPrice,
            productCount: filteredProducts.length
        }
    }, [filteredProducts, totalPrice])

    // ========== useCallback: Memoized function for removing products ==========
    const handleRemoveProduct = useCallback((idToRemove) => {
        setProducts(prevProducts => {
            const removedProduct = prevProducts.find(p => p.id === idToRemove)
            console.log(`🗑️ Removed product: ${removedProduct?.name}`)
            setSuccessMessage(`✅ ${removedProduct?.name} removed successfully!`)
            setTimeout(() => setSuccessMessage(''), 2000)
            return prevProducts.filter(product => product.id !== idToRemove)
        })
    }, [])

    // ========== Add new product ==========
    const handleAddProduct = () => {
        if (newProductName.trim() === '') {
            alert('⚠️ Please enter a product name')
            return
        }

        const price = parseFloat(newProductPrice)
        if (isNaN(price) || price <= 0) {
            alert('⚠️ Please enter a valid price (greater than 0)')
            return
        }

        const newProduct = {
            id: Date.now(),
            name: newProductName.trim(),
            price: price
        }

        setProducts(prevProducts => [...prevProducts, newProduct])
        setNewProductName('')
        setNewProductPrice('')
        setSuccessMessage(`✅ ${newProduct.name} added successfully!`)
        setTimeout(() => setSuccessMessage(''), 2000)
    }

    // ========== Focus search input handler ==========
    const focusSearchInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }

    // ========== Clear search ==========
    const clearSearch = () => {
        setSearchTerm('')
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }

    // ========== Reset to default products ==========
    const resetProducts = () => {
        if (window.confirm('Reset to default products?')) {
            setProducts([
                { id: 1, name: 'Laptop', price: 999.99 },
                { id: 2, name: 'Mouse', price: 29.99 },
                { id: 3, name: 'Keyboard', price: 79.99 },
                { id: 4, name: 'Monitor', price: 299.99 },
                { id: 5, name: 'Headphones', price: 149.99 },
                { id: 6, name: 'USB Cable', price: 9.99 }
            ])
            setSearchTerm('')
            setSuccessMessage('🔄 Products reset to default!')
            setTimeout(() => setSuccessMessage(''), 2000)
        }
    }

    return (
        <div className="container-fluid p-0">
            {/* Header Section */}
            <div className="bg-gradient-primary text-white py-5">
                <div className="container">
                    <div className="text-center">
                        <h1 className="display-4 fw-bold mb-3">
                            🛍️ Product Search & Price Calculator
                        </h1>
                        <p className="lead mb-0">Assignment 2 - React Hooks with Bootstrap</p>
                    </div>
                </div>
            </div>

            <div className="container py-4">
                {/* Success Message */}
                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {successMessage}
                        <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                    </div>
                )}

                {/* Search Section - useRef in action */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-0 pt-4">
                        <h3 className="h4 mb-0">🔍 Search Products</h3>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by product name..."
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex gap-2">
                                    <button onClick={focusSearchInput} className="btn btn-secondary btn-lg">
                                        🎯 Focus Search
                                    </button>
                                    <button onClick={clearSearch} className="btn btn-info btn-lg text-white">
                                        ✖ Clear
                                    </button>
                                    <button onClick={resetProducts} className="btn btn-warning btn-lg">
                                        🔄 Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                        {searchTerm && (
                            <div className="mt-3">
                                <div className="alert alert-info mb-0">
                                    Showing results for: <strong>"{searchTerm}"</strong>
                                    <span className="badge bg-primary ms-2">
                                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Price Summary - Receives memoized calculations */}
                <PriceSummary totalPrice={totalPrice} statistics={statistics} />

                {/* Add Product Section */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-0 pt-4">
                        <h3 className="h4 mb-0">➕ Add New Product</h3>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={newProductName}
                                    onChange={(e) => setNewProductName(e.target.value)}
                                    placeholder="Product name"
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    value={newProductPrice}
                                    onChange={(e) => setNewProductPrice(e.target.value)}
                                    placeholder="Price"
                                    step="0.01"
                                    min="0"
                                />
                            </div>
                            <div className="col-md-4">
                                <button onClick={handleAddProduct} className="btn btn-primary btn-lg w-100">
                                    ➕ Add Product
                                </button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <small className="text-muted">💡 Tip: Add products with name and price to see them in the list below</small>
                        </div>
                    </div>
                </div>

                {/* Product List - Receives memoized callback */}
                <ProductList products={filteredProducts} onRemoveProduct={handleRemoveProduct} />

                {/* Hooks Information */}
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 bg-light">
                            <div className="card-body">
                                <h4 className="mb-3">✅ React Hooks Implemented</h4>
                                <div className="row g-3">
                                    <div className="col-md-2 col-sm-4 col-6">
                                        <div className="p-2 bg-white rounded text-center">
                                            <strong className="text-primary">useState</strong>
                                            <small className="d-block text-muted">Products & search</small>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6">
                                        <div className="p-2 bg-white rounded text-center">
                                            <strong className="text-success">useEffect</strong>
                                            <small className="d-block text-muted">Tab title updates</small>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6">
                                        <div className="p-2 bg-white rounded text-center">
                                            <strong className="text-info">useRef</strong>
                                            <small className="d-block text-muted">Focus search input</small>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6">
                                        <div className="p-2 bg-white rounded text-center">
                                            <strong className="text-warning">useMemo</strong>
                                            <small className="d-block text-muted">Filters & price calc</small>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6">
                                        <div className="p-2 bg-white rounded text-center">
                                            <strong className="text-danger">useCallback</strong>
                                            <small className="d-block text-muted">Memoized remove</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-center">
                                    <small className="text-muted">
                                        💡 Open console (F12) to see useMemo optimization in action!
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSearchCalculator