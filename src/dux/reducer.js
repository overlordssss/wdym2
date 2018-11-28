const initialState = {
    userInfo: {},
    guestInfo: {},
    roundsToWin: 0,
    customImages: "",
    judgeIndex: 0,
    //players array will consist of objects containing username, rounds_won, input_top, input_bottom and role(judge/player)
    players: [],
    blankMemes: []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        
        
        default:
        return state;
    }
}