import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateGame from './components/CreateGame/CreateGame';
import GameLoading from './components/GameLoading/GameLoading';
import LandingPage from './components/LandingPage/LandingPage';
import Player from './components/Player/Player';
import Judge from './components/Judge/Judge';
import Winner from './components/Winner/Winner';
import JudgePlayerWaiting from './components/JudgePlayerWaiting/JudgePlayerWaiting';
import InGame from './components/InGame/InGame';

export default (
    <Switch>
        <Route path='/landing-page' component={LandingPage}/>
        <Route exact path='/' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/create-game' component={CreateGame}/>
        <Route path='/game-loading' component={GameLoading}/>
        <Route path='/player' component={Player}/>
        <Route path='/judge' component={Judge}/>
        <Route path='/winner' component={Winner}/>
        <Route path='/waiting-room' component={JudgePlayerWaiting}/>
        <Route path='/in-game' component={InGame}/>
    </Switch>
)