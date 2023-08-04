import { Permission } from "@/components/public/Layout";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

enum Mode {
  PRIVATE = "private",
  PUBLIC = "public",
  PROTECTED = "protected",
}

interface IMember {
  nickname: string;
  imgUri: string;
  permission: Permission;
}

interface IChatRoom0 {
  channelIdx: number;
  owner: string;
  mode: Mode;
}

interface RoomContextData {
  DM: IChatRoom0[];
  rooms: IChatRoom0[];
  currentRoom: IChatRoom0 | null;
  currentRoomMember: IMember[];
  isOpen: boolean;
}

type RoomAction =
  | { type: "SET_DM"; value: IChatRoom0[] }
  | { type: "SET_ROOMS"; value: IChatRoom0[] }
  | { type: "SET_CURRENTROOM"; value: IChatRoom0 }
  | { type: "SET_CURRENTROOMMEMBER"; value: IMember[] }
  | { type: "SET_ISOPEN"; value: boolean }
  | { type: "ADD_ROOM"; value: IChatRoom0 };

const initialState: RoomContextData = {
  DM: [],
  rooms: [],
  currentRoom: null,
  currentRoomMember: [],
  isOpen: false,
};

const RoomReducer = (roomState: RoomContextData, action: RoomAction) => {
  switch (action.type) {
    case "SET_ISOPEN":
      return { ...roomState, isOpen: action.value };
    case "SET_DM":
      return { ...roomState, DM: action.value };
    case "SET_ROOMS":
      return { ...roomState, rooms: action.value };
    case "SET_CURRENTROOM":
      return { ...roomState, currentRoom: action.value };
    case "SET_CURRENTROOMMEMBER":
      return { ...roomState, currentRoomMember: action.value };
    case "ADD_ROOM":
      return {
        ...roomState,
        rooms: [...roomState.rooms, action.value],
      };
    default:
      return roomState;
  }
};

const RoomContext = createContext<{
  roomState: RoomContextData;
  dispatch: React.Dispatch<RoomAction>;
}>({
  roomState: initialState,
  dispatch: () => {},
});

export const useRoom = () => {
  return useContext(RoomContext);
};

type actionType = {
  type: string;
  payload: IChatRoom0[];
};

// const RoomReducer = (roomState: IChatRoom0[], action: actionType) => {
//   roomState;
//   switch (action.type) {
//     case "main-enter":
//       return action.payload;
//     case "create-room":
//       return [...roomState, action.payload[0]];
//     case "empty-nondmroom":
//       return action.payload;
//     case "divide-room":
//       return [...roomState, action.payload[0]];
//     default:
//       return roomState;
//   }
// };

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [roomState, dispatch] = useReducer(RoomReducer, initialState);

  useEffect(() => {}, []);

  return (
    <RoomContext.Provider value={{ roomState, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
};
