import React from 'react'

// Child Component - Price Summary
// Receives memoized calculations from parent
const PriceSummary = React.memo(({ totalPrice, statistics }) => {
    const { averagePrice, highestPrice, lowestPrice, productCount } = statistics

    console.log('💰 PriceSummary rendered')

    return (
        <div className="card border-0 shadow-sm mb-4 bg-gradient-stats">
            <div className="card-body">
                <h3 className="h4 mb-3">💰 Price Summary</h3>
                <div className="row g-4">
                    <div className="col-md-2 col-sm-4 col-6">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                            <div className="display-6 mb-2">💵</div>
                            <small className="text-muted text-uppercase">Total Price</small>
                            <h4 className="text-primary mb-0">${totalPrice.toFixed(2)}</h4>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                            <div className="display-6 mb-2">📊</div>
                            <small className="text-muted text-uppercase">Average</small>
                            <h4 className="text-success mb-0">${averagePrice.toFixed(2)}</h4>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                            <div className="display-6 mb-2">⬆️</div>
                            <small className="text-muted text-uppercase">Highest</small>
                            <h4 className="text-danger mb-0">${highestPrice.toFixed(2)}</h4>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-6">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                            <div className="display-6 mb-2">⬇️</div>
                            <small className="text-muted text-uppercase">Lowest</small>
                            <h4 className="text-info mb-0">${lowestPrice.toFixed(2)}</h4>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-12">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                            <div className="display-6 mb-2">🔢</div>
                            <small className="text-muted text-uppercase">Products Displayed</small>
                            <h4 className="text-warning mb-0">{productCount}</h4>
                        </div>
                    </div>
                </div>
                {productCount > 0 && (
                    <div className="mt-3 text-center">
                        <small className="text-muted">
                            ⚡ Calculations are memoized using useMemo - only recalculates when filtered products change
                        </small>
                    </div>
                )}
            </div>
        </div>
    )
})

PriceSummary.displayName = 'PriceSummary'

export default PriceSummary