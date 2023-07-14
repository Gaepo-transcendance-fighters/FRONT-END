import SendButton from './SendButton'
import TextField from './TextField'
import './ChatWindow.css'
import { useState } from 'react'

const BottomField = () => {
	const [msg, setMsg] = useState<string>('');

	return (
		<div className="bottom_field">
			<TextField/>
			<div>
				<SendButton/>
			</div>
		</div>
	)
}

export default BottomField;