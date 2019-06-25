import React from 'react';
import "../css/NotFound.css";
import BarraNavegacion from './barra-navegacion';


 
export default () =>
<React.Fragment>
  <BarraNavegacion/>
  <div className="NotFound">
    <h3>Lo lamentamos, el sitio que intenta acceder no existe!</h3>
    <img src={require('../img/link_roto.jpg')} alt="Link Roto"></img>
  </div>
</React.Fragment>;