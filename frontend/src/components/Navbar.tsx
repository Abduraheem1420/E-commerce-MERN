import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../contex/Auth/AuthContext';
import { Badge, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Navbar() {

  const navigate = useNavigate();

  const {userName , isAuthenticated , logOut} = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () =>{
    navigate("/login");
  }

  const handleLogOut = () => {
    logOut();
    navigate("/");
    handleCloseUserMenu();
  }

  const handleCart = () =>{
    navigate("/cart");
  }
 
  return (
    <AppBar position="static">
      <Container maxWidth="xl">

        
        <Toolbar disableGutters>
            <Box sx={{display:'flex' ,
                 flexDirection : 'row' ,
                  justifyContent :'space-between' , 
                  width : '100%' ,
                  alignItems: 'center'}}>
            <Box sx={{display : 'flex' , flexDirection : 'row' , alignItems : 'center'}}>
          <AdbIcon sx={{ display: { display : 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
            }}
          >
            مشروعي
          </Typography>

         </Box>
    
          <Box sx={{ flexGrow: 0  , display : 'flex' , flexDirection : 'row'}} gap={4} alignItems={'center'} justifyContent={'space-between'}>
            
                <IconButton aria-label="cart" onClick={handleCart}>
                  <Badge badgeContent={4} color="secondary">
                    <ShoppingCart sx={{color : "#ffffff"}}/>
                  </Badge>
                </IconButton>

            {isAuthenticated ? <>
             <Tooltip title="Open settings">
              <Grid container alignItems={"center"} justifyContent={"center"} gap={2}>
                <Grid item>
              <Typography>{userName}</Typography>
              </Grid>
               <Grid item>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName || ""} src="/static/images/avatar/2.jpg" />
              </IconButton>
              </Grid>
              </Grid>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>طلباتي</Typography>
                </MenuItem>
                <MenuItem  onClick={handleLogOut}>
                  <Typography sx={{ textAlign: 'center' }}>الخروج</Typography>
                </MenuItem>
            </Menu>
            </> : <Button variant='contained' color='success' onClick={handleLogin}>سجّل</Button>}
           
          </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
