import React, { Component } from 'react';
import { port } from '../index';

class MenuSongs extends Component {
	constructor(props) {
		super(props);
		this.state = {
            isLoaded: false
        };
	}

	componentDidMount() {
		var categoryId = this.props.category.endsWith("%")  ? this.props.category.slice(0,-2) : this.props.category;
		fetch(`http://localhost:${port}/categories/${categoryId}/songs`)
			.then(res => res.json())
			.then(json => {
				this.setState({
                    songs: json,
                    isLoaded: true
				});
			});
	}
	render() {
        if (!this.state.isLoaded) {
			return null;
		}
		return (
			<div className="category-songs">
				{this.state.songs.map(song => (
					<a className="menu-song" href={song.id} key={song.id}>
						{song.id}. {song.title}
					</a>
				))}
			</div>
		);
	}
}

export default MenuSongs;
