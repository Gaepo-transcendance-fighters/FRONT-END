// use client;

import Title from "./Title"

import { Button } from '@mui/material';
import List from "./List";
export default function RoomList() {

	return <>
		<Title />
		<div className="tab">
			<Button variant="contained" className="tab2">Contained</Button>
			<Button variant="contained" className="tab2">Contained</Button>
		</div>
		<List />
	</>;
}
