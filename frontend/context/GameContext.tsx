import { useRouter } from "next/navigation";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface GameContextData {
  gameMode: string;
  ballSpeedOption: number;
  mapType: string;
  aScore: number;
  bScore: number;
}

type GameAction =
  | { type: "SET_GAME_MODE"; value: string }
  | { type: "SET_BALL_SPEED_OPTION"; value: string }
  | { type: "SET_MAP_TYPE"; value: string }
  | { type: "A_SCORE"; value: number }
  | { type: "B_SCORE"; value: number }
  | { type: "SCORE_RESET"; value: GameContextData };

const initialState: GameContextData = {
  gameMode: "",
  ballSpeedOption: 6,
  mapType: "map2",
  aScore: 0,
  bScore: 0,
};

export function resetGameContextData(): GameContextData {
  return {
    gameMode: "",
    ballSpeedOption: 6,
    mapType: "map2",
    aScore: 0,
    bScore: 0,
  };
}

function gameReducer(state: GameContextData, action: GameAction) {
  const router = useRouter();
  switch (action.type) {
    case "SET_GAME_MODE": {
      return { ...state, gameMode: action.value };
    }
    case "SET_BALL_SPEED_OPTION": {
      if (action.value === "speed1") return { ...state, ballSpeedOption: 4 };
      else if (action.value === "speed2")
        return { ...state, ballSpeedOption: 6 };
      else if (action.value === "speed3")
        return { ...state, ballSpeedOption: 8 };
    }
    case "SET_MAP_TYPE":
      return { ...state, mapType: action.value };
    case "A_SCORE": {
      if (state.aScore + 1 === 5) router.push("/gameresult");
      return { ...state, aScore: action.value + 1 };
    }
    case "B_SCORE": {
      if (state.bScore + 1 === 5) router.push("/gameresult");
      return { ...state, bScore: action.value + 1 };
    }
    case "SCORE_RESET":
      return action.value;

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameContextData;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
