import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Header = ({ setCooridantes, geoCoderRef }) => {

    const classes = useStyles();


    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title}>
                    Travel Assist
                </Typography>
                <Box style={{ display: 'flex' }}>
                    <Typography variant='h6' className={classes.title}>
                        Explore new places
                    </Typography>
                        <div id='geocoder' ref={geoCoderRef} className={classes.search}>
                            {/* <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search... ' classes={{ root: classes.inputRoot, input: classes.inputInput }} /> */}
                        </div>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;