import React, { Component } from 'react';
import  BarraNavegcion  from "./barra-navegacion";

class Home extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegcion/>
                <h1>Home Page</h1>
            </React.Fragment>
        );
    }
}
 
export default Home;