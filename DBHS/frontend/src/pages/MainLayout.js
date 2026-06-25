import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout({ user, setUser }) {
    return (
        <>
            <Header user={user} setUser={setUser} />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;