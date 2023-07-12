import "@/components/main/room_list/RoomList.css";
import "@/components/main/chat_participants_list/ChatPtcptsList.css";
import List from "../room_list/List";
import Title from "../room_list/Title";
import { mockChatRoomList } from "../room_list/RoomTypeButton";
import PtcptList from "./PtcptList";

export default function ChatPtcptsList() {
  return (
    <>
      <Title title={"pltitle"} text={"Participants List"}/>
      
      <PtcptList />
    </>
  );
}
