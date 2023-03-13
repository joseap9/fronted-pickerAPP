import React from 'react';
import { Card, Table, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';


const TopPickers = ({ topPickers = [], loading, title="Carta estilizada", reverse_array=false }) => {

  const pickers = reverse_array ? topPickers.reverse() : topPickers;

  return (
    <>
        { loading ?  
            <div className="alert alert-dismissible alert-warning">
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}><Spinner animation="border" /> </div> 
            </div> :
            <Card>
                <Card.Header as="h5"> { title } </Card.Header>
                <Card.Body>
                    <div style={{ height: "650px", overflowY: "scroll" }}>
                        <Table  striped bordered hover size="sm" style={{ fontSize: "12px" }} >
                            <thead>
                            <tr className="table-dark">
                                <th className="small">Usuario</th>
                                <th className="small">Nota</th>
                                <th className="small">Pedidos</th>
                                <th className="small">Ctblidad</th>
                                <th className="small">Found rate</th>
                                <th className="small">Fill rate</th>
                            </tr>
                            </thead>
                            <tbody>
                            { pickers.map((picker) => (
                                <tr key={picker.id_usuario}>
                                <td style={{ fontWeight: "bold"}}> <Link to={
                                        `/picker/${picker.id_usuario}`
                                        }
                                        >
                                        <h5>{picker.usuario}</h5>
                                        </Link></td>
                                <td style={{ fontWeight: "bold" }}>
                                    { picker.nota >= 0 && picker.nota <= 3.9 ? <h4 className="text-danger">{ picker.nota }</h4>
                                    : picker.nota >= 4 && picker.nota <= 5.9 ? <h4 className="text-warning">{ picker.nota }</h4> 
                                    : <h4 className="text-success">{ picker.nota }</h4> 
                                    }
                                </td>
                                <td><h4>{picker.pedidos}</h4></td>
                                <td>
                                { picker.nota_contactabilidad >= 0 && picker.nota_contactabilidad <= 3.9 ? <h4 className="text-danger">{ picker.nota_contactabilidad }</h4> 
                                    : picker.nota_contactabilidad >= 4 && picker.nota_contactabilidad <= 5.9 ? <h4 className="text-warning">{ picker.nota_contactabilidad }</h4> 
                                    : <h4 className="text-success">{ picker.nota_contactabilidad }</h4> 
                                    }
                                </td>
                                <td>
                                { picker.nota_found_rate >= 0 && picker.nota_found_rate <= 3.9 ? <h4 className="text-danger">{ picker.nota }</h4> 
                                    : picker.nota_found_rate >= 4 && picker.nota_found_rate <= 5.9 ? <h4 className="text-warning">{ picker.nota }</h4>
                                    : <h4 className="text-success">{ picker.nota }</h4> 
                                    }
                                </td>
                                <td>
                                { picker.nota_fill_rate >= 0 && picker.nota_fill_rate <= 3.9 ? <h4 className="text-danger">{ picker.nota }</h4>
                                    : picker.nota_fill_rate >= 4 && picker.nota_fill_rate <= 5.9 ? <h4 className="text-warning">{ picker.nota }</h4> 
                                    : <h4 className="text-success">{ picker.nota }</h4> 
                                    }
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div> 
                </Card.Body>
            </Card>
          }
    </>
  )
}

export default TopPickers