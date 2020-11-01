import React, { useState, useEffect } from "react";

export function AudioComponent() {
	const [song, setSong] = useState("files/mario/songs/castle.mp3");
	const songURL = "https://assets.breatheco.de/apis/sound/";
	const [audioLibrary, setAudioLibrary] = useState([]);
	console.log(audioLibrary);
	let songsNames = [];
	// const [fullSongSource, setFullSongSource] = useState(songURL + song);
	console.log(audioLibrary);
	function myListgnerator() {
		for (let index = 0; index < audioLibrary.length; index++) {
			songsNames.push(
				<li
					className="myListItem"
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
	const previousSong = () => {
		for (let index = 0; index < audioLibrary.length; index++) {
			if (audioLibrary[index].url == song) {
				setSong(audioLibrary[index - 1].url);
			}
		}
	};

	const nextSong = () => {
		for (let index = 0; index < audioLibrary.length; index++) {
			if (audioLibrary[index].url == song) {
				setSong(audioLibrary[index + 1].url);
			}
		}
	};
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
		return "Please wait...";
	} else {
		return (
			<div className="myMusicBox">
				<ul className="myList">{myListgnerator()}</ul>
				<audio id="myAudioTag">
					<source src={songURL + song} />
					{/* "ESTO ES SONGURL + SONG" */}
				</audio>
				<div className="audioControllers">
					<button
						type="button"
						className="btn btn-outline-light"
						onClick={() => {
							myAudio.play();
						}}>
						<i className="fas fa-play" />
					</button>
					<button
						type="button"
						className="btn btn-outline-light"
						onClick={() => myAudio.pause()}>
						<i className="fas fa-pause" />
					</button>
					<button
						type="button"
						className="btn btn-outline-light"
						onClick={() => {
							previousSong();
							myAudio.load();
							myAudio.play();
						}}>
						<i className="fas fa-backward" />
					</button>
					<button
						type="button"
						className="btn btn-outline-light"
						onClick={() => {
							nextSong();
							myAudio.load();
							myAudio.play();
						}}>
						<i className="fas fa-forward" />
					</button>
				</div>
			</div>
		);
	}
}
