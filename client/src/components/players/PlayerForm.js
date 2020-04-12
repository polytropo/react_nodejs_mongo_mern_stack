import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player';

const PlayerForm = ({ addPlayer }) => {
    const [formData, setFormData] = useState({
        name: '',
        notes: '',
        type: '',
    });

    const {
        name,
        notes,
        type,
    } = formData;

    const onChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value })};

    return (
        <Fragment>
            <h1 className='large text-primary'>Add a player</h1>
            <form
                className='form'
                onSubmit={e => {
                    e.preventDefault();
                    console.log('SUBMITTING', formData);
                    addPlayer({...formData});
                }}
            >
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                  <textarea
                      name='notes'
                      cols='30'
                      rows='5'
                      placeholder='Notes'
                      value={notes}
                      onChange={e => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                    <select onChange={e => onChange(e)} placeholder='Select color' name='type' value={type}>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

PlayerForm.propTypes = {
    addPlayer: PropTypes.func.isRequired,
};

export default connect(
    null,
    { addPlayer }
)(withRouter(PlayerForm));