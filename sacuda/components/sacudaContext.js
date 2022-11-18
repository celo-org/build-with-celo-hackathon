import { createContext, useContext, useMemo, useState, useEffect } from "react";
export const AppContext = createContext();

export function SacudaProvider ({children}) {
    const [uMail, setUMail] = useState(null);
    const [uProfile, setUProfile] = useState(null);
  
    useEffect(() => {
      const uMail = localStorage.getItem("uMail");
      if (uMail) {
        setUMail(uMail);
      }
    }, []);

    useEffect(() => {
      const uProfile = localStorage.getItem("uProfile");
      if (uProfile) {
        setUProfile(uProfile);
      }
    }, []);
  
    return (
      <AppContext.Provider value={{ uMail, setUMail , uProfile, setUProfile}}>
        {children}
     </AppContext.Provider> 
    );
  }

 export function SacudaContext() {
    return useContext(AppContext);
 }