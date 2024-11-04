import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import "../styles/Layout.scss"

export default function Layout() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    )
}