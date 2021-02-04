import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Dashboard} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginLeft: '10px'
    },
    drawer: {
        width: 250,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 250,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}))

function SideBar() {
    const classes = useStyles();

    return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button key={'Dashboard'}>
                            <Dashboard/>
                            <ListItemText primary={'Dashboard'} className={classes.margin}/>
                        </ListItem>
                    </List>
                    <Divider/>
                </div>
            </Drawer>
    )
}

export default SideBar
