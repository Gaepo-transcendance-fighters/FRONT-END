import { useEffect, useState } from 'react'
import './ChatWindow.css'

export interface IChat {
	name: string;
	message: string;
}

const mockMessageHistories:IChat[] = [
		{
			name: "jujeon",
			message: "1 hello there",
		},
		{
			name: "jujeon",
			message: "2 dear bear",
		},
		{
			name: "jujeon",
			message: "3 I got there",
		},
		{
			name: "jujeon",
			message: "4 ft_transcendence asdkfjasdfklsadfijcj sdlkf l sdaif jisdf ljksdf ljk asd;kfadsk end",
		},
		{
			name: "jujeon",
			message: "5 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "6 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "7 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "8 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "9 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "10 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "11 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "12 ende",
		}
]

const ChatField = () => {
	
	const [msgHistories, setMsgHistories] = useState<IChat[]>([]);
	
	useEffect(()=> {
		setMsgHistories(mockMessageHistories);
	}, [])

	return (
		<div className="chat_field">
				{msgHistories.map((value, i) => {
					return (
						<ul style={{margin: "1% 0% 1% 0%", padding:"2% 2% 0.5% 2%"}}>
							<li className='message_box'>{value.name + ": " + value.message}</li>
						</ul>	
					)
				})}
			</div>
	);
}

export default ChatField