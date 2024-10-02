import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function BasicCard() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-200">
      <Card sx={{
        width: '100%',
        maxWidth: 600,
        borderRadius: '20px',
        boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}>
        <CardContent className="text-center p-10">
          <Typography
            sx={{ 
              fontSize: 42, 
              fontWeight: 'bold', 
              fontFamily: 'Poppins, sans-serif', 
              color: '#2c3e50' 
            }}
            variant="h2"
            gutterBottom
          >
            Welcome to Dhan Lakshmi
          </Typography>
          <Typography
            sx={{ 
              fontSize: 20, 
              color: '#7f8c8d', 
              marginBottom: 6, 
              fontFamily: 'Poppins, sans-serif'
            }}
            component="p"
          >
            Effortlessly calculate compound interest according to village rules and regulations.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              maxWidth: 220,
              padding: '14px',
              margin: '20px 0',
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '18px',
              backgroundColor: '#2980b9',
              '&:hover': {
                backgroundColor: '#3498db',
              }
            }}
            onClick={() => navigate("/Register")}
          >
            Sign Up
          </Button>

          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: '100%',
              maxWidth: 220,
              padding: '14px',
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '18px',
              color: '#2980b9',
              borderColor: '#2980b9',
              '&:hover': {
                borderColor: '#3498db',
                color: '#3498db',
              }
            }}
            onClick={() => navigate("/Login")}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default BasicCard;
