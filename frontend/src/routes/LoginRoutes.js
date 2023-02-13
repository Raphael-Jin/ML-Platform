import React, { lazy } from 'react';

// // project imports
import GuestGuard from './../utils/route-guard/GuestGuard';
import MinimalLayout from './../layout/MinimalLayout';
import NavMotion from './../layout/NavMotion';
import Loadable from '../ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('../views/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('../views/authentication/register')));

// //-----------------------|| AUTH ROUTING ||-----------------------//

const LoginRoutes = {
    path: '/',
    element: (
        <MinimalLayout>
            <NavMotion>
                <GuestGuard>
                </GuestGuard>
            </NavMotion>
        </MinimalLayout>
    ),
    children:[
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },

    ]
};

export default LoginRoutes;
