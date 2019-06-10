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

    render() {
        return (
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/home">
                <img className="pr-1" height="40" width="45" src={require('../img/logo.png')} alt="Logo de Hypechat"/>
                Hypechat Backoffice
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/home">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/organizaciones">Mis Organizaciones</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/reportes">Reportes</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Opciones
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag={Link} to="/miperfil">
                        Mi cuenta
                      </DropdownItem>
                      <DropdownItem>
                        Configuracion
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem tag={Link} to="/">
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