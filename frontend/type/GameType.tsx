"use client";

export const gameLogOptions = {
  threshold: 0.1,
};

enum type {
  normal,
  rank,
}

export interface IGameRecord {
  matchUserIdx: number;
  matchUserNickname: string;
  score: string;
  type: type;
  result: RecordResult;
}

export enum RecordResult {
  DEFAULT = 0,
  PLAYING,
  WIN,
  LOSE,
  DONE,
  SHUTDOWN,
}

export interface IGameUserInfo {
  lose: 0;
  win: 0;
}
