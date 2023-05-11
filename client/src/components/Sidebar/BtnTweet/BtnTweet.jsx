import { Button } from '@mui/material'
import React from 'react'

export const BtnTweet = () => {
    return (
        <Button variant="contained"
            size="large"
            sx={{
                display: {lg: 'block', xs: 'none' },
                fontSize: '20px',
                fontWeight: '800',
                width: '230px',
                height: '50px',
                
                color: '#FFFF',
                backgroundColor: 'rgb(30,155,240)',
                borderRadius: "30px",
                textTransform: 'capitalize',

                '&:hover': {
                    backgroundColor: 'rgb(26, 140, 216)'
                }
            }}
        >
            Tweet
        </Button>
    )
}
