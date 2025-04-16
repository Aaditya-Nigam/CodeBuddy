import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../UI/Header"
import { Footer } from "../UI/Footer"
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export const AppLayout=()=>{

    

    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}