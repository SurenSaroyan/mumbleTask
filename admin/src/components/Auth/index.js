import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../Redux/ducks/Auth/AuthDucks';

import {
    Avatar, Button,  Typography, Container, CssBaseline, TextField
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Login({signIn, authReducer}) {
    const history = useHistory();
    const [formData, setFormData] = useState({email:'', password:''});


    const onSubmit = () => {
        signIn(formData)
    }
    const inputOnChange = ({name, value}) => {
            setFormData({...formData, [name]: value})
    }

    useEffect(() =>{
        if (authReducer) {
            history.push('/dashboard')
        }

    },[history, authReducer])
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        onChange={(e) => inputOnChange(e.target)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => inputOnChange(e.target)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        autoComplete="current-password"
                    />
                    <Button
                        onClick={onSubmit}
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    )
}

const mapStateToProps = ({authReducer}) => ({authReducer});
const mapDispatchToProps = {
    signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
