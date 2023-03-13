import React, { useState, useEffect } from "react";
import { Card, DropdownButton, Dropdown, Container, Row, Col, Spinner } from "react-bootstrap";
import { FaGrinStars, FaSadTear } from "react-icons/fa";
import pickersApi from "../../api/pickersApi";
import Grades from "../cards/Grades";
import TopPickers from "../cards/TopPickers";

const WeekReport = () => {
    
  const fechaActual = new Date().toLocaleDateString('es-CL').split('-').reverse().join('-');
  const sieteDiasAtras = new Date(new Date().getTime() - (86400000 * 7)).toLocaleDateString('es-CL').split('-').reverse().join('-');
  
  const [selectedStore, setSelectedStore] = useState("JUMBO COSTANERA");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [mejoresNotas, setMejoresNotas] = useState([]);
  const [peoresNotas, setPeoresNotas] = useState([]);
  
  //loading general de la app
  const [loading, setLoading] = useState(true);
  //loading de la tabla de top ranking
  const [loadingTable, setLoadingTable] = useState(true);


  const getInfoSala = async() => {
    try {
      const { data } = await pickersApi.get('/metabase/getInfoSala',
      {
        params: { 
          token: localStorage.getItem('token-metabase'),
          fecha_inicio: sieteDiasAtras,
          fecha_termino: fechaActual
        }
      })

      const filtered = data.response.filter((store) => {
        return store.tienda === selectedStore;
      });
  
      setFilteredOrders( filtered );
      setLoading(false);
      

    } catch (error) {
      console.log(error)
    }
  }

  const getTopPickers = async() => {
    try {
      const { data } = await pickersApi.get('/metabase/getNotasShoppers',
      {
        params: { 
          token: localStorage.getItem('token-metabase'),
          fecha_inicio: sieteDiasAtras,
          fecha_termino: fechaActual,
          store: selectedStore
        }
      })
      setMejoresNotas(data.response.mejoresNotas);
      setPeoresNotas(data.response.peoresNotas);
      setLoadingTable(false);
      
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(  () => {
    getInfoSala();
    getTopPickers();
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
              <Col xs={8}>
                  <Card className="h-100">
                      <Card.Body>
                        <Card.Title><h1>{filteredOrders.map( tienda => tienda.tienda)}</h1></Card.Title>
                    </Card.Body>
                  </Card>
              </Col> 

              <Col md="auto">
                  <Card className="h-100">
                      <Card.Body>
                        <h1>7 Días</h1>
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
                  <TopPickers 
                    topPickers={ mejoresNotas } 
                    loading={ loadingTable } 
                    reverse_array={ true }
                    title = {<div style={{ display:'flex',  gap: '10px' }}><h4 className="text-success"><FaGrinStars style={{ fontSize: '40px' }}/></h4> <h4>  TOP PICKERS SEMANALES </h4></div>}/>
                </Col>
                <Col>
                  <TopPickers topPickers={ peoresNotas } loading={ loadingTable } title = {<h4 className="text-danger"><FaSadTear style={{ fontSize: '40px' }}/>  PICKERS A MEJORAR SEMANAL </h4>}/>
                </Col>
              </Row>
            </Container>
            <br/>
            <Container fluid>
              <Row xs={1} md={1}>
                <Col>
                  <Grades 
                    title="NOTA GENERAL (7 DIAS)"
                    nota={ filteredOrders.map( tienda => tienda.nota ) } 
                    nota_contactabilidad={ filteredOrders.map( tienda => tienda.nota_contactabilidad ) } 
                    nota_fill_rate={ filteredOrders.map( tienda => tienda.nota_fill_rate ) } 
                    nota_nps={ filteredOrders.map( tienda => tienda.nota_nps ) } 
                    nota_ontime_cliente={ filteredOrders.map( tienda => tienda.nota_ontime_cliente ) } 
                    nota_ontime_sala={ filteredOrders.map( tienda => tienda.nota_ontime_sala ) } 
                    nota_reprogramacion={ filteredOrders.map( tienda => tienda.nota_reprogramacion ) }
                  />
                </Col>
              </Row>
            </Container>
            
          
        </div>
      }
    </>
  );
};

export default WeekReport;
