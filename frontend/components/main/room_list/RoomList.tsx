// use client;

import Title from "./Title"

import { Button } from '@mui/material';
import List from "./List";
export default function RoomList() {

	return <>
		<Title />
		<div>
			<button className="notdm tab2">Public / Protected</button>
			<button className="dm tab2">DM</button>
		</div>
		<List />
	</>;
}
