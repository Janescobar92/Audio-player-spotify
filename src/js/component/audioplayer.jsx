import React, { useState, useEffect } from "react";

export function AudioComponent() {
	const [song, setSong] = useState("files/mario/songs/castle.mp3");
	const songURL = "https://assets.breatheco.de/apis/sound/";
	const [audioLibrary, setAudioLibrary] = useState([]);
	let songsNames = [];
	const [cancion, setcancion] = useState(songURL + song);
	console.log(audioLibrary);
	function myListgnerator() {
		for (let index = 0; index < audioLibrary.length; index++) {
			songsNames.push(
				<li
					key={index}
					onClick={() => {
						setSong(audioLibrary[index].url);
						myAudio.load();
						myAudio.play();
					}}>
					{audioLibrary[index].name}
				</li>
			);
		}
		return songsNames;
	}
	// function sourceSeter() {
	// 	for (let index = 0; index < audioLibrary.length; index++) {
	// 		setSong(audioLibrary[index].url);
	// 	}
	// 	return sourcesong;
	// }

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/all")
			.then(response => {
				console.log("patata");
				return response.json(); //devuelve un objeto
			})
			.then(responseAsJson => {
				console.log(responseAsJson);
				setAudioLibrary(responseAsJson["data/songs.json"]); //entre corchetes la key del object como valor un array con las canciones!!
			});
	});
	let myAudio = document.querySelector("#myAudioTag");

	if (audioLibrary.length == 0) {
		return "Loading...";
	} else {
		return (
			<div>
				<ul>{myListgnerator()}</ul>
				<audio id="myAudioTag">
					<source src={songURL + song} />
					{/* "ESTO ES SONGURL + SONG" */}
				</audio>
				<button
					onClick={() => {
						myAudio.play();
					}}>
					Play
				</button>
				<button onClick={() => myAudio.pause()}>Pause</button>
				<button
					onClick={() => {
						audioLibrary.map((libraryItem, index) => {
							// {
							// 	if (index < audioLibrary.length - 1) {
							// 		index++;
							// 		return setSong(libraryItem.url);
							// 	} else {
							// 		index = 0;
							// 		return setSong(libraryItem.url);
							// 	}
							// }
						});
					}}>
					Previous
				</button>
				<button
					onClick={() => {
						audioLibrary.map((libraryItem, index) => {
							setSong(libraryItem.url);
						});
						// "ESTO ES NEXT SONG"
						myAudio.load();
						myAudio.play();
					}}>
					Next
				</button>
			</div>
		);
	}
}
