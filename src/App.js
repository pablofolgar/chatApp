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
                    <Scene key='home' component={Home} title='INICIO'/>
                    <Scene key='menu' component={Menu} title='MENÚ'/>
                    <Scene key='comunicacion' component={Comunicacion} title='COMUNICACIÓN'/>
                    <Scene key='chat' component={Chat} title='CHAT'/>
                    <Scene key='historias' component={Historias} title='HISTORIAS'/>
                    <Scene key='contacto' component={Contacto} title='CONTACTOS'/>
                    <Scene key='verHistorias' component={VerHistorias} title='VER HISTORIAS'/>
                    <Scene key='cargarHistoria' component={CargarHistoria} title='CARGAR HISTORIA'/>
                    <Scene key='cargarHistoriaTexto' component={CargarHistoriaTexto} title='CARGAR HISTORIA TEXTO'/>
                    <Scene key='cargarHistoriaAudio' component={CargarHistoriaAudio} title='CARGAR HISTORIA AUDIO'/>
                </Scene>
            </Router>
        );
    }
}

export default App;