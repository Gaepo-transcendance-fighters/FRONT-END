import { KeyboardReturnSharp } from "@mui/icons-material";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  useReducer,
} from "react";

enum Mode {
  PRIVATE = "private",
  PUBLIC = "public",
  PROTECTED = "protected",
}

interface IChatRoom0 {
  channelIdx: number;
  owner: string;
  mode: Mode;
}

interface RoomContextData {
  rooms: IChatRoom0[];
  setRooms: Dispatch<actionType>;
  nonDmRooms: IChatRoom0[];
  setNonDmRooms: Dispatch<actionType>;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const RoomContext = createContext<RoomContextData>({
  rooms: [],
  setRooms: () => {},
  nonDmRooms: [],
  setNonDmRooms: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

export const useRoom = () => {
  return useContext(RoomContext);
};

type actionType = {
  type: string;
  payload: IChatRoom0[];
};

const RoomReducer = (state: IChatRoom0[], action: actionType) => {
  state;
  switch (action.type) {
    case "main-enter":
      return action.payload;
    case "create-room":
      return [...state, action.payload[0]];
    case "empty-nondmroom":
      return action.payload;
    case "divide-room":
      return [...state, action.payload[0]];
    default:
      return state;
  }
};

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useReducer(RoomReducer, []);
  const [nonDmRooms, setNonDmRooms] = useReducer(RoomReducer, []);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <RoomContext.Provider
      value={{ rooms, setRooms, isOpen, setIsOpen, nonDmRooms, setNonDmRooms }}
    >
      {children}
    </RoomContext.Provider>
  );
};
