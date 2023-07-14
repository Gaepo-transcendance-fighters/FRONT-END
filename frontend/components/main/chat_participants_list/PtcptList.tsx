import "@/components/main/chat_participants_list/ChatPtcptsList.css";
import Ptcpt from "./Ptcpt";
import { IChatRoom } from "../room_list/RoomTypeButton";
import { chatRoomType } from "../room_list/RoomTypeButton";

export const mockChatRoom: IChatRoom = {
  channelIdx: 1,
  owner: "jaekim",
  Ptcpts: [
    "aaaaaaaaaa",
    "bbbbbbbbbb",
    "bbbbbbbbbb",
    "wochae",
    "silee",
    "jujeon",
    "hoslim",
  ],
  channelType: chatRoomType.nonDm,
  password: "qwer",
};

export default function PtcptList({ aRoom }: { aRoom: IChatRoom | undefined }) {
  return (
    <div className="pllist">
      <div>
        {aRoom?.Ptcpts.map((person, idx) => {
          return <Ptcpt key={idx} person={person} />;
        })}
      </div>
    </div>
  );
}
