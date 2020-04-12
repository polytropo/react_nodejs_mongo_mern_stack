import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PLAYERS,
    DELETE_PLAYER,
    ADD_PLAYER,
    PLAYER_ERROR,
} from './types';

// Get posts
export const getPlayers = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/players');

        dispatch({
            type: GET_PLAYERS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: PLAYER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete player
export const deletePlayer = id => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/players/${id}`);

        dispatch({
            type: DELETE_PLAYER,
            payload: id,
        });

        dispatch(setAlert('Player Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PLAYER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add player
export const addPlayer = formData => async dispatch => {
    // dispatch({
    //     type: ADD_PLAYER,
    //     payload: formData
    // });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('http://localhost:5000/api/players', formData, config);

        dispatch({
            type: ADD_PLAYER,
            payload: res.data,
        });

        dispatch(setAlert('Player Added', 'success'));
    } catch (err) {
        dispatch({
            type: PLAYER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get player
// export const getPlayer = id => async dispatch => {
//     try {
//         const res = await axios.get(`http://localhost:5000/api/players/${id}`);
//
//         dispatch({
//             type: GET_PLAYER,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: PLAYER_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };
