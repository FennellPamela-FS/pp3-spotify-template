import React from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import Login from './login';

const Account = () => {
    // const { data: session, loading, status } = useSession({ required: true });
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (!session) {
        return <div>You are not logged in.</div>;
    }
    else if (status === 'authenticated') {
        return (
            <section className="grid h-screen place-items-center">
                <Login />
            </section>
        );
    }
}

export default Account;

// server-side rendering with props or destination
export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                // permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
};