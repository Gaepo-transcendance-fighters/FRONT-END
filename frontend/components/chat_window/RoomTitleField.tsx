
import Stack from './Stack'
import Typography from '@mui/material/Typography'
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import './ChatWindow.css'
import IconButtons from './SettingIconButton'

export interface IChatRoom {
	roomName: string;
	isProtected: boolean;
}
  
const mockChatRoomList: IChatRoom[] = [
	{
		roomName: 'jujeon room',
		isProtected: true,
	},
	{
		roomName: 'silee room',
		isProtected: false,
	},
	{
		roomName: 'jeekim room',
		isProtected: false,
	},
	{
		roomName: 'hoslim room',
		isProtected: true,
	},
];

const RoomTitleField = () => {
	
	return (
		<div className="room_title_field">
			<div className='room_title_field_left'>
				<Stack/>
				<div className='room_name'>{mockChatRoomList[0].roomName}</div>
			</div>
			<div className='room_title_field_right'>
				<div className='room_type'>
					{mockChatRoomList[0].isProtected ? <VpnKeyTwoToneIcon/> : null}
				</div>
				<div className='room_setting'>
					<IconButtons/>
				</div>
			</div>
		</div>
	)
}

export default RoomTitleField;