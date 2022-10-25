import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {
    render() {
        const { song } = this.props.data;

        if (!song) {
            return <div></div>;
        }

        return (
            <div>
                <Link to="/">Go back</Link>
                <h4>{song.title}</h4>
                <LyricCreate songId={this.props.params.id} />
            </div>
        );
    }
}

export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);