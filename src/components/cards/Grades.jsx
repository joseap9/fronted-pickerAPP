import React from 'react'

const Grades = ({ title="Nota Final", nota = 0, nota_contactabilidad=0, nota_fill_rate=0, nota_nps=0, nota_ontime_cliente=0, nota_ontime_sala=0, nota_reprogramacion=0 }) => {
    
  return (
    <>
        <div className="card mb-3">
            <h3 className="card-header">Notas</h3>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                { nota >= 0 && nota <= 4.9 ? <span className="badge rounded-pill bg-danger"><h3>{ nota }</h3></span> : nota >= 5 && nota <= 6.1 ? <span className="badge rounded-pill bg-warning">{ nota }</span> : <span className="badge rounded-pill bg-success"><strong>{ nota }</strong></span> }
            </div>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    contactabilidad
                    { nota_contactabilidad >= 0 && nota_contactabilidad <= 4.9 ? <span className="badge rounded-pill bg-danger">{ nota_contactabilidad }</span> : nota_contactabilidad >= 5 && nota_contactabilidad <= 6.1 ? <span className="badge rounded-pill bg-warning">{ nota_contactabilidad }</span> : <span className="badge rounded-pill bg-success">{ nota_contactabilidad }</span> }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    fill rate
                    { nota_fill_rate >= 0 && nota_fill_rate <= 4.9 ? <span className="badge rounded-pill bg-danger">{ nota_fill_rate }</span> : nota_fill_rate >= 5 && nota_fill_rate <= 6.1 ? <span className="badge rounded-pill bg-warning">{ nota_fill_rate }</span> : <span className="badge rounded-pill bg-success">{ nota_fill_rate }</span> }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    nps
                    { nota_nps >= 0 && nota_nps <= 4.9 ? <span className="badge rounded-pill bg-danger">{ nota_nps }</span> : nota_nps >= 5 && nota_nps <= 6.1 ? <span className="badge rounded-pill bg-warning">{ nota_nps }</span> : <span className="badge rounded-pill bg-success">{ nota_nps }</span> }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    onTime cliente
                    { nota_ontime_cliente >= 0 && nota_ontime_cliente <= 4.9 ? <span className="badge rounded-pill bg-danger">{ nota_ontime_cliente }</span> : nota_ontime_cliente >= 5 && nota_ontime_cliente <= 6.1 ? <span className="badge rounded-pill bg-warning">{ nota_ontime_cliente }</span> : <span className="badge rounded-pill bg-success">{ nota_ontime_cliente }</span> }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    onTime sala
                    { nota_ontime_sala >= 0 && nota_ontime_sala <= 4.9 ? <span className="badge rounded-pill bg-danger">{ nota_ontime_sala }</span> : nota_ontime_sala >= 5 && nota_ontime_sala <= 6.1 ? <span className="badge rounded-pill bg-warning">{ nota_ontime_sala }</span> : <span className="badge rounded-pill bg-success">{ nota_ontime_sala }</span> }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    reprogramacion
                    { nota_reprogramacion >= 0 && nota_reprogramacion <= 4.9 ? <span className="badge rounded-pill bg-danger">{ nota_reprogramacion }</span> : nota_reprogramacion >= 5 && nota_reprogramacion <= 6.1 ? <span className="badge rounded-pill bg-warning">{ nota_reprogramacion }</span> : <span className="badge rounded-pill bg-success">{ nota_reprogramacion }</span> }
                </li>
            </ul>
        </div>
    
    </>
  )
}

export default Grades