
import { makeStyles } from '@mui/styles';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


export const MyButton = styled(Button)({
  width: '130px',
  height: '40px',
  color: '#fff',
  borderRadius: '5px',
  padding: '10px 25px',
  fontFamily: 'sans-serif',
  fontWeight: '500',
  background: 'linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)',
  cursor:' pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  display: 'inline-block',
  boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1),4px 4px 5px 0px rgba(0,0,0,.1)',
  outline: 'none',
  lineHeight: '42px',
  padding: '0',
  border: 'none',
  '&:before, &:after': {
    position: 'absolute',
    content: '""',
    right: 0,
    bottom: 0,
    background: 'rgba(2,126,251,1);',
    transition: 'all 0.3s ease',
  },
  '&:after': {
    width: 0,
    height: '2px',
  },
  '&:before': {
    width: '2px',
    height: '0',
  },
  '&:hover': {
    color: 'rgba(2,126,251,1);',
    background: 'transparent',
  },
  '&:hover:before': {
    height: '100%',
  },
  '&:hover:after': {
    width: '100%',
  },

  '& span:before, & span:after': { 
    position: 'absolute',
    content: '""',
    left: 0,
    top: 0,
    height: '100%',
    background:'rgba(2,126,251,1);',
    transition: 'all 0.3s ease',
  },
    '& span:before': {
      width: '2px',
      height: 0,
    },
    '& span:after': {
      height: '2px',
      width: 0,
    },
    '&:hover span:before': {
      height:' 100%',
    },
    '&:hover span:after': {
      width: '100%',
    }
});



export const MyButtonDelete = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});



export const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  total: {
    position: 'absolute',
    right: '0',
    padding: '0 20px'
  }
})


