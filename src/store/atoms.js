import { atom } from "recoil";

export const inputDateState = atom({
  key: "inputDateState",
  default: "",
});

export const countdownTimerState = atom({
  key: "countdownTimerState",
  default: false,
});
