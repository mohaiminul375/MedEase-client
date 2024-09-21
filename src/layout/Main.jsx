import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";


const Main = () => {
    return (
        <div className="font-inter">
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-300px)] md:max-w-7xl mx-auto">    
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;