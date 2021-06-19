import React from 'react'
import useStyles from './style'
import {AppBar,Toolbar,Typography,IconButton,AccountCircle,InputBase,Badge,NotificationIcon,MoreIcon} from '@material-ui/core'
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import logo from './logo.png'

function NavBar() {

    const classes = useStyles()

    return (
        <div className={classes.grow}>
         <AppBar position="static" color='primary'>
             <Toolbar>
                 <IconButton
                 edge="start"
                 className = {classes.menuButton}
                 color='inherit'
                 aria-label='open drawer'>
                 <img src={logo} alt='logo' width='50' height='50' />
                     
                </IconButton>

              <Typography className={classes.title} variant='h6' noWrap>
                  Social Media App
                  </Typography>  
                     

          



          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton className={classes.icon} aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <HomeIcon/>
              </Badge>
            </IconButton>
            <IconButton className={classes.icon} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <AccountCircleRoundedIcon />
              </Badge>
            </IconButton>
            <IconButton
            className={classes.icon}
              edge="end"
              aria-label="account of current user"
            //   aria-controls={menuId}
              aria-haspopup="true"
              
              color="inherit"
            >
               
              <SupervisedUserCircleRoundedIcon  />
            </IconButton>
          </div>



          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> 
          <IconButton aria-label="show 17 new notifications" color="inherit">
              
                <AccountCircleRoundedIcon />
             
            </IconButton>


           </Toolbar>
         </AppBar>
            
        </div>
    )
}

export default NavBar
