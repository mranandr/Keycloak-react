// Cancel.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Cancel: React.FC = () => {
  const history = useHistory();

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Payment Canceled
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your payment was canceled. You can try again or contact support if you have any questions.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push('/')}
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default Cancel;