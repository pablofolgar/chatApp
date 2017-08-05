import React from 'react';

import Home from './components/Home';
import Chat from './components/Chat/Chat';
import Menu from './components/Menu';
import Contacto from './components/Contacto';
import Comunicacion from './components/Comunicacion';
import Historias from './components/Historias/Historias';
import VerHistorias from './components/Historias/VerHistorias';
import CargarHistoria from './components/Historias/CargarHistoria';
import CargarHistoriaTexto from './components/Historias/CargarHistoriaTexto';
import CargarHistoriaAudio from './components/Historias/CargarHistoriaAudio';
import Notificacion from './components/Monitoreo/Notificacion';

import {
    Platform
} from 'react-native';

import {
    Router,
    Scene,
} from 'react-native-router-flux';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 54 : 64}}>
                    <Scene key='home' component={Home} title='Home'/>
                    <Scene key='menu' component={Menu} title='Menu'/>
                    <Scene key='comunicacion' component={Comunicacion} title='Comunicacion'/>
                    <Scene key='chat' component={Chat} title='Chat'/>
                    <Scene key='historias' component={Historias} title='Historias'/>
                    <Scene key='contacto' component={Contacto} title='Contactos'/>
                    <Scene key='verHistorias' component={VerHistorias} title='Ver Historias'/>
                    <Scene key='cargarHistoria' component={CargarHistoria} title='Cargar Historia'/>
                    <Scene key='cargarHistoriaTexto' component={CargarHistoriaTexto} title='Cargar Historia Texto'/>
                    <Scene key='cargarHistoriaAudio' component={CargarHistoriaAudio} title='Cargar Historia Audio'/>
                    <Scene key='notificacion' component={Notificacion} title='Notificaciones'/>
                </Scene>
            </Router>
        );
    }
}

export default App;