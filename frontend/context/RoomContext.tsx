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
  | { type: "SET_ISOPEN"; value: boolean };

const initialState: RoomContextData = {
  DM: [],
  rooms: [],
  currentRoom: null,
  currentRoomMember: [],
  isOpen: false,
};

const RoomReducer = (state: RoomContextData, action: RoomAction) => {
  switch (action.type) {
    case "SET_ISOPEN":
      return { ...state, isOpen: action.value };
    case "SET_DM":
      return { ...state, DM: action.value };
    case "SET_ROOMS":
      return { ...state, rooms: action.value };
    case "SET_CURRENTROOM":
      return { ...state, currentRoom: action.value };
    case "SET_CURRENTROOMMEMBER":
      return { ...state, currentRoomMember: action.value };
    default:
      return state;
  }
};

const RoomContext = createContext<{
  state: RoomContextData;
  dispatch: React.Dispatch<RoomAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const useRoom = () => {
  return useContext(RoomContext);
};

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(RoomReducer, initialState);

  useEffect(() => {}, []);

  return (
    <RoomContext.Provider value={{ state, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
};
