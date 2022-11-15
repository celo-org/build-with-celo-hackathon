import { createContext, useContext, useState } from "react";

const NavigationContext = createContext({ userData: "", setUserData: null });

export function UseContextProvider({ children }) {
  const [userData, setUserData] = useState("");

  return (
    <NavigationContext.Provider value={{ userData, setUserData }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const { userData, setUserData } = useContext(NavigationContext);

  return { userData, setUserData };
}