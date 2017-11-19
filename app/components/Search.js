import React, { Component } from 'react';

import Autosugges from 'react-autosuggest';

export default class Search extends Component{
	
	handleRenderItem(item){
		return(
			<div key={ item.id } id={ item.id }>
				{ item.title }
			</div>
		)
	}

	render(){

		const inputProps = {
			placeholder: 'Buscar una canción...', 
			value: this.props.autoCompleteValue,
			onChange: this.props.handleChange
		}

		return(
			<div class="ui form">
				<Autosugges 
					suggestions={ this.props.tracks }
					getSuggestionValue={ this.props.handleSelect }
					renderSuggestion={ this.handleRenderItem.bind(this) }
					inputProps={ inputProps }
				/>
			</div>
		);
	}
}