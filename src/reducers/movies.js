export default function movies(state = [], action) {
    switch (action.type) {
        case 'FETCH_MOVIES':
            return action.payload
        default: 
            return state
    }
}