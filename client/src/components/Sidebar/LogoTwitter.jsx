import { Link, styled } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';
import { useTheme } from '@emotion/react';





export const LogoTwitter = () => {
const theme = useTheme();


    const LinkLogoStyled = styled(Link)((props) => ({
        width: '50px',
        height: '50px',
        mt: '2px',
        color: `${theme.palette.logo.main}`,
        '&:hover': {
            // backgroundColor: 'rgb(39,51,64)',
            backgroundColor: `${theme.palette.background.hover}`,
            borderRadius: '30px',
        },
    }))


    return (
        <LinkLogoStyled href='/' display="flex" justifyContent="center" alignItems="center">
            <TwitterIcon sx={{ fontSize: 34 }} />
        </LinkLogoStyled>
    )
}
