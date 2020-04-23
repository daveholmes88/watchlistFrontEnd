export default function watchlist(state = [], action) {
    switch(action.type) {
        case 'CREATE_WATCHLIST':
            return action.payload

        case 'ADD_WATCHLIST':
            return [...state, action.payload]

        default: 
            return state
    }
}