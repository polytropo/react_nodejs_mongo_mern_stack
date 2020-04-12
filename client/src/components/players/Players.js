import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PlayerItem from './PlayerItem';
import PlayerForm from './PlayerForm';
import { getPlayers } from '../../actions/player';

const Players = ({ getPlayers, players: { players, loading } }) => {
    useEffect(() => {
        getPlayers();
    }, [getPlayers]);
    console.log('Players', players);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Players</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome to the community
            </p>
            <PlayerForm />
            <div className='posts'>
                {players.map(player => (
                    <Fragment>
                        <p>{player.name}</p>
                        <PlayerItem data={player} />
                    </Fragment>
                ))}
            </div>
        </Fragment>
    );
};

Players.propTypes = {
    getPlayers: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    players: state.player,
});

export default connect(
    mapStateToProps,
    { getPlayers }
)(Players);