import { theme, type ThemeConfig } from "antd";
import { themeColors } from "./COLORS";

export const lightConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: themeColors.lightTheme.primary,
    colorTextBase: themeColors.lightTheme.text,
  },
  components: {
    Menu: {
      colorBgBase: "#fff",
    },
    Layout: {
      siderBg: "#fff",
    },
    // Input: {
    //   borderRadius: 20,
    // },
  },
};

export const darkConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: themeColors.darkTheme.primary,
    colorBgBase: themeColors.darkTheme.background,
    colorTextBase: themeColors.darkTheme.text,
  },
};
