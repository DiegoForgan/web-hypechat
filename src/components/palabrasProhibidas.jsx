import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import axios from 'axios';
import  ls  from 'local-storage' ;
import '../css/organizaciones.css'
import { Table, Input, InputGroup, Button, InputGroupAddon } from 'reactstrap';

class PalabrasProhibidas extends Component {
    constructor(props){
        super(props);
        this.state = {
            palabras: [],
            cantidad: 0,
            palabraNueva: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarPalabra = this.agregarPalabra.bind(this);
    }


    componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/restrictedWords/' + ls("id_orga") + '/' + ls("token");
        axios.get(URL)
        .then((response) =>{
            console.log(response);
            this.setState({palabras: response.data.restrictedWords, cantidad: response.data.restrictedWords.length});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    agregarPalabra(){
        console.log('Queres Agregar la palabra ' + this.state.palabraNueva);
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/restrictedWords/'+ls("id_orga")+'/'+ls("token");
        axios.post(URL,{
            restrictedWords: this.state.palabraNueva
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() { 
        return ( 
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <div className="organizacion-data">
            <h1>Estas es la lista de las palabras prohibidas:</h1>
            <div className="tabla-palabras">
            <Table hover bordered dark>
            <thead>
            <tr>
                <th>#</th>
                <th>Palabra Prohibida</th>
                </tr>
            </thead>
            <tbody>
                {this.state.palabras.map((palabra,index) =>(<tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{palabra}</td></tr>)
                )}
            </tbody>
            </Table>
            <InputGroup>
                <Input name="palabraNueva" type="text" placeholder="Ingrese una palabra..." onChange={this.handleChange} value={this.state.palabraNueva}/>
                <InputGroupAddon addonType="append"><Button color="success" onClick={this.agregarPalabra}>Agregar Palabra</Button></InputGroupAddon>
            </InputGroup>
            </div>
            </div>
            </React.Fragment>
         );
    }
}
 
export default PalabrasProhibidas;