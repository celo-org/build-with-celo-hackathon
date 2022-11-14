import * as React from 'react';
import {Typography, Button, Box} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface BasicAlertProps {
  message: string; 
  open: boolean; 
  setOpen: Function;
}
export default function BasicAlert(props: BasicAlertProps) {
  const { message, open, setOpen} = props;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 6000);
  }, [message]);

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={(event) => handleClose(event, message)}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(event) => handleClose(event, message)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Box sx={{width: '100%'}} className="flex justify-around">
        <Typography variant='body1' className='text-gray-500 cursor-pointer' onClick={handleClick}>{message}</Typography>
        <Typography variant='body1' className='text-gray-500'>This is Beta version. Do not use real token</Typography>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(e) => handleClose(e, message)}
        message={message}
        action={action}
      />
    </div>
  );
}
