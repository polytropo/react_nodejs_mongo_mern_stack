import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePlayer } from '../../actions/player';

const PlayerItem = ({ data, deletePlayer }) => (
    <div style={{ border: `2px solid ${data.type}`}} className='post bg-white p-1 my-1'>
        <p className='player'><span className='player_name' > {data.name}:</span> <span className='player_note' > {data.notes}</span><button onClick={() => deletePlayer(data._id)} className="player_delete btn btn-danger">Delete</button></p>
    </div>
);

PlayerItem.propTypes = {
    deletePlayer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    PlayerItem: state.auth
});

export default connect(
    mapStateToProps,
    { deletePlayer }
)(PlayerItem);