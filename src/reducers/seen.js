export default function seen(state = [], action){
    switch (action.type) {
        case 'CREATE_SEEN':
            return action.payload

        case "ADD_SEEN": 
            return [...state, action.payload]

        default:
            return state
    }
}