import React from 'react'

const DatosSKU = ({ sku_x_pedido = 0, tiempo_x_sku=0 }) => {
    
  return (
    <>
        <div className="card mb-3">
            <h3 className="card-header">Performance SKU</h3>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h5>SKU x Pedido</h5>
                    <span><h4>{sku_x_pedido}</h4></span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h5>Tiempo x SKU</h5>
                    <span><h4>{tiempo_x_sku} min</h4></span>
                </li>
            </ul>
        </div>
    
    </>
  )
}

export default DatosSKU