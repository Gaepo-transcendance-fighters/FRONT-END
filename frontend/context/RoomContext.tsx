import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
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
  setRooms: Dispatch<SetStateAction<IChatRoom0[]>>;
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

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<IChatRoom0[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <RoomContext.Provider value={{ rooms, setRooms, isOpen, setIsOpen }}>
      {children}
    </RoomContext.Provider>
  );
};
