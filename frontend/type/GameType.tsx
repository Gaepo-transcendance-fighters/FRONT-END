"use client";

export const gameLogOptions = {
  threshold: 0.1,
};

enum type {
  nomal,
  rank,
}

enum result {
  win,
  lose,
}

export interface IGameRecord {
  matchUserIdx: number;
  matchUserNickname: string;
  score: string;
  type: type;
  result: result;
}
