import React from "react";
import BackIcon from "./BackIcon";
import { Page } from "./defs";
import SettingsIcon from "./SettingsIcon";
import { Routes, Route } from "react-router-dom";

const TITLE = "BOOLEAN DIARY";

interface HeaderProps {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}

const Header = ({ page, setPage }: HeaderProps) => (
  <>
    <div className="w-full p-8 flex row-reverse justify-center relative">
      <h1 className="font-bold tracking-widest">{TITLE}</h1>
      <Routes>
        <Route
          path="/"
          element={
            <button
              className="absolute left-10"
              onClick={() => setPage("days")}
            >
              <BackIcon />
            </button>
          }
        />
        <Route
          path="/days"
          element={
            <button
              className="absolute right-10"
              onClick={() => setPage("settings")}
            >
              <SettingsIcon />
            </button>
          }
        />
      </Routes>
    </div>
  </>
);

export default Header;
