const initialState = {
    username: {},
    guestUsername: {},
    roundsToWin: 0,
    customImages: "",
    judgeIndex: 0,
    //players array will consist of objects containing username, rounds_won, input_top, input_bottom and role(judge/player)
    players: [],
    blankMemes: [],
    rooms: []
 }
 
 const USERNAME = 'USERNAME' 



 const ROUNDSTOWIN = 'ROUNDSTOWIN'
 const PLAYERS = 'PLAYERS'
 
 export default function reducer(state = initialState, action){
    switch(action.type){

        case USERNAME:
        return Object.assign({}, state, {username: action.payload})
 
        case ROUNDSTOWIN:
        return Object.assign({}, state, {roundsToWin: action.payload})
 
        case PLAYERS:
        return Object.assign({}, state, {players:action.payload})
 
        default:
        return state;
    }
 }
 
 export function roundsToWin(val) {
    return{
        type: ROUNDSTOWIN,
        payload: val
    }
 }
 
 export function players(val) {
    return {
        type: PLAYERS,
        payload: val
    }
 }
