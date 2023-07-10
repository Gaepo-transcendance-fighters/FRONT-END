// use client;

import "@/components/room_list/RoomList.css";
import { Button, ThemeProvider } from "@mui/material";
import {theme} from "@/components/room_list/theme";

export default function List() {

	return (
	<div className="list">
	    	<ThemeProvider theme={theme}>
				<Button variant="contained" color="primary">
				Success
			</Button>
		    </ThemeProvider>
		<div></div>
		<div></div>

	</div>);
}
