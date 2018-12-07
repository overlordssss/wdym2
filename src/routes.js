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

export default (socket) => (
    <Switch>
        
        <Route path='/landing-page' render = {(props) => <LandingPage socket = {socket}{...props} />}/>
        <Route exact path='/' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/create-game' render={(props) => <CreateGame socket = {socket}{...props}/>}/>
        <Route path='/game-loading' render={(props) => <GameLoading socket = {socket}{...props}/>}/>
        <Route path='/player' render={(props) => <Player socket = {socket}{...props}/>}/>
        <Route path='/judge' render={() => <Judge socket={socket}/>}/>
        <Route path='/winner' render={() => <Winner socket={socket}/>}/>
        <Route path='/waiting-room' render={(props) => <JudgePlayerWaiting socket = {socket}{...props} />}/>
        <Route path='/in-game' render={(props) => <InGame socket= {socket}{...props}/>}/>
    </Switch>
)
//path= render ={props => {Component socket = {socket} {...props} } }