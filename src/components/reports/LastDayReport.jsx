import React, { useState, useEffect } from "react";
import { Card, DropdownButton, Dropdown, Container, Row, Col, Spinner } from "react-bootstrap";
import { FaGrinStars, FaSadTear } from "react-icons/fa";
import pickersApi from "../../api/pickersApi";
import TopPickers from "../cards/TopPickers";

const LastDayReport = () => {

  //const fechaAnterior = new Date(new Date().getTime() - 86400000).toLocaleDateString('es-CL').split('-').reverse().join('-');
  const fechaAnterior = new Date(new Date().getTime() - 86400000);
  const [fechaAnteriorAPI, fechaAnteriorRENDER] = [
    fechaAnterior.toLocaleDateString('es-CL').split('-').reverse().join('-'),
    new Intl.DateTimeFormat('es-CL', {weekday: 'long', day: 'numeric', month: 'short'}).format(fechaAnterior)
  ];
  const [selectedStore, setSelectedStore] = useState("JUMBO COSTANERA");
  const [infoSala, setInfoSala] = useState([]);
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
          fecha_inicio: fechaAnteriorAPI,
          fecha_termino: fechaAnteriorAPI
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

  const getTopPickers = async() => {
    try {
      const { data } = await pickersApi.get('/metabase/getNotasShoppers',
      {
        params: { 
          token: localStorage.getItem('token-metabase'),
          fecha_inicio: fechaAnteriorAPI,
          fecha_termino: fechaAnteriorAPI,
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
              <Col xs={6}>
                  <Card className="h-100">
                      <Card.Body>
                        <Card.Title><h1>{infoSala.map( tienda => tienda.tienda)}</h1></Card.Title>
                    </Card.Body>
                  </Card>
              </Col> 

              <Col md="auto">
                  <Card className="h-100">
                      <Card.Body>
                        <h1>{fechaAnteriorRENDER}</h1>
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
                  <Card style={{ minWidth: '300px' }}>
                    <Card.Body>
                      <Row>
                        <Col xs={6}>
                          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Found Rate:</p>
                          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Fill Rate:</p>
                        </Col>
                        <Col xs={6}>
                          <p style={{ fontSize: '20px' }}>{ infoSala.map( tienda => Math.round(tienda.found_rate * 100) ) } %</p>
                          <p style={{ fontSize: '20px' }}>{ infoSala.map( tienda => Math.round(tienda.fill_rate * 100) ) } %</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                <Card style={{ minWidth: '300px' }}>
                    <Card.Body>
                      <Row>
                        <Col xs={6}>
                          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Contactabilidad:</p>
                          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Numero de Pedidos:</p>
                        </Col>
                        <Col xs={6}>
                          <p style={{ fontSize: '20px' }}>{ infoSala.map( tienda => Math.round(tienda.contactabilidad * 100) )} %</p>
                          <p style={{ fontSize: '20px' }}>{ infoSala.map(tienda => tienda.total_ordenes_facturadas || 0) }</p>
                        </Col>
                      </Row>
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
                    reverse_array= { true } 
                    title = {
                      <div style={{ display:'flex',  gap: '10px' }}>
                        <h4 className="text-success"><FaGrinStars style={{ fontSize: '40px' }}/></h4> <h4>  NOTAS MEJOR EVALUADOS - AYER </h4>
                      </div>
                    }/>
                </Col>
                <Col>
                  <TopPickers 
                    topPickers={ peoresNotas } 
                    loading={ loadingTable } 
                    title = {<h4 className="text-danger"><FaSadTear style={{ fontSize: '40px' }}/>  NOTAS PEOR EVALUADOS - AYER </h4>}/>
                </Col>
              </Row>
            </Container>
            <br/>
        </div>
      }
    </>
  );
};

export default LastDayReport;
