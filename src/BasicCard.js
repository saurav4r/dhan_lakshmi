import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function BasicCard() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-500 to-pink-500">
      <Card
        sx={{
          width: '100%',
          maxWidth: 550,
          borderRadius: '16px',
          boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#fefefe',
          padding: '40px 30px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        }}
      >
        <CardContent className="text-center">
          {/* Title */}
          <Typography
            sx={{
              fontSize: 36,
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              color: '#2c3e50',
              marginBottom: '24px',
              background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            variant="h3"
            gutterBottom
          >
            Welcome to Dhan Lakshmi
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: 18,
              color: '#555',
              marginBottom: 3,
              fontFamily: 'Roboto, sans-serif',
              lineHeight: 1.6,
            }}
            component="p"
          >
            Calculate compound interest quickly and efficiently according to village rules and regulations.
          </Typography>

          {/* Button Group for alignment */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: '48%', // Set to occupy half the space
                padding: '12px 0',
                borderRadius: '40px',
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'none',
                background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                boxShadow: '0px 6px 12px rgba(255, 65, 108, 0.5)',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
                  boxShadow: '0px 10px 20px rgba(255, 65, 108, 0.6)',
                },
              }}
              onClick={() => navigate("/Register")}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              sx={{
                width: '48%', // Set to occupy half the space
                padding: '12px 0',
                borderRadius: '40px',
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'none',
                borderColor: '#ff416c',
                color: '#ff416c',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#ff4b2b',
                  color: '#ff4b2b',
                },
              }}
              onClick={() => navigate("/Login")}
            >
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BasicCard;
