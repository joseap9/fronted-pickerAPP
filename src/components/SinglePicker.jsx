import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SinglePicker = ({ nombre, email, tienda }) => {
  return (
    <Container>
        <br/>
      <Row>
        <Col xs={8}>
          <div>
            <h1>{ nombre }</h1>
            <h3 className="text-muted"> { email } </h3>
            <hr/>
            <h5>TIENDA: {tienda}</h5>
            <h5>RUT: 12345678</h5>
          </div>
        </Col>
        <Col md="auto">
          <div>
            <div className="card border-info mb-3" style={{ height: "10rem", width: "18rem" }}>
                <div className="card-header bg-info">ASISTENCIA</div>
                <div className="card-body">
                    <br/>
                    <h3 className="card-title">98%</h3>
                </div>
            </div>
        </div>
        </Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <Row>
      <Col md="auto">
          <div>
            <div className="card border-success mb-3" style={{ width: "18rem" }}>
                <div className="card-header bg-success">FOUND RATE</div>
                <div className="card-body">
                    <h4 className="card-title">98%</h4>
                </div>
            </div>
        </div>
        </Col>
        <Col md="auto">
          <div>
            <div className="card border-warning mb-3" style={{ width: "18rem" }}>
                <div className="card-header bg-warning">FILL RATE</div>
                <div className="card-body">
                    <h4 className="card-title">96%</h4>
                </div>
            </div>
        </div>
        </Col>
        <Col md="auto">
          <div>
            <div className="card border-danger mb-3" style={{ width: "18rem" }}>
                <div className="card-header bg-danger">CONTACTABILIDAD</div>
                <div className="card-body">
                    <h4 className="card-title">91%</h4>
                </div>
            </div>
        </div>
        </Col>
        <Col md="auto">
          <div>
            <div className="card border-info mb-3" style={{ width: "18rem" }}>
                <div className="card-header bg-info">TIEMPO PEDIDOS</div>
                <div className="card-body">
                    <h4 className="card-title">31 min</h4>
                </div>
            </div>
        </div>
        </Col>
        <Col md="auto">
          <div>
            <div className="card border-success mb-3" style={{ width: "18rem" }}>
                <div className="card-header bg-success">TOTAL PEDIDOS</div>
                <div className="card-body">
                    <h4 className="card-title">129</h4>
                </div>
            </div>
        </div>
        </Col>
        <Col md="auto">
          <div>
            <div className="card border-warning mb-3" style={{ width: "18rem" }}>
                <div className="card-header bg-warning">NRO CASOS</div>
                <div className="card-body">
                    <h4 className="card-title">0</h4>
                </div>
            </div>
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SinglePicker;