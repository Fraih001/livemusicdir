import React from 'react';
import { connect } from 'react-redux';

const Concerts = ({ concerts }) => {
    console.log(concerts)
    return (
        <div>
        Concerts:
            <ul>
                {concerts.map(concert => {
                    return (
                        <li key={ concert.id }>
                    {concert.artistName} - { concert.location }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        concerts: state.concerts
    }
};

export default connect(mapStateToProps)(Concerts)
