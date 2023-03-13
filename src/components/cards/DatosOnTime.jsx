import React from 'react'

const DatosOnTime = ({ on_time_sala = 0, ontime_cliente=0 }) => {
    
  return (
    <>
        <div className="card mb-3">
            <h3 className="card-header">On time</h3>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h5>onTime Sala</h5>
                    <span><h4>{ ontime_cliente } %</h4></span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h5>onTime Cliente</h5>
                    <span><h4>{ ontime_cliente } %</h4></span>
                </li>
            </ul>
        </div>
    
    </>
  )
}

export default DatosOnTime