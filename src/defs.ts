type BooleanEntry = {
  id: string;
  label: string;
  color: BoolDColors;
};

type Config = {
  bools: BooleanEntry[];
};

const config: Config = {
  bools: [
    {
      id: "S",
      label: "Sports",
      color: "orange",
    },
    {
      id: "C",
      label: "Cinema",
      color: "purple",
    },
    {
      id: "I",
      label: "Computer",
      color: "blue",
    },
    {
      id: "L",
      label: "Languages",
      color: "yellow",
    },
    {
      id: "P",
      label: "Philosophy",
      color: "green",
    },
    {
      id: "M",
      label: "Meditatio",
      color: "pink",
    },
  ],
};

const emptyConfig: Config = {
  bools: [],
};

const CONFIG_FILE_KEY = "Config";

const MAX_DIARY_ENTRIES = 8;

type DayInStorage = { [id: string]: boolean };
type DayInMemo = { [id: string]: { bool: boolean; color: BoolDColors } };

type S = "S" | "Sports";
type C = "C" | "Cinema";
type I = "I" | "Computer";
type L = "L" | "Languages";
type P = "P" | "Philosophy";
type M = "M" | "Mediatation";

type F = S | P | C | I | L | M;

type BoolDColors =
  | "black"
  | "white"
  | "orange"
  | "purple"
  | "blue"
  | "yellow"
  | "green"
  | "pink";

type BoolDColorsInfo = {
  twValue: string;
};

const BoolDColorsDict: { [key in BoolDColors]: BoolDColorsInfo } = {
  black: { twValue: "black" },
  white: { twValue: "white" },
  orange: { twValue: "yellow-700" },
  purple: { twValue: "purple-600" },
  blue: { twValue: "blue-400" },
  yellow: { twValue: "yellow-400" },
  green: { twValue: "green-800" },
  pink: { twValue: "pink-500" },
};

interface BoxProp {
  f: string;
  color: string;
  isDone: boolean;
  toggle: () => void;
  isEditable: boolean;
}

type Page = "days" | "settings";

export type { BooleanEntry, Config };

export { config, emptyConfig, CONFIG_FILE_KEY, MAX_DIARY_ENTRIES };

export type { DayInStorage, DayInMemo };
export type { F, S, P, C, I, L, M };
export type { BoolDColors };
export { BoolDColorsDict };
export type { BoxProp };
export type { Page };
