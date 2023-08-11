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
  nickname: string;
  imgUri: string;
  permission: Permission;
}

export interface IChatRoom0 {
  owner: string;
  channelIdx: number;
  mode: Mode;
}

interface RoomContextData {
  dmRooms: IChatRoom0[];
  nonDmRooms: IChatRoom0[];
  currentRoom: IChatRoom0 | null;
  currentRoomMember: IMember[];
  isOpen: boolean;
}

type RoomAction =
  | { type: "SET_DM_ROOMS"; value: IChatRoom0[] }
  | { type: "SET_NON_ROOMS"; value: IChatRoom0[] }
  | { type: "SET_CURRENTROOM"; value: IChatRoom0 }
  | { type: "SET_CUR_MEM"; value: IMember[] }
  | { type: "SET_ISOPEN"; value: boolean }
  | { type: "ADD_ROOM"; value: IChatRoom0 };

const initialState: RoomContextData = {
  dmRooms: [],
  nonDmRooms: [],
  currentRoom: null,
  currentRoomMember: [],
  isOpen: true,
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
      return { ...roomState, currentRoomMember: action.value };
    case "ADD_ROOM":
      return {
        ...roomState,
        nonDmRooms: [...roomState.nonDmRooms, action.value],
      };
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
