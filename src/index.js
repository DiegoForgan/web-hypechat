import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
//Bootstrap Library 
import 'bootstrap/dist/css/bootstrap.css';
//Importando el componente principal de la app web
import AdminWeb from './components/admin-app';

  // ========================================
render(<AdminWeb />, document.getElementById('root'));
  
  /*ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={<AdminWeb/>}/>
    </Switch> 
  </Router>
  , document.getElementById('root'));*/
  