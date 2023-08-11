import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface GameContextData {
  gameMode: number; // friend, normal, rank
  ballSpeedOption: number;
  mapType: number;
  aScore: number;
  bScore: number;
  latency: number;
}

enum SpeedOption {
  speed1,
  speed2,
  speed3,
}

enum MapOption {
  map1,
  map2,
  map3,
}

enum GameType {
  FRIEND,
  NORMAL,
  RANK,
}

interface IGameOption {
  gameType: GameType; // FRIED, NORMAL, RANK
  userIdx: number;
  speed: SpeedOption; //NORMAL, FAST, FASTER
  mapNumber: MapOption; // A, B, C
}

type GameAction =
  | { type: "SET_GAME_MODE"; value: GameType }
  | { type: "SET_BALL_SPEED_OPTION"; value: SpeedOption }
  | { type: "SET_MAP_TYPE"; value: MapOption }
  | { type: "SET_LATENCY"; value: number }
  | { type: "A_SCORE"; value: number }
  | { type: "B_SCORE"; value: number }
  | { type: "SCORE_RESET"; value: GameContextData }
  | { type: "GAME_RESET"; value: GameContextData };

const initialState: GameContextData = {
  gameMode: 1,
  ballSpeedOption: 3,
  mapType: MapOption.map2,
  latency: 0,
  aScore: 0,
  bScore: 0,
};

export function resetGameContextData(): GameContextData {
  return {
    gameMode: 1,
    ballSpeedOption: 3,
    mapType: MapOption.map2,
    latency: 0,
    aScore: 0,
    bScore: 0,
  };
}

function gameReducer(state: GameContextData, action: GameAction) {
  switch (action.type) {
    case "SET_GAME_MODE": {
      return { ...state, gameMode: action.value };
    }
    case "SET_BALL_SPEED_OPTION": {
      if (action.value === SpeedOption.speed1)
        return { ...state, ballSpeedOption: 2 };
      else if (action.value === SpeedOption.speed2)
        return { ...state, ballSpeedOption: 3 };
      else if (action.value === SpeedOption.speed3)
        return { ...state, ballSpeedOption: 4 };
    }
    case "SET_MAP_TYPE":
      return { ...state, mapType: action.value };
    case "SET_LATENCY":
      return { ...state, latency: action.value };
    case "A_SCORE":
      return { ...state, aScore: action.value + 1 };
    case "B_SCORE":
      return { ...state, bScore: action.value + 1 };
    case "SCORE_RESET":
      return { ...state, state: action.value };
    case "GAME_RESET":
      return { ...state, state: action.value };
    default:
      return state;
  }
}

const GameContext = createContext<{
  gameState: GameContextData;
  gameDispatch: React.Dispatch<GameAction>;
}>({
  gameState: initialState,
  gameDispatch: () => {},
});

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ gameState, gameDispatch }}>
      {children}
    </GameContext.Provider>
  );
};
