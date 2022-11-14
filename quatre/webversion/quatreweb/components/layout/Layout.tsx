import Navbar from "../appNavbar/Navbar";
import Footer from "../Footer";

function Layout({
    toggleMode, 
    setPageRef, 
    setmessage,
    children
}) {
    // const { isAuthenticated } = useMoralis();
    return(
        <main>
            <Navbar 
                toggleMode={toggleMode} 
                setPageRef={setPageRef}
                setmessage={setmessage}
            />
            {children}
            <Footer/>
        </main>
    )
} 

export default Layout;


// import Navbar from "../appNavbar/Navbar";
// import Footer from "../Footer";
// import { useMoralis } from "react-moralis";

// function Layout({children, pageRef, setNetworkObject}) {
//     const { isAuthenticated } = useMoralis();
//     return(
//         <main>
//             { <Navbar selected={pageRef} setNetworkObject={setNetworkObject}/> }
//             {children}
//             <Footer/>
//         </main>
//     )
// } 

// export default Layout;
