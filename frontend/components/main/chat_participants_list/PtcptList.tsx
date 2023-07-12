import Ptcpt from "./Ptcpt";
import "@/components/main/chat_participants_list/ChatPtcptsList.css";
import { IChatRoom } from "../room_list/RoomTypeButton";
import { chatRoomType } from "../room_list/RoomTypeButton";

export const mockChatRoom: IChatRoom = {
  channelIdx: 1,
  owner: "jaekim",
  Ptcpts: ["aaaaaaaaaa", "bbbbbbbbbb", "bbbbbbbbbb", "wochae", "silee", "jujeon", "hoslim"],
  channelType: chatRoomType.nonDm,
  password: "qwer",
};

export default function PtcptList() {
  console.log("participants : ", mockChatRoom.Ptcpts);
  return (
    <div className="pllist">
      <div>
        {mockChatRoom.Ptcpts.map((person) => {
          return <Ptcpt person={person} />;
        })}
      </div>
    </div>
  );
}
