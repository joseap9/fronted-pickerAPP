import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import pickersApi from "../api/pickersApi";


const AsistenciaPicker = () => {
  
  const [orders, setOrders] = useState([]);
  
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const getAsistencia = async() => {
    try {
      const { data } = await pickersApi.get('/metabase/getRankingShoppers',
      {
        params: { 
          token: localStorage.getItem('token-metabase')
        }
      });
      
      setOrders( data.response );
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(  () => {
    getAsistencia();   
    
  }, [ query ]);

  const filteredOrders = orders.filter((picker) => 
    picker.usuario.toLowerCase().includes(query.toLowerCase())
  );
  

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("")
  }
  return (
    <>
    {
      loading ? <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}><Spinner animation="border" /> </div>  : 
        <div>
          <br/>
          <Container fluid>
            <Row>
              <Col>
                <form className="d-flex" onSubmit={ getSearch }>
                  <input className="form-control me-sm-2" type="search" placeholder="Busca por nombre" value={search} onChange={handleChange}/>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                </form>
            </Col>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;
            </Row>
          </Container>
          <br/>
          { filteredOrders.length !== 0 ? 
          <Table className="table table-sm" striped bordered hover >
            <thead>
              <tr className="table-success">
                <th>Nombre</th>
                <th>Iduser</th>
                <th>Pedidos</th>
                <th>Tienda</th>
              </tr>
            </thead>
            <tbody>
              { filteredOrders.map((order) => (
                <tr key={order.id_usuario}>
                  <td> <Link to={
                        `/picker/${order.id_usuario}`
                        }
                        >
                          {order.usuario}
                        </Link></td>
                  <td>{order.id_usuario}</td>
                  <td>{order.pedidos}</td>
                  <td>{order.tienda}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table> : 
          <div className="alert alert-dismissible alert-warning">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={ getSearch }></button>
            <h4 className="alert-heading">No se encuentran registros de pedidos</h4>
            <p className="mb-0">La persona que intenta buscar no se ha conectado hoy o <a className="alert-link">no ha llegado</a>.</p>
          </div>
          }
        </div>
      }
    </>
  );
};

export default AsistenciaPicker;