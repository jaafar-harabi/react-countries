import React from 'react';
import { Box, Typography } from '@mui/material';



export default function Notfound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight:'500px'
        
      }}
    >
      <Typography variant="h1" >
        404 not found 
      </Typography>
    </Box>
  );
}