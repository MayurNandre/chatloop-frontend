import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/color';

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"2rem"} variant='h5' textAlign={"center"} fontFamily={"monospace"} sx={{ fontSize: { xs: "1rem", sm: "1rem", md: "1.5rem" } }}>
        Select a friend to Chat
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home);
