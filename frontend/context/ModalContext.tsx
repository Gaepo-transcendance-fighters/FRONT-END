import React, { ReactElement, ReactNode, createContext } from "react";

interface ModalsProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const ModalContext = createContext<{
  open: (component: ReactElement, props: { [key: string]: string[] }) => void;
  close: (component: ReactElement) => void;
}>({
  open: () => {},
  close: () => {},
});

export const ModalStateContext = createContext<

// const ModalProvider = (children: ModalsProviderProps) => {};
