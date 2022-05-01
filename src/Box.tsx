import React from "react";
import { BoxProp, BoolDColorsDict as Colors } from "./defs";

export const Box: React.FC<BoxProp> = ({
  f,
  color,
  isDone,
  toggle,
  isEditable,
}) => {
  const borderColor = `border-${isDone ? color : Colors.black.twValue}`;
  const bgColor = `bg-${isDone ? color : Colors.white.twValue}`;
  const textColor = `text-${isDone ? Colors.white.twValue : color}`;

  const borderClasses = isEditable ? `border-4 ${borderColor}  ` : "";
  return (
    <button
      onClick={toggle}
      disabled={!isEditable}
      className={`md:w-16 w-8 md:h-16 h-8 mx-2 ${borderClasses}font-bold rounded-lg ${bgColor} ${textColor}`}
    >
      {f}
    </button>
  );
};
