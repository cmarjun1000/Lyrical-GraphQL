import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';

class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({
            variables: { id }
        }).then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                    <Link to={`/songs/${song.id}`}>
                        {song.title}
                    </Link>
                    <button
                        className='material-icons'
                        onClick={() => this.onSongDelete(song.id)}
                    >delete</button>
                </li>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <div>
                    <ul className="collection">
                        {this.renderSongs()}
                    </ul>
                    <Link to="/songs/new" className="btn-floating red right">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            )
        }
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList)
);