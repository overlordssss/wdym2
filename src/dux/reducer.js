const initialState = {
    user: {},
    guestUsername: '',
    roundsToWin: 0,
    customImages: [],
    judgeIndex: 0,
    blankMemes: [],
    room: 0,
    numberOfPlayers: 0,
    winningMeme: {}
 }
 
 const USER = 'USER' 
 const GUEST_USERNAME = 'GUEST_USERNAME'
 const ROUNDSTOWIN = 'ROUNDSTOWIN'
 const PLAYERS = 'PLAYERS'
 const IMAGES = 'IMAGES'
 const NUMBEROFPLAYERS = 'NUMBEROFPLAYERS'
 const ROOM = 'ROOM'
 const USERLOGOUT = 'USERLOGOUT'

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case USER:
        return Object.assign({}, state, { user: action.payload })

        case ROUNDSTOWIN:
        return Object.assign({}, state, { roundsToWin: action.payload })

        case PLAYERS:
        return Object.assign({}, state, { players: action.payload })


        case IMAGES:
        return Object.assign({}, state, { customImages: action.payload })

        case NUMBEROFPLAYERS:
        return Object.assign({}, state, { numberOfPlayers: action.payload })

        case GUEST_USERNAME:
        return Object.assign({}, state, { guestUsername: action.payload })

        case ROOM:
        return Object.assign({}, state, {room: action.payload})

        case USERLOGOUT:
        return initialState

        default:
        return state;
    }
}

export function roundsToWin(val) {
    return {
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


 export function user(user){
    return{
        type: USER,
        payload: user
    }
 }

export function images(images){
    return{
        type: IMAGES,
        payload: images
    }
}

export function numberOfPlayers(num){
    return{
        type: NUMBEROFPLAYERS,
        payload: num
    }
}

export function guestUsername(guest) {
    return {
        type: GUEST_USERNAME,
        payload: guest
    }
}

export function room(room) {
    return {
        type: ROOM,
        payload: room
    }
}

export function userLogout(){
    return {
        type: USERLOGOUT,
        payload: initialState
    }
}