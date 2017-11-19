import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Hacer peticiones ajax
import Axios from 'axios';

import Sound from 'react-sound';

import Details from '../components/Details';
import Player from '../components/Player';
import Progress from '../components/Progress';
import Search from '../components/Search';

export default class App extends Component{

	/* Para la compilación
		 https://github.com/electron-userland/electron-packager
		 modificar el webpack a production para minificar los js
	*/

	constructor(){
		super();
		this.state= {
			tracks: [
				{
					stream_url: './public/sounds/Andas_en_mi_cabeza.mp3',
					title: 'Andas en mi cabeza',
					atwork_url: 'http://www.elgenero.com/images/subir/images/1454444565chinonwnw.jpg'
				},
				{
					stream_url: './public/sounds/Dejame_hablar_contigo.mp3',
					title: 'Dejame hablar contigo',
					atwork_url: 'https://1.bp.blogspot.com/-l3UkccsPiL4/VyaOTyyyc7I/AAAAAAAAIdE/mXz8KYcV5D4RnbY4JrfohEGU6vL69SalACLcB/s640/Lytos%2B-%2BD%25C3%25A9jame%2BHablar%2BContigo.png'
				}
			],
			track: {
				stream_url: '',
				title: '',
				atwork_url: ''
			},
			playStatus: Sound.status.STOPPED,
			elapsed: '00:00',
			total: '00:00',
			progress: 0,
			playFromPosition: 0,
			autoCompleteValue: ''
		}
		this.randomTrack.bind(this)

	}

	componentDidMount(){
		this.randomTrack();
	}

	parseImage(url){

	}

	render(){

		const playStyle = {
			width: "100vw", 
			height: "100vh",
			padding: "20%",
			paddingTop: "5%",
			color: "white",
			boxSizing: "border-box",
			backgroundColor: "rgba(0, 0, 0, .5)"
			//backgroundImage: `url(${ this.state.track.atwork_url })`,
			//backgroundSize: "cover",
			//backgroundPosition: "center"
		}

		return(
			<div style={ playStyle } class="ui fluid container">
				<div class="ui one column centered grid">
					<div class="column">
						<Sound 
							url={ this.state.track.stream_url }
							playStatus={ this.state.playStatus }
							playFromPosition={ this.state.playFromPosition }
							onLoading={this.handleSongLoading.bind(this)}
							onPlaying={ this.handleSongPlaying.bind(this) }
							onFinishedPlaying={ this.handleSongFinish.bind(this) }
						/>
					</div>
					<div class="column">
						<Search 
							autoCompleteValue={ this.state.autoCompleteValue }
							tracks={ this.state.tracks }
							handleSelect={ this.handleSelect.bind(this) }
							handleChange={ this.handleChange.bind(this) }
							/>
					</div>
					<div class="column">
					<Details 
						title={ this.state.track.title }
						/>
					</div>
					<div class="column">
						<Player 
							togglePlay={ this.togglePlay.bind(this) }
							stop={ this.stop.bind(this) }
							backward={ this.backward.bind(this) }
							forward={ this.forward.bind(this) }
							random={ this.randomTrack.bind(this) }
							playerStatus={ this.state.playStatus }
							/>
					</div>
					<div class="column">
						<Progress 
							elapsed={ this.state.elapsed }
							progress={ this.state.progress }
							/*total={ this.state.total }*/
							/>
					</div>
				</div>
				
			</div>
		)
	}

	handleSongLoading(){
		this.setState({
			total: this.parseMilliseconds(audio.duration),
		})
	}

	handleSongPlaying(audio){
		this.setState({
			elapsed: this.parseMilliseconds(audio.position),
			total: this.parseMilliseconds(audio.duration),
			progress: audio.position / audio.duration
		})
	}

	handleSongFinish(){
		this.randomTrack()
	}

	handleChange(event, value){
		this.setState({
			autoCompleteValue: value.newValue
		})
		let _this = this

	}

	handleSelect(value, item){
		this.setState({
			autoCompleteValue: value.item,
			track: value
		})
	}

	togglePlay(){
		if(this.state.playStatus === Sound.status.PLAYING){
			this.setState({ playStatus: Sound.status.PAUSE })
		}else{
			this.setState({ playStatus: Sound.status.PLAYING })
		}
	}

	stop(){
		this.setState({ 
			playStatus: Sound.status.STOPPED, 
			elapsed: '00:00',
			progress: 0
		})
	}

	backward(){
		this.setState({ playFromPosition: this.state.playFromPosition -= 1000 * 10 })
	}

	forward(){
		this.setState({ playFromPosition: this.state.playFromPosition += 1000 * 10 })
	}

	parseMilliseconds(milliseconds){
		let hours = Math.floor(milliseconds / 3600000);
		milliseconds = milliseconds % 3600000;
		let minutes = Math.floor(milliseconds / 60000);
		milliseconds = milliseconds % 60000;
		let seconds = Math.floor(milliseconds / 1000);
		milliseconds = Math.floor(milliseconds % 1000);

		return(
			(minutes < 10 ? '0' : '') + minutes + ':' + 
			(seconds < 10 ? '0' : '') + seconds  
		)
	}

	randomTrack(){
		const numeroCancion = Math.round(Math.random());
		this.setState({
			track: this.state.tracks[numeroCancion]
		})
	}

}

/* request(){
		Axios.get('https://api.soundcloud.com/users/134064959/favorites?client_id=' + this.clientID)
			.then( response => console.log(response))
			.catch( error => console.error(error) ) 
		
	} */