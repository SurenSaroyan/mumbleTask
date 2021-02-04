import React, {  useState} from 'react';

import {
    Button,  Dialog, DialogActions, DialogTitle, Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Salesforce from '../../services/Salesforce';

import MainContent from "./mainContent";
const initialData = {
    1: {
        pageNumber: '1 / 4',
        firstName: {
            name: 'First Name',
            type:'text',
            value: '',
        },
        lastName:  {
            name: 'Last Name',
            type:'text',
            value: '',
        },
    },
    2: {
        pageNumber: '2 / 4',
        address:  {
            name: 'Address',
            type:'text',
            value: '',
        },
        email: {
            name: 'Email',
            type:'email',
            value: '',
        },
        phoneNumber: {
            name: 'Phone Number',
            type:'text',
            value: '',
        },
    },
    3: {
        pageNumber: '3 / 4',
        company: {
            name: 'Company',
            type:'text',
            value: '',
        },
        industry: {
            name: 'Industry',
            type:'text',
            selectValues: ['Industry A','Industry B','Industry C', 'Other'],
            value: '',
        },
    },
    4: {
        pageNumber: '4 / 4',
        debtAmount: {
            name: 'Debt Amount',
            type:'text',
            range: {min:5000,max:10000},
            value: '',
        },
    }
};
const copyObject = (data) => JSON.parse(JSON.stringify(data))

function Register() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(copyObject(initialData));
    const [count, setCount] = useState(1);
    const [alert, setAlert] = useState(false);
    const { registerUser } = Salesforce


    const handleClickOpen = () => {
        setOpen(true);
    };

    const updateCount = (arg) => {
        if (arg > 0 && !checkIsEmpty()) {
                onAlert();
                return ;
        }
        setCount(prevState => prevState + arg);
    };


    const handleSubmit = async (isSubmit) => {
        if (isSubmit) {
            if (!checkIsEmpty()) {
                onAlert();
                return ;
            }
            const sendData = {}
            Object.values(formData).map(i => {
                return Object.keys(i).map(e => {
                    if (e !== 'pageNumber') sendData[e] = i[e].value
                })
            });
            await registerUser(sendData);
        }
        setFormData(copyObject(initialData));
        setOpen(false);
        setCount(1);
    }

    const onAlert = () => {
        setAlert(true);
    }

    const checkIsEmpty = () => Object.values(formData[count]).filter(i => typeof i === 'object').every(i => !(/^\s*$/.test(i.value)));


    return (
        <div >
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
               Start
            </Button>
            <Dialog open={open} onClose={() => handleSubmit(false)} aria-labelledby="form-dialog-title">
                <Snackbar open={alert} autoHideDuration={3000} onClose={() => setAlert(false)}>
                    <Alert onClose={() => setAlert(false)} severity="error">
                        Please fill all inputs!
                    </Alert>
                </Snackbar>
                <DialogTitle id="form-dialog-title">Step {formData[count].pageNumber}</DialogTitle>
                <MainContent setFormData={setFormData} formData={formData} count={count} currentData={formData[count]}/>
                <DialogActions>
                    {
                       count > 1 &&
                        <Button onClick={() => updateCount(-1)} color="primary">
                            Prev
                        </Button>
                    }
                    <Button onClick={() => handleSubmit(false)} color="primary">
                        Cancel
                    </Button>
                    {
                        count < 4 ?
                        <Button onClick={() => updateCount(1)} color="primary">
                            Next
                        </Button>
                        :
                        <Button onClick={() => handleSubmit(true)} type={"submit"} color="primary">
                            Submit
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Register
