import React, { Component } from 'react';
import  BarraNavegcion  from "./barra-navegacion";

class Home extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegcion/>
                <h1>Bienvenido al sistema de BackOffice de Hypechat</h1>
                <h2>A continuacion se muestran las opciones disponibles...</h2>
            </React.Fragment>
        );
    }
}
 
export default Home;