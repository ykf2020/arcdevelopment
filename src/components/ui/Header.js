import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SwipeableDrawer  from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { SelectAllRounded } from '@material-ui/icons'


function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em'
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    }
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft:'50px',
    marginRight: '25px',
    height: '45px',
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menu:{
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerIcon: {
    height:'50px',
    width: '50px',
  },
  drawerIconContainer: {
    marginLeft:'auto',
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    opacity: 1
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const theme = useTheme() // 可以拿到 default theme
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)


  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleMenuItemClick = (e,i) => {
    setAnchorEl(null)
    setOpenMenu(false)
    setSelectedIndex(i)
  }

  const menuOptions = [
    {name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0}, 
    {name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex: 1},
    {name: "Mobile App Development", link: "/mobileapps", activeIndex: 1, selectedIndex: 2},
    {name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3} 
  ]

  const routes = [
    {name: "Home", link: "/", activeIndex: 0}, 
    {name: "Services", link: "/services", activeIndex: 1}, 
    {name: "The Revolution", link: "/revolution", activeIndex: 2}, 
    {name: "About Us", link: "/about", activeIndex: 3}, 
    {name: "Contact Us", link: "/contact", activeIndex: 4}
  ]
  
  useEffect(() => {
    [...menuOptions, ...routes].forEach(route => {
      switch(window.location.pathname) {
        case `${route.link}`:
          if(value !== route.activeIndex){
            setValue(route.activeIndex)
            if(route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex)
            }
          }
          break
        default:
          break 
      }
    })
  }, [value, menuOptions, selectedIndex, routes])

  const tabs = (
    <>
      <Tabs 
        className={classes.tabContainer} 
        value={value} 
        onChange={handleChange} 
        indicatorColor="secondary">
        <Tab className={classes.tab} component={Link} to="/" label="Home" />
        <Tab 
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          className={classes.tab} 
          component={Link} 
          onMouseOver={event => handleClick(event)}
          to="/services" 
          label="Services" 
        />
        <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution" />
        <Tab className={classes.tab} component={Link} to="/about" label="About us" />
        <Tab className={classes.tab} component={Link} to="/contact" label="Contact us" />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu 
        id="simple-menu" 
        anchorEl={anchorEl} 
        open={openMenu} 
        onClose={handleClose}
        MenuListProps={{onMouseLeave: handleClose}}
        classes={{paper: classes.menu}}
        elevation={0}
      >
      {menuOptions.map((option, i) => {
        return (
          <MenuItem  
          key = {i}
          component = {Link} 
          to = {option.link}
          onClick={(e)=>{handleMenuItemClick(e, i)}}
          selected={i === selectedIndex && value === 1}
          classes = {{root: classes.menuItem}}
        >{option.name}</MenuItem>
        )
      })}
      </Menu>
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer 
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => {setOpenDrawer(false)}}
        onOpen={() => {setOpenDrawer(true)}}
        classes={{paper: classes.drawer}}
      >
        <List disablePadding>
          <ListItem 
            onClick={() => {setOpenDrawer(false); setValue(0)}} 
            divider 
            button 
            component={Link} 
            to="/"
            selected={value === 0}
          >
            <ListItemText className={value === 0 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disapleTypography>Home</ListItemText>
          </ListItem>
          <ListItem 
            onClick={() => {setOpenDrawer(false); setValue(1)}} 
            divider 
            button 
            component={Link} 
            to="/services"
            selected={value === 1}
          >
            <ListItemText className={value === 1 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disapleTypography>Services</ListItemText>
          </ListItem>
          <ListItem 
            onClick={() => {setOpenDrawer(false); setValue(2)}} 
            divider 
            button 
            component={Link} 
            to="/revolution"
            selected={value === 2}
          >
            <ListItemText className={value === 2 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disapleTypography>Revolution</ListItemText>
          </ListItem>
          <ListItem 
            onClick={() => {setOpenDrawer(false); setValue(3)}} 
            divider 
            button 
            component={Link} 
            to="/about"
            selected={value === 3}
          >
            <ListItemText className={value === 3 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disapleTypography>About</ListItemText>
          </ListItem>
          <ListItem 
            onClick={() => {setOpenDrawer(false); setValue(4)}} 
            divider 
            button 
            component={Link} 
            to="/contact"
            selected={value === 4}
          >
            <ListItemText className={value === 4 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disapleTypography>Contact us</ListItemText>
          </ListItem>
          <ListItem 
            className={classes.drawerItemEstimate} 
            onClick={() => {setOpenDrawer(false); setValue(5)}} 
            divider 
            button 
            component={Link} 
            to="/estimate"
            selected={value === 5}
          >
            <ListItemText className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disapleTypography>Free Estimate</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton 
        onClick={() => setOpenDrawer(!openDrawer)} 
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>
    </>
  )

  return(
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" >
          <Toolbar disableGutters>
            <Button disableRipple component={Link} to="/" className={classes.logoContainer} onClick={()=> setValue(0)}>
              <img src={logo} className={classes.logo}/>
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}/>
    </>
  )
}
export default Header
