import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query }]
        }).then(() => hashHistory.push('/'))
    }

    render() {
        return (
            <div>
                <Link to="/" className="button">Back</Link>
                <h4>Create a new song</h4>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title: </label>
                    <input
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

//! means Value is mandatory (NOT NULL)
const mutation = gql`
    mutation AddSong($title: String!){
        addSong(title: $title) {
            id
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);