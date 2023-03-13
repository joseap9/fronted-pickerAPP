import React, { useState, useEffect } from "react";
import { Card, DropdownButton, Dropdown, Container, Row, Col, Spinner } from "react-bootstrap";
//import { FaGrinStars, FaSadTear } from "react-icons/fa";
import pickersApi from "../api/pickersApi";
import DatosOnTime from "./cards/DatosOnTime";
import DatosSKU from "./cards/DatosSKU";
//import ExtraInfo from "./cards/DatosSKU";
import Grades from "./cards/Grades";
import Operations from "./cards/Operations";
//import TopPickers from "./cards/TopPickers";
import RadialBar from "./charts/RadialBar";

const DailyReport = () => {

  const fechaActual = new Date().toLocaleDateString('es-CL').split('-').reverse().join('-');
  const fechaAnterior = new Date(new Date().getTime() - 86400000).toLocaleDateString('es-CL').split('-').reverse().join('-');
  
  const [selectedStore, setSelectedStore] = useState("JUMBO COSTANERA");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [analisisSala, setAnalisisSala] = useState([]);
  
  //loading general de la app
  const [loading, setLoading] = useState(true);
  //loading de la tabla de top ranking
  const [loadingTable, setLoadingTable] = useState(true);
  //loading de la carta de analisis
  const [loadingAnalisis, setLoadingAnalisis] = useState(true);

  const getAnalisisSala = async() => {
    try {
      const { data } = await pickersApi.get('/metabase/getAnalisisShoppers',
      {
        params: { 
          token: localStorage.getItem('token-metabase'),
          fecha_inicio: fechaActual,
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


  const getInfoSala = async() => {
    try {
      const { data } = await pickersApi.get('/metabase/getInfoSala',
      {
        params: { 
          token: localStorage.getItem('token-metabase'),
          fecha_inicio: fechaActual,
          fecha_termino: fechaActual
        }
      })

      const filtered = data.response.filter((store) => {
        return store.tienda === selectedStore;
      });
  
      //setAllStore( data.response );
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
          fecha_inicio: fechaAnterior,
          fecha_termino: fechaAnterior,
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
    //getTopPickers();
    getAnalisisSala();
  }, [ selectedStore ]);

  /* const filteredOrders = allStore.filter((store) => {
      return store.tienda === selectedStore;
  }); */

  const setStore = e => {
    setSelectedStore(e)
    setLoading(true)
  }

  return (
    <>
    {
      loading ? <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}><Spinner animation="border" /> </div> :   
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
                        <h1> 24h</h1>
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
              <Row xs={1} md={4}>
                <Col>
                  <RadialBar title="Found Rate" 
                    serie={ filteredOrders.map( tienda => Math.round(tienda.found_rate * 100) ) } 
                    color= { filteredOrders.map( tienda => Math.round(tienda.found_rate * 100) ) <= 89 ? "#9966ff" : "#9966ff" }
                    gradientColor= { filteredOrders.map( tienda => Math.round(tienda.found_rate * 100) ) <= 89 ? "#ff0000" : "#009900"  } />
                </Col>
                <Col>
                  <RadialBar title="Fill Rate" 
                  serie={ filteredOrders.map( tienda => Math.round(tienda.fill_rate * 100) ) }
                  color= { filteredOrders.map( tienda => Math.round(tienda.fill_rate * 100) ) <= 89 ? "#9966ff" : "#9966ff" }
                  gradientColor= { filteredOrders.map( tienda => Math.round(tienda.fill_rate * 100) ) <= 89 ? "#ff0000" : "#00ff00"  }
                  />
                </Col>
                <Col>
                  <RadialBar title="OnTime Sala" 
                  serie={ filteredOrders.map( tienda => Math.round(tienda.on_time_sala * 100) ) }
                  color= { filteredOrders.map( tienda => Math.round(tienda.on_time_sala * 100) ) <= 89 ? "#9966ff" : "#9966ff" }
                  gradientColor= { filteredOrders.map( tienda => Math.round(tienda.on_time_sala * 100) ) <= 89 ? "#ff0000" : "#00ff00"  }
                  />
                </Col>
                <Col>
                  <RadialBar title="contactabilidad" 
                  serie={ filteredOrders.map( tienda => Math.round(tienda.contactabilidad * 100) ) }
                  color= { filteredOrders.map( tienda => Math.round(tienda.contactabilidad * 100) ) <= 89 ? "#9966ff" : "#9966ff" }
                  gradientColor= { filteredOrders.map( tienda => Math.round(tienda.contactabilidad * 100) ) <= 89 ? "#ff0000" : "#00ff00"  }
                  />
                </Col>
              </Row>
            </Container>
            <br/>
            <Container fluid>
              <Row xs={1} md={3}>
                <Col>
                  <Grades nota={ filteredOrders.map( tienda => tienda.nota ) } 
                    nota_contactabilidad={ filteredOrders.map( tienda => tienda.nota_contactabilidad ) } 
                    nota_fill_rate={ filteredOrders.map( tienda => tienda.nota_fill_rate ) } 
                    nota_nps={ filteredOrders.map( tienda => tienda.nota_nps ) } 
                    nota_ontime_cliente={ filteredOrders.map( tienda => tienda.nota_ontime_cliente ) } 
                    nota_ontime_sala={ filteredOrders.map( tienda => tienda.nota_ontime_sala ) } 
                    nota_reprogramacion={ filteredOrders.map( tienda => tienda.nota_reprogramacion ) }
                  />
                </Col>
                <Col>
                  <Operations 
                    pedidos={filteredOrders.map(tienda => tienda.total_ordenes_facturadas || 0)} 
                    pedidos_x_picker={analisisSala.map(tienda => tienda.pedidos_x_picker !== null ? tienda.pedidos_x_picker.toFixed(1) : 0)} 
                    tiempo_x_pedido={analisisSala.map(tienda => tienda.tiempo_x_pedido !== null ? tienda.tiempo_x_pedido.toFixed(1) : 0)}
                    items_x_pedido={analisisSala.map(tienda => tienda.items_x_pedido !== null ? tienda.items_x_pedido.toFixed(1) : 0)}
                    />
                </Col>
                <Container>
                  <Col>
                    <DatosSKU 
                      sku_x_pedido = { analisisSala.map( tienda => tienda.sku_x_pedido !== null ? tienda.sku_x_pedido.toFixed(1) : 0 ) } 
                      tiempo_x_sku = {analisisSala.map( tienda => tienda.tiempo_x_sku !== null ? tienda.tiempo_x_sku.toFixed(1) : 0 ) }
                      />
                  </Col>
                  <Col>
                    <DatosOnTime 
                      on_time_sala = { filteredOrders.map( tienda => Math.round(tienda.on_time_sala * 100) ) } 
                      ontime_cliente = { filteredOrders.map( tienda => Math.round(tienda.ontime_cliente * 100) ) } 
                      />
                  </Col>
                </Container>
              </Row>
            </Container>
            <br/>
          {
            console.log(selectedStore)
          }
          {
            console.log( filteredOrders )
          }
          
        </div>
      }
    </>
  );
};

export default DailyReport;


{/* <Container>
              <Row xs={1} md={2}>
                <Col>
                  <TopPickers topPickers={ mejoresNotas } loading={ loadingTable } title = {<h4 className="text-success"><FaGrinStars style={{ fontSize: '40px' }}/>  NOTAS MEJOR EVALUADOS - HOY </h4>}/>
                </Col>
                <Col>
                  <TopPickers topPickers={ peoresNotas } loading={ loadingTable } title = {<h4 className="text-danger"><FaSadTear style={{ fontSize: '40px' }}/>  NOTAS PEOR EVALUADOS - HOY </h4>}/>
                </Col>
              </Row>
            </Container> */}
