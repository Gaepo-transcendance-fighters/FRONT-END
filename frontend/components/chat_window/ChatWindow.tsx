'use client'

import './ChatWindow.css'
import BottomField from './BottomField'
import ChatField from './ChatField'
import RoomTitleField from './RoomTitleField'

const ChatWindow = () => {

	return (
		<div className='chat_window'>
			<RoomTitleField/>
			<ChatField/>
			<BottomField/>
		</div>
	)
}

export default ChatWindow