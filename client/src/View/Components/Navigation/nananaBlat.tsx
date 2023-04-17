import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../logo/Logo'
import LinksOfMav from './LinksOfMav';
import AdminBtn from './AdminBtn';

const linksForUser = [
    { link: "", title: "Fav Quizes" },
    { link: "", title: "Statistic" },
    { link: "/profile/1", title: "Profile" },
]
const NananaBlat = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" color="transparent">
            <Container>
                <Toolbar>
                    <Typography sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                        <Link to="/" className="homePagebtn">
                            <Logo />
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem>
                                <AdminBtn />
                            </MenuItem>
                            {
                                linksForUser.map((link, index) => (
                                    <MenuItem>
                                        <LinksOfMav key={index} link={link.link} title={link.title} />
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                    <Typography sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                        <Link to="/" className="homePagebtn">
                            <Logo />
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItem>
                            <AdminBtn />
                        </MenuItem>
                        {
                            linksForUser.map((link, index) => (
                                <MenuItem>
                                    <LinksOfMav key={index} link={link.link} title={link.title} />
                                </MenuItem>
                            ))
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NananaBlat
