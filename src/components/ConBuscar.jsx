import React, { useState, useEffect } from "react";
import { Table, DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import pickersApi from "../api/pickersApi";

const TablePage = () => {
  
  const [orders, setOrders] = useState([]);
  const [totalPay, setTotalPay] = useState([]);
  const [selectedStore, setSelectedStore] = useState("TODAS");
  
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("all");

  const [loading, setLoading] = useState(true);

  const getPickers = async() => {
    try {
      const { data } = await pickersApi.get(`/events/pickers/${query}`);
      setOrders( data.evento[0].pickers );
      setTotalPay( data.evento[0].sum_total );
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(  () => {
    getPickers();   
  }, [ query ]);


  const filteredOrders = orders.filter((order) => {
    if (selectedStore === "TODAS") {
      return order;
    } else {
      return order.tienda === selectedStore;
    }
  });

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <>
    {
      loading ? <h1> Cargando...</h1> :   
        <div>
          <br/>
          <Container>
            <Row>
              <Col  md="auto">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={selectedStore}
                  onSelect={(e) => setSelectedStore(e)}
                  variant="outline-success"
                >
                  <Dropdown.Item eventKey="TODAS">TODAS</Dropdown.Item>
                  <Dropdown.Item eventKey="JUMBO BILBAO">JUMBO BILBAO</Dropdown.Item>
                  <Dropdown.Item eventKey="JUMBO LA REINA">JUMBO LA REINA</Dropdown.Item>
                  <Dropdown.Item eventKey="JUMBO COSTANERA">JUMBO COSTANERA</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col xs={6}>
              <form className="d-flex" onSubmit={ getSearch }>
                <input className="form-control me-sm-2" type="search" placeholder="Busca nombre o correo" value={search} onChange={handleChange}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
              </form>
            </Col>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;
            <Col md="auto">
              <div className="card text-white bg-info mb-3" style={{ }}>
                <div className="card-header">Pago bruto total</div>
                <div className="card-body">
                  <h4 className="card-title"><strong>${ totalPay }</strong></h4>
                </div>
              </div>
            </Col>
            </Row>
          </Container>
          <br/>
          <Table className="table table-sm" striped bordered hover >
            <thead>
              <tr className="table-success">
                <th>Nombre</th>
                <th>Pedidos totales</th>
                <th>SKU  <FaArrowDown/></th>
                <th>SKU  <FaArrowUp/></th>
                <th>Pago Bruto</th>
                <th>Pago Liquido</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.lenght !== 0 ? filteredOrders.map((order) => (
                <tr key={order.iduser}>
                  <td> <Link to={
                        `/picker/${order.iduser}`
                        }
                        >
                          {order.nombre}
                        </Link></td>
                  <td>{order.total}</td>
                  <td>{order.menor}</td>
                  <td>{order.mayor}</td>
                  <td><h5>${order.pago_bruto}</h5></td>
                  <td><h5>${order.pago_liquido}</h5></td>
                  
                </tr>
              )) : <td>No se encontraron datos </td> }
            </tbody>
          </Table>
        </div>
      }
    </>
  );
};

export default TablePage;
