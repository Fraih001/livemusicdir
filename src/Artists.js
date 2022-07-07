import React from 'react';
import { connect } from 'react-redux';

const Artists = ({ artists }) => {
    return (
        <div>
        Artists:
            <ul>
                {artists.map(artist => {
                    return (
                        <li key={ artist.id }>
                    { artist.name }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        artists: state.artists
    }
};

export default connect(mapStateToProps)(Artists)