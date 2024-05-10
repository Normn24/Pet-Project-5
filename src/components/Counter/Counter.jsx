import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Counter({ incrementCounter, decrementCounter, number = 0 }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px'
    }}>
      <IconButton onClick={incrementCounter} aria-label="delete">
        <AddIcon/>
      </IconButton>
      <Typography variant={"body1"}>
        {number}
      </Typography>
      <IconButton onClick={decrementCounter} aria-label="delete">
        <RemoveIcon/>
      </IconButton>
    </Box>
  );
}

export default Counter;
