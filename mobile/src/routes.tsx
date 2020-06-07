import React from 'react';

//Semelhante ao BrowserRouter, define a forma da navegação
import {NavigationContainer} from '@react-navigation/native';

//Para navegação em forma de pilha... armazena a sequência de telas visitadas
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      {/*headerMode="none" retira a AppBar com nome da tela*/}
      <AppStack.Navigator 
        headerMode = "none"
        screenOptions = {{
          cardStyle: {
            backgroundColor: '#F0F0F5'
          }
        }}
      >
        <AppStack.Screen  name = "Home" component = {Home}/>
        <AppStack.Screen  name = "Points" component = {Points}/>
        <AppStack.Screen  name = "Detail" component = {Detail}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

