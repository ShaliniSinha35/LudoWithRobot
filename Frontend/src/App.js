
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text
} from 'react-native';
import Home from './screens/Home/Home';
import Game from './screens/game/Game';
import Winner from './screens/Winner/Winner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";

const App = () => {

  const route = useRoute()
  // console.log("155", route.params.mobile)
  const [state, setState] = useState({
    isGameInProgress: false,
    isStartGameModalVisible: false,
    isGameEnd: false,
    red: { name: '' },
    yellow: { name: '' },
    green: { name: '' },
    blue: { name: '' },
    twoPlayer: false,
    threePlayer: false,
    fourPlayer: false,
    currentPlayer: null,
    nextPlayer:null
  });


  const clearAsyncStorageMultiple = async (keysArray) => {
    try {
        for (const key of keysArray) {
            await AsyncStorage.removeItem(key);
        }
        return true; // Indicates successful clearance
    } catch (exception) {
        // console.log(exception);
        return false; // Indicates failure
    }
};

const keysToRemove = ['red', 'green', 'blue','yellow']; 
clearAsyncStorageMultiple(keysToRemove).then(success => {
    if (success) {
        // console.log('Keys cleared successfully');
    } else {
        // console.log('Failed to clear keys');
    }
});


  useEffect(() => {


  }, []);

  const handleEndGame = () => {
    setState(prevState => ({ ...prevState, isGameInProgress: false, isGameEnd: true }));
  };

  const handlePlayerInput = (color, name) => {
    setState(prevState => ({ ...prevState, [color]: { name } }));
  };
  const handleRoomValue = (room) => {
    // console.log("207",room)
    setState(prevState => ({ ...prevState, room: room }));
  };


  if (state.isGameInProgress && !state.isGameEnd) {
    return (
      <Game
        redName={state.red.name}
        yellowName={state.yellow.name}
        blueName={state.blue.name}
        greenName={state.green.name}
        currentPlayer={state.currentPlayer}
        nextPlayer={state.nextPlayer}
        isGameEnd={state.isGameEnd}
        onEnd={handleEndGame}
        number ={route.params.mobile}
      />
    );
  } else if (state.isGameEnd && !state.isGameInProgress) {
    return (
      <Winner
        backToHome={() => setState(prevState => ({ ...prevState, isStartGameModalVisible: false, isGameEnd: false }))}
        red={state.red}
        blue={state.blue}
        yellow={state.yellow}
        green={state.green}
        onRedInput={name => handlePlayerInput('red', name)}
        onYellowInput={name => handlePlayerInput('yellow', name)}
        onGreenInput={name => handlePlayerInput('green', name)}
        onBlueInput={name => handlePlayerInput('blue', name)}
      
      />
    );
  } else {
    return (
      <Home
        isStartGameModalVisible={state.isStartGameModalVisible}
        onNewGameButtonPress={() => setState(prevState => ({ ...prevState, isStartGameModalVisible: true }))}
        onCancel={() => setState(prevState => ({ ...prevState, isStartGameModalVisible: false }))}
        onStart={() => setState(prevState => ({ ...prevState, isGameInProgress: true, isStartGameModalVisible: false, isGameEnd: false }))}
        red={state.red}
        blue={state.blue}
        yellow={state.yellow}
        green={state.green}
        onRedInput={name => handlePlayerInput('red', name)}
        onYellowInput={name => handlePlayerInput('yellow', name)}
        onGreenInput={name => handlePlayerInput('green', name)}
        onBlueInput={name => handlePlayerInput('blue', name)}
        mobileNumber = {route.params.mobile}
        setCurrentNextPlayer = {(cp,np)=>setState(prevState => ({ ...prevState, currentPlayer:cp, nextPlayer:np }))}
                                             
      />
    );
  }
};

const styles = StyleSheet.create({
  // Your styles here
});

export default App;
