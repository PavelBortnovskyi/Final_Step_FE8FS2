import { Button } from '@mui/material'
import React from 'react'

export const BtnTweet = () => {
    return (
        <Button variant="contained"
            size="large"
            sx={{
                fontSize: '20px',
                fontWeight: '700',
                width: '230px',
                height: '50px',
                marginTop: '20px',
                marginLeft: '10px',
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
