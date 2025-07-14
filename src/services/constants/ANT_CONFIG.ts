// src/theme/antdThemeConfig.ts
import { theme, type ThemeConfig } from "antd";
import { themeColors } from "./COLORS";

export const lightConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: themeColors.lightTheme.primary,
    colorBgBase: themeColors.lightTheme.background,
    colorTextBase: themeColors.lightTheme.dark,
  },
};

export const darkConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: themeColors.darkTheme.primary,
    colorBgBase: themeColors.darkTheme.background,
    colorTextBase: themeColors.darkTheme.dark,
  },
};
