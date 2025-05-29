import React from 'react';
import { Box, Stack, Button, Typography, Alert } from '@mui/material';

interface PaymentProps {
  onPay: () => void;
  isPaying: boolean;
  error?: string | null;
}

const Payment = ({ onPay, isPaying, error }: PaymentProps) => {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Payment Details
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={onPay}
          disabled={isPaying}
          size="large"
          sx={{ minWidth: 200 }}
        >
          {isPaying ? 'Processing...' : 'Proceed to Pay'}
        </Button>
      </Stack>
    </Box>
  );
};

export default Payment;
