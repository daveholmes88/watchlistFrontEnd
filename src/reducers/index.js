import { combineReducers } from 'redux';
import movies from './movies'
import user from './user'
import watchlist from './watchlist'
import seen from './seen'

export default combineReducers({
    movies,
    user,
    watchlist,
    seen
})