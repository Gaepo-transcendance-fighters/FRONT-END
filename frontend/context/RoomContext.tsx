import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

export enum Mode {
  PRIVATE = "private",
  PUBLIC = "public",
  PROTECTED = "protected",
}

export enum Permission {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
}

export interface IMember {
  userIdx: number | undefined;
  nickname: string | undefined;
  imgUri: string | undefined;
}

export interface IChatRoom0 {
  owner: string;
  targetNickname?: string;
  channelIdx: number;
  mode: Mode;
}

export interface IChatEnter {
  member: IMember[];
  channelIdx: number;
}

export interface IChatEnterNoti {
  member: IMember[];
  newMember: string;
}

export interface IChatRoomAdmin {}

export interface IChatGetRoom {
  owner?: string;
  targetNickname?: string;
  channelIdx: number;
  mode: Mode;
}

export interface IChatGetRoomList {
  channels: IChatRoom0[];
}

export interface IChatMute {
  channelList?: IChatGetRoom[];
}

export interface IChatKick {
  targetNickname: string;
  targetIdx: number;
  leftMember: IMember[];
}

export interface IDmMemList {
  userIdx1: number;
  userIdx2: number;
  userNickname1: string;
  userNickname2: string;
  imgUrl: string;
}

export interface IChatDmEnter {
  // Message[] {
  // 	message {
  // 		sender : string,
  // 		msg : string
  // 	},
  // 	...
  // }, 이 부분은 주전님이 타입 정해주세요
  // channelIdx : number; currentRoom이 있어서 필요성을 느끼지 못하지만,
  //  이 부분도 필요하시면 주석해제하시고요!

  userIdx1: number;
  userIdx2: number;
  userNickname1: string;
  userNickname2: string;
  imgUrl: string;
}

export const alert = {
  position: "absolute" as "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-50%, -100%)",
};

interface RoomContextData {
  dmRooms: IChatRoom0[];
  nonDmRooms: IChatRoom0[];
  currentRoom: IChatRoom0 | null;
  currentRoomMemberList: IMember[];
  isOpen: boolean;
  currentDmRoomMemberList: IDmMemList | null;
}

type RoomAction =
  | { type: "SET_DM_ROOMS"; value: IChatRoom0[] }
  | { type: "SET_NON_ROOMS"; value: IChatRoom0[] }
  | { type: "SET_CURRENTROOM"; value: IChatRoom0 }
  | { type: "SET_CUR_MEM"; value: IMember[] }
  | { type: "SET_ISOPEN"; value: boolean }
  | { type: "ADD_ROOM"; value: IChatRoom0 }
  | { type: "ADD_CUR_MEM"; value: IMember }
  | { type: "SET_CUR_DM_MEM"; value: IDmMemList };

const initialState: RoomContextData = {
  dmRooms: [],
  nonDmRooms: [],
  currentRoom: null,
  currentRoomMemberList: [],
  isOpen: false,
  currentDmRoomMemberList: null,
};

const RoomReducer = (roomState: RoomContextData, action: RoomAction) => {
  switch (action.type) {
    case "SET_ISOPEN":
      return { ...roomState, isOpen: action.value };
    case "SET_DM_ROOMS":
      return { ...roomState, dmRooms: action.value };
    case "SET_NON_ROOMS":
      return { ...roomState, nonDmRooms: action.value };
    case "SET_CURRENTROOM":
      return { ...roomState, currentRoom: action.value };
    case "SET_CUR_MEM":
      return { ...roomState, currentRoomMemberList: action.value };
    case "ADD_ROOM":
      return {
        ...roomState,
        nonDmRooms: [...roomState.nonDmRooms, action.value],
      };
    case "ADD_CUR_MEM":
      return {
        ...roomState,
        currentRoomMemberList: [
          ...roomState.currentRoomMemberList,
          action.value,
        ],
      };
    case "SET_CUR_DM_MEM":
      return { ...roomState, currentDmRoomMemberList: action.value };

    default:
      return roomState;
  }
};

const RoomContext = createContext<{
  roomState: RoomContextData;
  roomDispatch: React.Dispatch<RoomAction>;
}>({
  roomState: initialState,
  roomDispatch: () => {},
});

export const useRoom = () => {
  return useContext(RoomContext);
};

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [roomState, roomDispatch] = useReducer(RoomReducer, initialState);

  useEffect(() => {}, []);

  return (
    <RoomContext.Provider value={{ roomState, roomDispatch }}>
      {children}
    </RoomContext.Provider>
  );
};
