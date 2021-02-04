import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Content() {
    const classes = useStyles();

    return (
            <main className={classes.content}>
                    <Dashboard />
            </main>
    );
}

export default Content
