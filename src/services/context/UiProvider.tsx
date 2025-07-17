import React, { useEffect, type ReactNode } from "react";
import AntDProvider from "./AntDProvider";
import { DarkLightProvider, useDarkLight } from "./DarkLightProvider";
import { themeColors } from "../constants/COLORS";
import ReactQueryProvider from "./ReactQueryProvider";
import DndProvider from "./DndProvider";

type Props = {
  children: ReactNode;
};

const SetCSSVariables = () => {
  const { IsDark } = useDarkLight();

  useEffect(() => {
    const root = document.documentElement;
    const theme = IsDark ? themeColors.darkTheme : themeColors.lightTheme;

    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--c-${key}`, value);
    });
  }, [IsDark]);

  return null;
};

const UiProvider: React.FC<Props> = ({ children }) => {
  return (
    <DarkLightProvider>
      <SetCSSVariables />
      <AntDProvider>
        <ReactQueryProvider>
          <DndProvider>{children}</DndProvider>
        </ReactQueryProvider>
      </AntDProvider>
    </DarkLightProvider>
  );
};

export default UiProvider;
