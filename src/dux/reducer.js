const initialState = {
    username: {},
    guestUsername: "",
    roundsToWin: 0,
    customImages: [],
    judgeIndex: 0,
    //players array will consist of objects containing username, rounds_won, input_top, input_bottom and role(judge/player)
    players: [],
    blankMemes: [],
    numberOfPlayers: 0,
    winningMeme: {}
 }
 
 const USERNAME = 'USERNAME' 
 const ROUNDSTOWIN = 'ROUNDSTOWIN'
 const PLAYERS = 'PLAYERS'
 const IMAGES = 'IMAGES'
 const NUMBEROFPLAYERS = 'NUMBEROFPLAYERS'
 
 export default function reducer(state = initialState, action){
    switch(action.type){

        case USERNAME:
        return Object.assign({}, state, {username: action.payload})
 
        case ROUNDSTOWIN:
        return Object.assign({}, state, {roundsToWin: action.payload})
 
        case PLAYERS:
        return Object.assign({}, state, {players: action.payload})

        case IMAGES:
        return Object.assign({}, state, {customImages: action.payload})

        case NUMBEROFPLAYERS:
        return Object.assign({}, state, {numberOfPlayers: action.payload})
 
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

 export function username(user){
    return{
        type: USERNAME,
        payload: user
    }
 }

export function images(images){

}

export function numberOfPlayers(num){
    return{
        type: NUMBEROFPLAYERS,
        payload: num
    }
}