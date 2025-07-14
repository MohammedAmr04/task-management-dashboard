import { ConfigProvider } from "antd";
import React, { type ReactNode } from "react";
import { useDarkLight } from "./DarkLightProvider";
import { darkConfig, lightConfig } from "../constants/ANT_CONFIG";

type Props = {
  children: ReactNode;
};

const AntDProvider: React.FC<Props> = ({ children }) => {
  const { IsDark } = useDarkLight();

  return (
    <ConfigProvider theme={IsDark ? darkConfig : lightConfig}>
      {children}
    </ConfigProvider>
  );
};

export default AntDProvider;
