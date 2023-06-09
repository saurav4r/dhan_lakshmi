import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


function BasicCard() {

  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 500, minHeight: 300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 35 }} variant="h2" color="black" gutterBottom>
          Welcome To Dhan lakshimi
        </Typography>
        
        <br></br>

        <Typography sx={{ fontSize: 20 }} component="div">
          where you calculate compound interst
        </Typography>

        <br></br>
        <br></br>

        <Button variant="contained" sx={{maxWidth:200,padding:2}} onClick={() => {
          navigate("/Register")
        }}>
          signup
        </Button>

        <br></br>
        <br></br>

        <Button variant="contained" sx={{maxWidth:200,padding:2}} onClick={() => {
          navigate("/Login")
        }}>
          SignIn
        </Button>

      </CardContent>

    </Card>
  );
}

export default BasicCard;
