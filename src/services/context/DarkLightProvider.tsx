import React, {
  createContext,
  useState,
  type ReactNode,
  useMemo,
  useContext,
} from "react";

type Theme = "light" | "dark" | "system";

interface DarkLightContextType {
  dark: Theme;
  setDark: React.Dispatch<React.SetStateAction<Theme>>;
  IsDark: boolean;
}

const DarkLightContext = createContext<DarkLightContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export const DarkLightProvider: React.FC<Props> = ({ children }) => {
  const [dark, setDark] = useState<Theme>("light");

  const IsDark = useMemo(() => {
    return (
      dark === "dark" ||
      (dark === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [dark]);

  return (
    <DarkLightContext.Provider value={{ dark, setDark, IsDark }}>
      {children}
    </DarkLightContext.Provider>
  );
};

export const useDarkLight = () => {
  const context = useContext(DarkLightContext);
  if (!context) {
    throw new Error("useDarkLight must be used within a DarkLight");
  }
  return context;
};
