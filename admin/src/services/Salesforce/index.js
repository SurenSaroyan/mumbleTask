import axios from 'axios';
import Cookies from 'js-cookie';
import Configs from "../../components/Helpers/Configs";

const { CORS_URL, SERVICE_URL, UPDATE_URL, CLIENT_ID, REDIRECT_URI, LOGIN_URL } = Configs;


const signIn = async () => {
    try {
        const params = {
            response_type: 'token',
            client_id : CLIENT_ID,
            redirect_uri : REDIRECT_URI,
            state : 'myState'
        }
        const response = await axios.get(`${CORS_URL}${LOGIN_URL}`, {
            params,
            headers: {
                "Access-Control-Allow-Origin"  : "*",
                "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
            }
        });
        return response;
    } catch (err) {
        console.log('AUTH ERROR ->', {err});
    }
}


const getLeads = async () => {
    try {
        const accessToken = Cookies.get('token');
        const query = `SELECT Id id,Email email,FirstName firstName,LastName lastName,Company company,Phone phoneNumber FROM Lead WHERE IsDeleted = false GROUP BY Id,Email,FirstName,LastName,Company,Phone`
        const data  = await axios.get(`${CORS_URL}${SERVICE_URL}q=${query}`, {
            headers: {
                Authorization:
                    `Bearer ${accessToken}`
            }
        });
        const  leads  = data.data?.records.map(i => {
            i.createdAt = '2020-01-01 16:55:10';
            i.address = 'str.';
            i.debtAmount = '1000'
            return i;
        });
        return leads
    } catch (e) {
        console.log(e);
    }
}

const updateLeads = async (formData) => {
    try {
        const accessToken = Cookies.get('token');
        // const query = `UPDATE Lead SET FirstName=${formData.firstName} WHERE Id=${formData.id}`
        const updatedData = {
            FirstName : formData.firstName,
            LastName : formData.lastName,
            Company : formData.company,
            Email : formData.email,
            Phone : formData.phoneNumber,
        }
        const data  = await axios.patch(`${CORS_URL}${UPDATE_URL}${formData.id}`, updatedData, {
            headers: {
                Authorization:
                    `Bearer ${accessToken}`
            }
        });
        console.log({data});
    } catch (e) {
        console.log({e});
    }
}

export {
    getLeads,
    updateLeads,
    signIn
}


