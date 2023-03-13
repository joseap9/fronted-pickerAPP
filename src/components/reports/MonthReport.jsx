import React, { useState, useEffect } from "react";
import { Card, DropdownButton, Dropdown, Container, Row, Col, Spinner } from "react-bootstrap";
import pickersApi from "../../api/pickersApi";
import Grades from "../cards/Grades";
import BarChart from "../charts/BarChart";

const MonthReport = () => {
    
  const fechaActual = new Date().toLocaleDateString('es-CL').split('-').reverse().join('-');
  const treintaDiasAtras = new Date(new Date().getTime() - (86400000 * 30)).toLocaleDateString('es-CL').split('-').reverse().join('-');
  
  const [selectedStore, setSelectedStore] = useState("JUMBO COSTANERA");
  const [infoSala, setInfoSala] = useState([]);
  const [analisisSala, setAnalisisSala] = useState([]);
  
  //loading general de la app
  const [loading, setLoading] = useState(true);
  //loading de la carta de analisis
  const [loadingAnalisis, setLoadingAnalisis] = useState(true);


  const getInfoSala = async() => {
    try {
      const { data } = await pickersApi.get('/metabase/getInfoSala',
      {
        params: { 
          token: localStorage.getItem('token-metabase'),
          fecha_inicio: treintaDiasAtras,
          fecha_termino: fechaActual
        }
      })

      const filtered = data.response.filter((store) => {
        return store.tienda === selectedStore;
      });
      setInfoSala( filtered );
      setLoading(false);
      

    } catch (error) {
      console.log(error)
    }
  }

  const getAnalisisSala = async() => {
    try {
      const { data } = await pickersApi.get('/metabase/getAnalisisShoppers',
      {
        params: { 
          token: localStorage.getItem('token-metabase'),
          fecha_inicio: treintaDiasAtras,
          fecha_termino: fechaActual,
          store: selectedStore
        }
      })
      setAnalisisSala( data.response );
      setLoadingAnalisis(false);
      

    } catch (error) {
      console.log(error)
    }
  }



  useEffect(  () => {
    getInfoSala();
    getAnalisisSala();
  }, [ selectedStore ]);

  const setStore = e => {
    setSelectedStore(e)
    setLoading(true)
  }

  return (
    <>
    {
      loading ? <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}><Spinner animation="border" /> </div>  :   
        <div style={{ marginTop: '10px' }}>
         <Container fluid>
            <Row xs={1}  >
              <Col xs={7}>
                  <Card className="h-100">
                      <Card.Body>
                        <Card.Title><h1>{infoSala.map( tienda => tienda.tienda)}</h1></Card.Title>
                    </Card.Body>
                  </Card>
              </Col> 

              <Col md="auto">
                  <Card className="h-100">
                      <Card.Body>
                        <h1>30 Días</h1>
                    </Card.Body>
                  </Card>
              </Col> 

              <Col md="auto">
                  <Card className="h-100">
                      <Card.Body>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title={selectedStore}
                          onSelect={ setStore }
                          variant="outline-success"
                        >
                          <Dropdown.Item eventKey="JUMBO BILBAO">JUMBO BILBAO</Dropdown.Item>
                          <Dropdown.Item eventKey="JUMBO LA REINA">JUMBO LA REINA</Dropdown.Item>
                          <Dropdown.Item eventKey="JUMBO COSTANERA">JUMBO COSTANERA</Dropdown.Item>
                        </DropdownButton>
                    </Card.Body>
                  </Card>
              </Col> 
            </Row>
            </Container>
            <br/>
            <Container fluid>
              <Row xs={1} md={2}>
                <Col>
                  <div style={{ maxWidth: '50' }}>
                  <BarChart 
                    found_rate={infoSala.map( tienda => Math.round(tienda.found_rate * 100) )}
                    fill_rate={infoSala.map( tienda => Math.round(tienda.fill_rate * 100) )}
                    contacto={infoSala.map( tienda => Math.round(tienda.contactabilidad * 100) )}
                    on_time={infoSala.map( tienda => Math.round(tienda.on_time_sala * 100) )}
                    />
                    </div>
                </Col>
                <Col>
                <div className="card mb-3">
                  <h3 className="card-header">Operaciones Mensual</h3>
                  <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                          <h5>Tiempo Picking</h5>
                          <span><h4>{ analisisSala.map(tienda => tienda.tiempo_x_pedido !== null ? tienda.tiempo_x_pedido.toFixed(1) : 0)} MIN</h4></span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                          <h5>Pedidos x Picker</h5>
                          <span><h4>{analisisSala.map(tienda => tienda.pedidos_x_picker !== null ? (tienda.pedidos_x_picker/29).toFixed(1) : 0)} </h4></span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                          <h5>SKU x Pedido</h5>
                          <span><h4>{ analisisSala.map( tienda => tienda.sku_x_pedido !== null ? tienda.sku_x_pedido.toFixed(1) : 0 ) }</h4></span>
                      </li>
                  </ul>
                  <div className="card-footer text-muted">
                      Promedio Mensual (x dia)
                  </div>
              </div>
                </Col>
              </Row>
            </Container>
            <br/>
            <Container fluid>
              <Row xs={1} md={3}>
                <Col>
                  <Grades 
                    title="Nota Mensual"
                    nota={ infoSala.map( tienda => tienda.nota ) } 
                    nota_contactabilidad={ infoSala.map( tienda => tienda.nota_contactabilidad ) } 
                    nota_fill_rate={ infoSala.map( tienda => tienda.nota_fill_rate ) } 
                    nota_nps={ infoSala.map( tienda => tienda.nota_nps ) } 
                    nota_ontime_cliente={ infoSala.map( tienda => tienda.nota_ontime_cliente ) } 
                    nota_ontime_sala={ infoSala.map( tienda => tienda.nota_ontime_sala ) } 
                    nota_reprogramacion={ infoSala.map( tienda => tienda.nota_reprogramacion ) }
                  />
                </Col>
              </Row>
            </Container>
        </div>
      }
    </>
  );
};

export default MonthReport;
