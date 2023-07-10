// use client;

import "@/components/main/room_list/RoomList.css";
import { IFriend } from "../friend_list/FriendList";

const mockFriendList: IFriend[] = [
  {
    name: "hoslim",
    isOnline: true,
  },
  {
    name: "jeekim",
    isOnline: true,
  },
  {
    name: "jaekim",
    isOnline: false,
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    //   name: "h",
    isOnline: true,
  },
  {
    name: "hoslim",
    isOnline: true,
  },
  {
    name: "jeekim",
    isOnline: true,
  },
  {
    name: "jaekim",
    isOnline: false,
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    //   name: "h",
    isOnline: true,
  },
  {
    name: "hoslim",
    isOnline: true,
  },
  {
    name: "jeekim",
    isOnline: true,
  },
  {
    name: "jaekim",
    isOnline: false,
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    //   name: "h",
    isOnline: true,
  },
  {
    name: "hoslim",
    isOnline: true,
  },
  {
    name: "jeekim",
    isOnline: true,
  },
  {
    name: "jaekim",
    isOnline: false,
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    //   name: "h",
    isOnline: true,
  },
  {
    name: "hoslim",
    isOnline: true,
  },
  {
    name: "jeekim",
    isOnline: true,
  },
  {
    name: "jaekim",
    isOnline: false,
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    //   name: "h",
    isOnline: true,
  },
  {
    name: "hoslim",
    isOnline: true,
  },
  {
    name: "jeekim",
    isOnline: true,
  },
  {
    name: "jaekim",
    isOnline: false,
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    //   name: "h",
    isOnline: true,
  },
];

export default function List() {
  return (
    <div className="list">
      {mockFriendList.map((friend, idx) => (
        // <Friend key={idx} prop={friend} />
        <button key={idx} className="item">
          {friend.name}
        </button>
      ))}
      <button className="add">+</button>
    </div>
  );
}
