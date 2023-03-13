import React from 'react'

const Operations = ({ pedidos = 0, pedidos_x_picker=0, tiempo_x_pedido=0, items_x_pedido=0 }) => {
    
  return (
    <>
        <div className="card mb-3">
            <h3 className="card-header">Operaciones (24H)</h3>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h5>N° Pedidos </h5>
                    <span><h4>{pedidos}</h4></span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h5>Pedidos x Picker</h5>
                    <span><h4>{pedidos_x_picker}</h4></span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h5>Tiempo x Pedido</h5>
                    <span><h4>{tiempo_x_pedido} min</h4></span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h5>Items x Pedido</h5>
                    <span><h4>{items_x_pedido}</h4></span>
                </li>
            </ul>
            <div className="card-footer text-muted">
                24H
            </div>
        </div>
    
    </>
  )
}

export default Operations