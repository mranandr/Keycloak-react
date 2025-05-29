import React from 'react';
import {
  Box,
  Stack,
  Paper,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { getScanLimit, getExtraScanQuantity, getPlans, calculatePrice } from '../utils/subscriptionUtils';

interface AddOnsProps {
  selectedPlan: string | null;
  isYearly: boolean;
  extraScans: number;
  setExtraScans: React.Dispatch<React.SetStateAction<number>>;
}

const AddOns = ({ selectedPlan, isYearly, extraScans, setExtraScans }: AddOnsProps) => {
  const scanLimit = selectedPlan ? getScanLimit(selectedPlan) : 0;
  const extraScanQuantity = getExtraScanQuantity();
  const plans = getPlans();
  const plan = selectedPlan ? plans[selectedPlan as keyof typeof plans] : null;

  const getTotalScans = () => {
    if (scanLimit === -1) return "Unlimited";
    return scanLimit + (extraScans * extraScanQuantity);
  };

  const calculateTotal = () => {
    if (!selectedPlan || !plan) return 0;
    return calculatePrice(selectedPlan, isYearly, extraScans);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Paper 
          elevation={2}
          sx={{ 
            p: 3, 
            bgcolor: 'primary.light',
            borderRadius: 1,
            color: 'primary.contrastText'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <StarIcon />
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="500">
                Selected Plan: {plan?.name}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <Typography>
                  Base Price: ${isYearly ? plan?.yearlyPrice : plan?.monthlyPrice}/{isYearly ? 'year' : 'month'}
                </Typography>
                <Typography>
                  Base Scans: {scanLimit === -1 ? 'Unlimited' : `${scanLimit} scans/month`}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom fontWeight="500">
            Scan Usage Information
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Base Plan Scans
              </Typography>
              <Typography variant="body1">
                {scanLimit === -1 ? 'Unlimited' : `${scanLimit} scans/month`}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Extra Scans Added
              </Typography>
              <Typography variant="body1">
                {extraScans * extraScanQuantity} additional scans/month
              </Typography>
            </Box>

            <Divider />
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Available Scans
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight="500">
                {getTotalScans()} scans/month
              </Typography>
            </Box>

            {selectedPlan !== 'premium' && (
              <Box sx={{ 
                p: 2, 
                bgcolor: 'info.light', 
                borderRadius: 1,
                color: 'info.contrastText'
              }}>
                <Typography variant="body2">
                  💡 Need more scans? You can add blocks of {extraScanQuantity} scans below or upgrade your plan for higher base limits.
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom fontWeight="500">
            Add Extra Scans
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Button
              variant="outlined"
              onClick={() => setExtraScans(Math.max(0, extraScans - 1))}
              disabled={extraScans <= 0}
            >
              -
            </Button>
            <Typography variant="h6" sx={{ minWidth: 32, textAlign: 'center' }}>
              {extraScans}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setExtraScans(extraScans + 1)}
            >
              +
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" mt={1}>
            Each block adds {extraScanQuantity} scans/month.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom fontWeight="500">
            Total Price
          </Typography>
          <Typography variant="h4" color="secondary.main" fontWeight="bold">
            ${calculateTotal()}
            <Typography component="span" variant="subtitle1" color="text.secondary">
              /{isYearly ? 'year' : 'month'}
            </Typography>
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default AddOns;
