import { AUTH_URL } from '../constants';

export const getNestClientID = () => process.env.NEST_CLIENT_ID;

// export const getRedirectUrl = () => 'https%3A%2F%2Flocalhost%3A8443%2Fnest%2Fauth';
export const getRedirectUrl = () => process.env.HOME_DASH_NEST_REDIRECT_URL;

// TODO: Fix STATE
export const getNestAuthUrl = () => `${AUTH_URL}?client_id=${getNestClientID()}&state=STATE&redirect_uri=${getRedirectUrl()}`;
