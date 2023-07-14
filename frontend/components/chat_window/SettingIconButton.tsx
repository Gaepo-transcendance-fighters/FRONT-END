import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';


export default function IconButtons() {
  return (
    <Stack direction="row" spacing={1} >
      <IconButton color="primary" aria-label="setting">
	  	<SettingsIcon/>
      </IconButton>
    </Stack>
  );
}