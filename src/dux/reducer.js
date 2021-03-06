const initialState = {
    user: {},
    roundsToWin: 0,
    judgeIndex: 0,
    memes: [],
    room: 0,
    numberOfPlayers: 0,
    winningMeme: {},
    players: [],
    playerData: [],
    round: 0,
    rounds_won: 0,
}

const ROUNDS_WON = "ROUNDS_WON"
const USER = 'USER'
const ROUNDSTOWIN = 'ROUNDSTOWIN'
const PLAYERS = 'PLAYERS'
const IMAGES = 'IMAGES'
const NUMBEROFPLAYERS = 'NUMBEROFPLAYERS'
const ROOM = 'ROOM'
const USERLOGOUT = 'USERLOGOUT'
const JUDGE_INDEX = 'JUDGE_INDEX'
const WINNINGMEME = 'WINNINGMEME'
const MEMES = 'MEMES'
const PLAYERDATA = 'PLAYERDATA'
const ROUND = 'ROUND'

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
 
        case JUDGE_INDEX:
            return Object.assign({}, state, { judgeIndex: action.payload })
 
        case WINNINGMEME:
            return Object.assign({}, state, { winningMeme: action.payload })
 
        case ROOM:
            return Object.assign({}, state, { room: action.payload })
 
        case MEMES:
            return Object.assign({}, state, { memes: action.payload })

        case PLAYERDATA:
            return Object.assign({}, state, { playerData: action.payload })

        case ROUND:
            return Object.assign({}, state, { round: action.payload })

        case USERLOGOUT:
            return initialState

        case ROUNDS_WON:
        return Object.assign({}, state, {rounds_won: action.payload})
 
        default:
            return state;
    }
 }

 export function roundWon(val) {
     return {
         type: ROUNDS_WON,
         payload: val
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
 
 
 export function user(user) {
    return {
        type: USER,
        payload: user
    }
 }
 
 export function images(images) {
    return {
        type: IMAGES,
        payload: images
    }
 }
 
 export function numberOfPlayers(num) {
    return {
        type: NUMBEROFPLAYERS,
        payload: num
    }
}

export function newJudge(index) {
    return {
        type: JUDGE_INDEX,
        payload: index
    }
 }
 
 export function memeWinner(winningMeme) {
    return {
        type: WINNINGMEME,
        payload: winningMeme
    }
 }
 
 export function room(val) {
    return {
        type: ROOM,
        payload: val
    }
 }
 
 export function memes(val) {
    return {
        type: MEMES,
        payload: val
    }
}

export function playerData(val) {
    return {
        type: PLAYERDATA,
        payload: val
    }
}

export function roundNum(val) {
    return {
        type: ROUND,
        payload: val
    }
}

export function userLogout() {
    return {
        type: USERLOGOUT,
        payload: initialState
    }
}
