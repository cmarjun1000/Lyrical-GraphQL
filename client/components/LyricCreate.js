import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.content
            },
            // optimisticResponse: {
            //     __typename: 'Mutation',
            //     likeLyric: {
            //         id,
            //         __typename: 'LyricType'
            //         likes: likes + 1
            //     }
            // }
        }).then(() => this.setState({ content: '' }));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a lyric to this song: </label>
                <input
                    value={this.state.content}
                    onChange={event => this.setState({ content: event.target.value })} />
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($songId: ID, $content: String) {
        addLyricToSong(songId: $songId, content: $content) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);