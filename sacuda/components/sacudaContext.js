import { createContext, useContext, useMemo, useState, useEffect } from "react";
export const AppContext = createContext();

export function SacudaProvider ({children}) {
    const [uMail, setUMail] = useState(null);
  
    useEffect(() => {
      // hydrate on mount
      const uMail = localStorage.getItem("uMail");
      if (uMail) {
        setUMail(uMail);
      }
    }, []);
  
    return (
      <AppContext.Provider value={{ uMail, setUMail }}>
        {children}
     </AppContext.Provider> 
    );
  }


//export default SacudaProvider;



// function getInitialState() {
//     const notes = localStorage.getItem('notes')
//     return notes ? JSON.parse(notes) : []
//   }

//   export const NoteProvider = props => {
//     const [notes, setNotes] = useState(getInitialState)
  
//     useEffect(() => {
//       localStorage.setItem('notes', JSON.stringify(notes))
//     }, [notes])
//   }


// // const SacudaProvider = (props) => {
// //     // this state will be shared with all components 
// // const [uMail, setUMail] = useState(() => {
// //     const val = localStorage.getItem('uMail');
// //     return val
// // });

// // return (
// //     <sacudaContext.Provider value={[uMail, setUMail]}>
// //         {props.children}
// //     </sacudaContext.Provider>
// // );
// // };

// // export default SacudaProvider;

// // // export function SacudaProvider({ children }) {

// // //     const [uMail, setUMail] = useState({});

// // //     useEffect(() => {
// // //         if (JSON.parse(localStorage.getItem("uMail"))) { 
        
// // //            //checking if there already is a state in localstorage
// // //            //if yes, update the current state with the stored one
// // //            dispatch({ 
// // //               type: "init_stored", 
// // //               value: JSON.parse(localStorage.getItem("uMail")),
// // //            });
// // //         }
// // //      }, []);
// // //      useEffect(() => {
// // //         if (state !== initialState) {
           
// // //            localStorage.setItem("uMail", JSON.stringify(uMail)); 
        
// // //            //create and/or set a new localstorage variable called "state"
// // //         }
// // //      }, [uMail]);





// // //     const contextValue = useMemo(() => {
// // //        return [uMail, setUMail];
// // //     }, [uMail, setUMail]);
 
// // //     return (
// // //     <AppContext.Provider value={contextValue}>
// // //        {children}
// // //     </AppContext.Provider>
// // //     );
// // //  }
 export function sacudaContext() {
    return useContext(AppContext);
 }