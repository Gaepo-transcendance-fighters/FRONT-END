// use client;

import "@/components/room_list/RoomList.css";
import { Button, ThemeProvider } from "@mui/material";
import {theme} from "@/components/room_list/theme";

export default function List() {

	return (
	<div className="list">
		<button className="item">jeekim님이 만든 방?</button>
		<button className="item">jeekim님이 만든 방?</button>
		<button className="item">jeekim님이 만든 방?</button>
		<button className="add">+</button>
	</div>);
}
