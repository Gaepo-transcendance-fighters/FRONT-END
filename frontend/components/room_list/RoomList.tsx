// use client;

import Title from "./Title"

import { Button } from '@mui/material';
import List from "./List";
export default function RoomList() {

	return <>
		<Title />
		<div className="tab">
			<button className="tab2">public / protected</button>
			<button className="tab2">DM</button>
			{/* <Button variant="contained" className="tab2">public / protected</Button>
			<Button variant="contained" className="tab2">DM</Button> */}
		</div>
		<List />
	</>;
}
