import { KeyboardReturnSharp } from "@mui/icons-material";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useReducer,
  Reducer,
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
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const RoomContext = createContext<RoomContextData>({
  rooms: [],
  setRooms: () => {},
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

const RoomsReducer = (state: IChatRoom0[], action: actionType) => {
  state;
  switch (action.type) {
    case "main-enter-0":
      return action.payload;
    default:
      return state;
  }
};

type tmp = { type: string; payload: number };

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  // const [rooms, setRooms] = useState<IChatRoom0[]>([]);
  const [rooms, setRooms] = useReducer(RoomsReducer, []);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <RoomContext.Provider value={{ rooms, setRooms, isOpen, setIsOpen }}>
      {children}
    </RoomContext.Provider>
  );
};
