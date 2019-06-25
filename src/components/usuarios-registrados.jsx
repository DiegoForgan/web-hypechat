import React, { Component } from 'react';
import ls from 'local-storage';
import axios from 'axios';
import BarraNavegacion from './barra-navegacion';
import '../css/organizacion.css';
import {Bar} from 'react-chartjs-2';
import ModalApp from './modal-app';


class UsuariosRegistrados extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            chartData:{
                labels: [],
                datasets: [
                    {
                        label: 'Cantidad de Usuarios Registrados',
                        data:[],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)'
                        ]
                    }]
            }

        };
    }


   componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/registration/months/' + ls("token");
        axios.get(URL)
        .then((response) => {
            console.log(response);
            var array = response.data.resultados;
            for (let index = 0; index < array.length; index++) {
                const dato = array[index];
                this.setState({chartData:{
                    labels: [...this.state.chartData.labels,this.state.meses[dato.month - 1]],
                    datasets:[
                        {
                            label:'Cantidad de Usuarios Registrados',
                            data: [...this.state.chartData.datasets[0].data,dato.total],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)'
                            ]
                        }
                    ]
                }})
            }
            //aca deberia hacer un setState para que se vea el grafico.
            console.log(this.state);
        })
        .catch((error) => {
            console.log(error);
            this.toggleModal();
        });
    }


    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <ModalApp show={this.state.isOpen}
                onClose={this.toggleModal}
                titulo="Error de Reportes">
                    Ocurrio un error al querer ver el reporte!
                </ModalApp>
                <div className="organizacion-data"> 
                <h1>Reporte: Usuarios Registrados</h1>
                <Bar
                width={300}
                height={300}
                data={this.state.chartData}
                options={{
                    maintainAspectRatio: false,
                    title:{
                        display: true,
                        text: 'Cantidad de Usuarios registrados en los ultimos 4 meses',
                        fontSize: 25
                    }
                }}
                />
                </div>
            </React.Fragment>
         );
    }
}
 
export default UsuariosRegistrados;