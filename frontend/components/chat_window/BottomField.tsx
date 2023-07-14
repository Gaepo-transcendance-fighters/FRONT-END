import SendButton from './SendButton'
import TextField from './TextField'
import './ChatWindow.css'
import { Box } from "@mui/material";
import { useState } from 'react'

const BottomField = () => {
	const [msg, setMsg] = useState<string>('');

	return (
		<Box sx={{
			backgroundColor: "#4174D3", 
			height: "11%", 
			display: "flex", 
			justifyContent: "center",
			margin: "0.5% 2% 2% 2%",
			borderRadius: "5px",
			minWidth: "260px"}}>
			<TextField/>
			<SendButton/>
		</Box>
	)
}

export default BottomField;