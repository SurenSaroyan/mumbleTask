import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Edit, Save, Cancel, Delete} from '@material-ui/icons';
import {TableHead, TableRow, Snackbar, Paper, Table, TableBody, TableCell, TableContainer} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import { getLeads, updateLeads } from '../../../services/Salesforce/index';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    contentSize: {
        margin: '74px 10px 0 10px',
        width: '100%',
    },
    buttonRules: {
        marginRight: '5px',
        cursor: 'pointer'
    },
    disabledButton: {
        marginRight: '5px',
        cursor: 'not-allowed'
    },
    activeRow: {
        backgroundColor: 'rgba(99, 167, 236, 0.4)'
    },
    smallInput: {
        width: '100px'
    }
});


const rowsInitial = [];

function Dashboard() {
    const classes = useStyles();
    const [rowEdit, setRowEdit] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [rows, setRows] = useState(rowsInitial);
    const [alert, setAlert] = useState(false);


    useEffect(() => {
        getLeads().then((leads) => {
            setRows(leads);
        })
    }, [])


    const onEdit = (id, row) => {
        setRowEdit(id);
        setRowData(row);
    }

    const onSave = async () => {
        // ToDo: send Data
        await updateLeads(rowData);
        const leads = await getLeads()
        setRows(leads);
        setAlert(false);
        setRowEdit(null);
    }

    const onAlert = () => {
        setAlert(true);
    }

    const onCancel = () => {
        setRowData(null);
        setRowEdit(null);
        setAlert(false);
    }

    const onChangeInput = ({name, value}) => {
        setRowData({...rowData, [name]: value})
    }

    return (
        <div className={classes.contentSize}>
            <Snackbar open={alert} autoHideDuration={3000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="error">
                    Please press Save or Close buttons!
                </Alert>
            </Snackbar>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell align="left">Created At</TableCell>
                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Company</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone Number</TableCell>
                            <TableCell align="left">Debt Amount</TableCell>
                            <TableCell align="left">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length && rows.map((row) => {

                            const {id, createdAt, firstName, lastName,company, address, email, phoneNumber, debtAmount} = row;
                            const active = id === rowEdit;
                            return (
                                <TableRow key={id} className={active && classes.activeRow}>
                                    <TableCell component="th" scope="row">
                                        {id}
                                    </TableCell>
                                    <TableCell align="left"> {createdAt}</TableCell>
                                    <TableCell align="left">{active ?
                                        <input
                                            name='firstName'
                                            onChange={(e) => onChangeInput(e.target)}
                                            value={rowData.firstName}
                                            className={classes.smallInput}
                                        /> : firstName}</TableCell>
                                    <TableCell align="left">{active ? <input
                                        name='lastName'
                                        onChange={(e) => onChangeInput(e.target)}
                                        value={rowData.lastName}
                                        className={classes.smallInput}
                                    /> : lastName}</TableCell>
                                    <TableCell align="left">{active ? <input
                                        name='lastName'
                                        onChange={(e) => onChangeInput(e.target)}
                                        value={rowData.company}
                                        className={classes.smallInput}
                                    /> : company}</TableCell>
                                    <TableCell align="left">{active ? <input
                                        name='address'
                                        onChange={(e) => onChangeInput(e.target)}
                                        value={rowData.address}
                                        className={classes.smallInput}
                                    /> : address}</TableCell>
                                    <TableCell align="left">{active ? <input
                                        name='email'
                                        onChange={(e) => onChangeInput(e.target)}
                                        value={rowData.email}
                                        className={classes.smallInput}
                                    /> : email}</TableCell>
                                    <TableCell align="left">{active ?
                                        <input
                                            name='phoneNumber'
                                            onChange={(e) => onChangeInput(e.target)}
                                            value={rowData.phoneNumber}
                                            className={classes.smallInput}
                                        /> : phoneNumber}</TableCell>
                                    <TableCell align="left">{active ?
                                        <input
                                            name='phoneNumber'
                                            onChange={(e) => onChangeInput(e.target)}
                                            value={rowData.debtAmount}
                                            className={classes.smallInput}
                                        /> : debtAmount}</TableCell>
                                    <TableCell align="left">
                                    <span onClick={() => rowEdit ?
                                        onAlert()
                                        : onEdit(id, row)}
                                          className={rowEdit ? classes.disabledButton : classes.buttonRules}>
                                        <Edit
                                            color={rowEdit && active ? "secondary" : (rowEdit ? 'disabled' : 'primary')}/>
                                    </span>
                                        <span onClick={active && onSave}
                                              className={rowEdit && active ? classes.buttonRules : classes.disabledButton}>
                                        <Save style={{color: `${active ? 'green' : 'grey'}`}}/>
                                    </span>
                                        <span onClick={active && onCancel}
                                              className={rowEdit && active ? classes.buttonRules : classes.disabledButton}>
                                        <Cancel color={active ? "secondary" : "disabled"}/>
                                    </span>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Dashboard
