import React, { useState, useEffect } from "react";
import { Table, DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

const TablePage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStore, setSelectedStore] = useState("TODAS");
  
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("pic");

  useEffect(() => {
    fetch(`http://localhost:4001/api/events/picker/${query}`)
      .then(res => res.json())
      .then(data => setOrders(data.evento))
      .catch(err => console.log(err));
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
    <div>
      <br/>
      <Container>
        <Row>
          <Col>
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
        <Col xs={8}>
        <form className="d-flex" onSubmit={ getSearch }>
          <input className="form-control me-sm-2" type="search" placeholder="Busca nombre, correo o rut" value={search} onChange={handleChange}/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </form>
        </Col>
        </Row>
      </Container>
      <br/>
      <Table className="table table-sm" striped bordered hover >
        <thead>
          <tr className="table-success">
            <th>Nombre</th>
            <th>Tienda</th>
            <th>Total</th>
            <th>Menor</th>
            <th>Mayor</th>
            <th>Remuneracion Bruta</th>
            <th>Remuneracion Liquida</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.lenght !== 0 ? filteredOrders.map((order) => (
            <tr key={order.userid}>
              <td> <Link to={
                    `/picker/${order.userid}`
                    }
                    >
                      {order.nombre}
                    </Link></td>
              <td>{order.tienda}</td>
              <td>{order.total}</td>
              <td>{order.menor}</td>
              <td>{order.mayor}</td>
              <td>{order.remuneracion_bruta}</td>
              
            </tr>
          )) : <td>No se encontraron datos </td> }
        </tbody>
      </Table>
    </div>
  );
};

export default TablePage;
