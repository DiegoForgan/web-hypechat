import React from 'react';
import { render } from 'react-dom';
//Bootstrap Library 
import 'bootstrap/dist/css/bootstrap.css';
//Importando el componente principal de la app web
import AdminWeb from './components/admin-app';
import {BrowserRouter as Router} from 'react-router-dom';

  // ========================================
render(
  <Router>
    <AdminWeb/>
  </Router>, 
document.getElementById('root'));
  