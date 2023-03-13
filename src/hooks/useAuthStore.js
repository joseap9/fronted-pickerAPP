import { useDispatch, useSelector } from "react-redux";
import pickersApi from "../api/pickersApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
/* import axios from "axios";
import { createProxyMiddleware } from 'http-proxy-middleware'; */

export const useAuthStore = () => {
    
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch(); 

    const startLogin = async({ email, password }) => {

        dispatch( onChecking );

        try {
            //metabase session token
            const tokenMetabase = await pickersApi.get('/metabase/getTokenMetabase');
            const tokenAuth = await pickersApi.post('/auth', {email, password});

            localStorage.setItem('token-metabase', tokenMetabase.data.token);
            localStorage.setItem('token', tokenAuth.data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( onLogin({ name: tokenAuth.data.nombre, uid: tokenAuth.data.uid }) );
            
        } catch (error) {
            dispatch( onLogout(' Credenciales incorrectas ') );
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10)
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await pickersApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.nombre, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }


    return {
        //* Propiedades
        errorMessage,
        status,
        user,
        //* Metodos
        startLogin,
        checkAuthToken,
        startLogout
    }
}
