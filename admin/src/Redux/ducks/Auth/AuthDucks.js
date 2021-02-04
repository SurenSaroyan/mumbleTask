import { createAction, createReducer} from '../../helper';
import axios from "axios";
import Cookies from 'js-cookie';
import Configs from '../../../components/Helpers/Configs'


const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_USER = 'SET_USER';

const { CORS_URL, LOGIN_URL, REDIRECT_URI, CLIENT_ID } = Configs;

export const setIsAuth = createAction(SET_IS_AUTH);

export const authReducer = createReducer(false, ( state, { value }) => ({
    [SET_IS_AUTH]: () => ({ ...state, isAuth: value })
}))

export const userReducer = createReducer({}, (state, { value }) => ({
    [SET_USER]: () => value,
}));


// function setUser(user) {
//     return (dispatch) => {
//         Cookies.set('token', user.id);
//         dispatch({ type: SET_USER, value: user });
//         dispatch(setIsAuth(true));
//     };
// }
// export function setUser(user) {
//     if (user.id){
//         return (dispatch) => {
//             Cookies.set('token', user.id);
//             dispatch({ type: SET_USER, value: user });
//             dispatch(setIsAuth(true));
//         };
//     }
// }

// export async function signIn() {
//         try {
//             const params = {
//                 response_type: 'token',
//                 client_id : CLIENT_ID,
//                 redirect_uri : REDIRECT_URI,
//                 state : 'myState'
//             }
//             const response = await axios.get(`${CORS_URL}${LOGIN_URL}`, { params });
//             return response;
//         } catch (err) {
//             console.log('AUTH ERROR ->', {err});
//         }
// }

// export function signOut() {
//     return (dispatch) => {
//         axios
//             .post(
//                 BASE_URL + '/signOut',
//                 {},
//                 {
//                     headers: {
//                         authorization: Cookies.get('token'),
//                     },
//                 }
//             )
//             .then((res) => {
//                 const { error } = res.data;
//                 if (!error) {
//                     Cookies.remove('token');
//                     dispatch(authReducer(false));
//                 } else {
//                     console.log(error);
//                 }
//             });
//     };
// }
