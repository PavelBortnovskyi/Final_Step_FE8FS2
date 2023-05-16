import { Link, styled } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';


const LinkLogoStyled = styled(Link)((props) => ({
    width: '50px',
    height: '50px',
    mt: '2px',
    color: '#FFF',
    '&:hover': {
        backgroundColor: 'rgb(39,51,64)',
        borderRadius: '30px',
    },
}))


export const LogoTwitter = () => {
    return (
        <LinkLogoStyled href='/' display="flex" justifyContent="center" alignItems="center">
            <TwitterIcon sx={{ fontSize: 34 }} />
        </LinkLogoStyled>
    )
}
