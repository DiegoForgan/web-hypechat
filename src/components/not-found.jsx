import React from 'react';
import "../css/NotFound.css";
import BarraNavegacion from './barra-navegacion';


 
export default () =>
<React.Fragment>
  <BarraNavegacion/>
  <div className="NotFound">
    <h3>Lo lamentamos, el sitio que intenta acceder no existe!</h3>
  </div>
</React.Fragment>;