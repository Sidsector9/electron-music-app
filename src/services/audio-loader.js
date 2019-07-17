import axios from "axios";

let audioContext;

if ( undefined !== window.AudioContext ) {
	audioContext = new window.AudioContext();
}

axios({
	method: 'get',
	url: 'rain.mp3',
	responseType: 'arraybuffer',
})
.then( function( response ) {
	const audioData = response.data;

	audioContext.decodeAudioData( audioData, function( audioBuffer ) {
		const source = audioContext.createBufferSource();
		source.buffer = audioBuffer;
		source.connect( audioContext.destination );
		source.loop = false;
		source.start();
	}, function() {
		console.log( 'Decoding failed...' );
	} );
})