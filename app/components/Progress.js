import React, { Component } from 'react';

export default class Progress extends Component{
	render(){

		const bar = {
			maxWidth: "100%",
			width: "100%",
			border: "1px solid rgba(255, 255, 255, 1)",
			borderRadius: "2px"
		}

		const label = {
			color: "white",
			letterSpacing: "2px",
			marginTop: "8px"
		}
		/*<span style={ label } class="label">{ this.props.total }</span>*/
		return(
			<div class="ui teal progress">
				<span style={ label } class="label" >{ this.props.elapsed }</span>
				<progress style={ bar } class="bar" value={ this.props.progress } max='1'/>
			</div>
		);
	}
}