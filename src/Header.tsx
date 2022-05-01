import React from "react";
import BackIcon from "./BackIcon";
import { Page } from "./defs";
import SettingsIcon from "./SettingsIcon";

const TITLE = "BOOLEAN DIARY";

interface HeaderProps {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}

const Header = ({ page, setPage }: HeaderProps) => (
  <>
    <div className="w-full p-8 flex row-reverse justify-center relative">
      <h1 className="font-bold tracking-widest">{TITLE}</h1>
      {page === "days" ? (
        <button
          className="absolute right-10"
          onClick={() => setPage("settings")}
        >
          <SettingsIcon />
        </button>
      ) : (
        <button className="absolute left-10" onClick={() => setPage("days")}>
          <BackIcon />
        </button>
      )}
    </div>
  </>
);

export default Header;
