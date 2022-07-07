import { createStore } from 'redux'

const initialState = {
    artists: [],
    concerts: []
}

const SET_ARTISTS = 'SET_ARTIST';
const SET_CONCERTS = 'SET_CONCERTS';

const store = createStore((state = initialState, action)=> {
    if(action.type === SET_ARTISTS) {
        return {...state, artists: action.artists}
    }
    if(action.type === SET_CONCERTS) {
        return {...state, concerts: action.concerts}
    }
    return state;
});

export default store;
export { SET_ARTISTS, SET_CONCERTS }

