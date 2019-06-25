import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import ls from 'local-storage';

class BarraNavegacion extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      borrarDatosLocales(){
        ls.clear();
      }

    render() {
        return (
          <div>
            <Navbar color="dark" light expand="md">
              <NavbarBrand href="/home">
                <img className="pr-1" height="40" width="45" src={require('../img/logo.png')} alt="Logo de Hypechat"/>
                <font color="white">Hypechat Backoffice</font>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/home">
                      <font color="white">Home</font>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/organizaciones">
                        <font color="white">Mis Organizaciones</font>
                      </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/reportes">
                    <font color="white">Reportes</font>
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    <font color="white">
                      Opciones
                    </font>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag={Link} to="/miperfil">
                        Mi cuenta
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem tag={Link} to="/" onClick={this.borrarDatosLocales}>
                        Log Out 
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }   
}
 
export default BarraNavegacion;