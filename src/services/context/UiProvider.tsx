import React, { useEffect, type ReactNode } from "react";
import AntDProvider from "./AntDProvider";
import { DarkLightProvider, useDarkLight } from "./DarkLightProvider";
import { themeColors } from "../constants/COLORS";

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
      <AntDProvider>{children}</AntDProvider>
    </DarkLightProvider>
  );
};

export default UiProvider;
