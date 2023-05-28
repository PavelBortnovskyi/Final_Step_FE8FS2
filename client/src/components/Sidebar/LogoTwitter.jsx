import { Link, styled } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';


const LinkLogoStyled = styled(Link)(({theme}) => ({
    width: '50px',
    height: '50px',
    mt: '2px',
    color: `${theme.palette.logo.main}`,
    '&:hover': {
        backgroundColor: `${theme.palette.background.hover}`,
        borderRadius: '30px',
    },
}))




export const LogoTwitter = () => {

    return (
        <LinkLogoStyled to='/' underline="none" component={NavLink} display="flex" justifyContent="center" alignItems="center">
            <TwitterIcon sx={{ fontSize: 34 }} />
        </LinkLogoStyled>
    )
}
