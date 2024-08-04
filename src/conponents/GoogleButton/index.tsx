/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogin } from '@react-oauth/google';
import * as loginServices from '@/api/loginServices';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
const GoogleButton = () => {
    //const clientId = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID;
    const Navigate = useNavigate();
    const { setAccessToken } = useAuthStore();
    const login = useMutation({
        mutationKey: ['login'],
        mutationFn: (body: any) => loginServices.loginGoogle(body),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                setAccessToken(data.resultObj.accessToken);
                setTimeout(() => {
                    Navigate(-1);
                }, 200);
            }
        },
    });
    const loginE = async (credentialResponse: any) => {
        login.mutateAsync(credentialResponse.credential);
    };
    return (
        <GoogleLogin
            width={350}
            shape="pill"
            onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                loginE(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
};

export default GoogleButton;
