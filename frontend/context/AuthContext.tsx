import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Socket, io } from "socket.io-client";
import { server_domain } from "@/app/page";

interface IBlockPerson {
  targetNickname: string;
  targetIdx: number;
}

interface IBlockList {
  blockPerson: IBlockPerson[];
}

interface IUserInfo {
  id: number;
  nickname: string;
  email: string;
  imgUrl: string;
  authorization: string;
  check2Auth: boolean;
}

interface AuthContextData {
  userInfo: IUserInfo;
  blockList: IBlockList | null;
  chatSocket?: Socket;
  gameSocket?: Socket;
}

type AuthAction =
  | { type: "SET_ID"; value: number }
  | { type: "SET_NICKNAME"; value: string }
  | { type: "SET_IMGURL"; value: string }
  | { type: "SET_EMAIL"; value: string }
  | { type: "SET_AUTHORIZATION"; value: string }
  | { type: "SET_CHECK2AUTH"; value: boolean }
  | { type: "SET_BLOCK"; value: IBlockList }
  | { type: "SET_CHAT_SOCKET"; value: Socket }
  | { type: "SET_GAME_SOCKET"; value: Socket };

const initialState: AuthContextData = {
  userInfo: {
    id: 0,
    nickname: "",
    imgUrl: "",
    email: "",
    authorization: "",
    check2Auth: false,
  },
  blockList: null,
};

const AuthReducer = (state: AuthContextData, action: AuthAction) => {
  switch (action.type) {
    case "SET_ID":
      return { ...state, userInfo: { ...state.userInfo, id: action.value } };
    case "SET_IMGURL":
      return {
        ...state,
        userInfo: { ...state.userInfo, imgUrl: action.value },
      };
    case "SET_NICKNAME":
      return {
        ...state,
        userInfo: { ...state.userInfo, nickname: action.value },
      };
    case "SET_EMAIL":
      return { ...state, userInfo: { ...state.userInfo, email: action.value } };
    case "SET_AUTHORIZATION":
      return {
        ...state,
        userInfo: { ...state.userInfo, authorization: action.value },
      };
    case "SET_CHECK2AUTH":
      return {
        ...state,
        userInfo: { ...state.userInfo, check2Auth: action.value },
      };
    case "SET_BLOCK":
      return { ...state, blockList: action.value };
    case "SET_CHAT_SOCKET":
      return { ...state, chatSocket: action.value };
    case "SET_GAME_SOCKET":
      return { ...state, gameSocket: action.value };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  authState: AuthContextData;
  authDispatch: React.Dispatch<AuthAction>;
}>({
  authState: initialState,
  authDispatch: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("idx")) {
      const chat = io(`${server_domain}/chat`, {
        query: { userId: localStorage.getItem("idx") },
        autoConnect: false,
      }).connect()

      const gameSocket = io(`${server_domain}/game/playroom`, {
        query: { userId: localStorage.getItem("idx") },
        autoConnect: false,
      })

      authDispatch({
        type: "SET_CHAT_SOCKET",
        value: chat
      });

      authDispatch({
        type: "SET_GAME_SOCKET",
        value: gameSocket
      });
      const nickname = localStorage.getItem("nickname")
      const idx = localStorage.getItem("idx")
      const email = localStorage.getItem("email")
      const imgUri = localStorage.getItem("imgUri")
      const token = localStorage.getItem("token")
      const auth = localStorage.getItem("check2Auth")

      if (!idx || !nickname || !email || !imgUri || !token ) {
        authDispatch({
          type: "SET_ID",
          value: parseInt(idx!),
        });
        authDispatch({
          type: "SET_NICKNAME",
          value: nickname!,
        });
        authDispatch({
          type: "SET_IMGURL",
          value: imgUri!,
        });
        authDispatch({
          type: "SET_AUTHORIZATION",
          value: token!,
        });
        authDispatch({
          type: "SET_CHECK2AUTH",
          value: Boolean(auth!),
        });
        authDispatch({
          type: "SET_EMAIL",
          value: email!,
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
