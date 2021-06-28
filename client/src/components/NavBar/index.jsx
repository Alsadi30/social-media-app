import React from 'react'
import { Link , useLocation } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import useStyles from './style'
import { AppBar, Toolbar, Typography, IconButton,Menu,MenuItem, InputBase, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { ThemeProvider } from '@material-ui/styles';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import logo from './logo.png'
import { createMuiTheme } from '@material-ui/core/styles';
import { logout } from '../../store/actions/authAction'
import { blueGrey} from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary:blueGrey,
    secondary:blueGrey
  },

});





function NavBar() {

  const dispatch = useDispatch()
 

  const logOut = () => {
    dispatch(logout())
    // handleClose()
  }




  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  const handleClose = () => {
    setAnchorEl(null);
  };



  const location = useLocation()

    const classes = useStyles()
  
    const [value, setValue] = React.useState(location.pathname);  
    return (
        <ThemeProvider theme={theme} className={classes.grow}>
         <AppBar position="static" color='secondary'>
             <Toolbar>
               <Link to='/'>
                 <IconButton
                 edge="start"
                 className = {classes.menuButton}
                 color='inherit'
                 aria-label='open drawer'>
                 <img src={logo} alt='logo' width='50' height='50' />
                     
                </IconButton>
                </Link>   
              <Typography className={classes.title} variant='h6' noWrap>
                  Social Media App
                  </Typography>  
                     
                  
                



         
          <div className={classes.sectionDesktop}>
          <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
              >
             
                <BottomNavigationAction value='/'
                 component={Link} to="/" label="Home" className={classes.icon} icon={<HomeIcon />} />
                
      <BottomNavigationAction component={Link} to="/profile" label="Profile" value='/profile' className={classes.icon} icon={ <AccountCircleRoundedIcon />} />
      <BottomNavigationAction label="Subscription"  className={classes.icon} value='Subscription' icon={ <SupervisedUserCircleRoundedIcon  />} />
    </BottomNavigation>
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
              
                <MoreVertIcon onClick={handleClick} />
             
            </IconButton>
            <Menu
             id="simple-menu"
             anchorEl={anchorEl}
             keepMounted
             open={Boolean(anchorEl)}
            onClose={handleClose}
      >
           <MenuItem onClick={logOut}>Logout</MenuItem>
           <MenuItem to='/profile' component={Link} onClick={handleClose} > Profile </MenuItem>
      </Menu>


           </Toolbar>
         </AppBar>
            
        </ThemeProvider>
    )
}

export default NavBar
