import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface AuthContextData {
  isLoggedIn: boolean;
  id: number;
  nickname: string;
  imgUrl: string;
}

type AuthAction =
  | { type: "LOGIN"; value: boolean }
  | { type: "SET_ID"; value: number }
  | { type: "SET_NICKNAME"; value: string }
  | { type: "SET_IMGURL"; value: string };

const initialState: AuthContextData = {
  isLoggedIn: false,
  id: 0,
  nickname: "",
  imgUrl: "",
};

const AuthReducer = (state: AuthContextData, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: action.value };
    case "SET_ID":
      return { ...state, id: action.value };
    case "SET_IMGURL":
      return { ...state, imgUrl: action.value };
    case "SET_NICKNAME":
      return { ...state, nickname: action.value };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthContextData;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
      dispatch({ type: "LOGIN", value: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
