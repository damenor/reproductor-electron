import React, { Component } from 'react';

export default class Details extends Component{
	render(){

		const title = {
			textAlign:"center"
		}

		return(
			<div>
				<h1 style={ title }>{ this.props.title }</h1>
			</div>
		);
	}
}