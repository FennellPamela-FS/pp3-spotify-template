import React from 'react';
// import { useSession, signIn, signOut } from "next-auth/react";
import LoginPage from './loginPage';

const login = () => {

    return (
        <section className="grid h-screen place-items-center">
            <LoginPage />
        </section>
    );

}

export default login;