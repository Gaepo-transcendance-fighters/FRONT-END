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
  permission?: Permission | undefined;
}

export interface IChatRoom {
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
  channels: IChatRoom[];
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
  dmRooms: IChatRoom[];
  nonDmRooms: IChatRoom[];
  currentRoom: IChatRoom | null;
  currentRoomMemberList: IMember[];
  isOpen: boolean;
  currentDmRoomMemberList: IDmMemList | null;
}

type RoomAction =
  | { type: "SET_DM_ROOMS"; value: IChatRoom[] }
  | { type: "SET_NON_DM_ROOMS"; value: IChatRoom[] }
  | { type: "SET_CUR_ROOM"; value: IChatRoom | null }
  | { type: "SET_CUR_MEM"; value: IMember[] }
  | { type: "SET_IS_OPEN"; value: boolean }
  | { type: "ADD_ROOM"; value: IChatRoom }
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
    case "SET_IS_OPEN":
      return { ...roomState, isOpen: action.value };
    case "SET_DM_ROOMS":
      return { ...roomState, dmRooms: action.value };
    case "SET_NON_DM_ROOMS":
      return { ...roomState, nonDmRooms: action.value };
    case "SET_CUR_ROOM":
      return { ...roomState, currentRoom: action.value };
    case "SET_CUR_MEM":
      return { ...roomState, currentRoomMemberList: action.value };
    case "ADD_ROOM":
      return {
        ...roomState,
        nonDmRooms: [...roomState.nonDmRooms, action.value],
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
