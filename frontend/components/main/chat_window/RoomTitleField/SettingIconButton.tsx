import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useState,forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import { Modal, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import EditRoomModal from './EditRoomModal';

const Bar = forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

export default function IconButtons() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

  return (
    <Stack direction="row" spacing={1} >
      <IconButton color="primary" aria-label="setting" onClick={handleOpen}>
	  	  <SettingsIcon/>
      </IconButton>
      <Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					>
            <Bar>
              <EditRoomModal prop={handleClose}/>
            </Bar>
						{/* <Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
							Text in a modal
							</Typography>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
							</Typography>
				  	</Box> */}
			</Modal>
    </Stack>
  );
}