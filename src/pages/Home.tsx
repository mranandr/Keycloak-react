import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
 
  Checkbox,
  Stack,
  TextField,
  CircularProgress
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import {
  getPlans,
  getAddOns,
  calculatePrice,
  getScanLimit,
  getPlanFeatures,
  getExtraScanQuantity
} from '../utils/subscriptionUtils';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51RKGUkFL6Lx5OedXQNYsMgHTAhv1OHIOtFZS47LyF4WBQO1u4srGGwta1OYQJ8TYAHeDGaxgAyWpFiXyjJbzkyLK008wvwS0Wj');


interface PlansProps {
  onPlanSelect: (plan: string | null) => void;
  selectedPlan: string | null;
  onIsYearlyChange: (yearly: boolean) => void;
}

const Plans = ({ onPlanSelect, selectedPlan, onIsYearlyChange }: PlansProps) => {
  const [isYearly, setIsYearly] = useState(false);
  const plans = getPlans();

  const handleYearlyToggle = (checked: boolean) => {
    setIsYearly(checked);
    onIsYearlyChange(checked);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Choose Your Plan
        </Typography>
        
        <Box sx={{ 
          bgcolor: 'primary.light', 
          p: 1.5, 
          borderRadius: 2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1
        }}>
          <LocalOfferIcon />
          <FormControlLabel
            control={
              <Switch
                checked={isYearly}
                onChange={(e) => handleYearlyToggle(e.target.checked)}
              />
            }
            label={
              <Typography fontWeight="medium">
                {isYearly ? 'Annual (Save 16%)' : 'Monthly'}
              </Typography>
            }
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          justifyContent: 'center'
        }}>
          {Object.entries(plans).map(([key, plan]) => (
            <Card
              key={key}
              sx={{
                flex: { xs: '1', md: '0 1 350px' },
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'all 0.3s ease',
                transform: plan.highlight ? 'scale(1.02)' : 'none',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                },
                ...(selectedPlan === key && {
                  border: '2px solid',
                  borderColor: 'primary.main',
                }),
                ...(plan.highlight && {
                  border: '2px solid',
                  borderColor: 'secondary.main',
                })
              }}
            >
              {plan.highlight && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 20,
                    transform: 'translateY(-50%)',
                    bgcolor: 'secondary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}
                >
                  POPULAR
                </Box>
              )}
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  <Typography variant="subtitle1" component="span" color="text.secondary">
                    /{isYearly ? 'year' : 'month'}
                  </Typography>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List disablePadding>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 1 }} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature}
                        primaryTypographyProps={{
                          fontSize: '0.95rem'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <Button 
                  fullWidth 
                  size="large"
                  variant={selectedPlan === key ? "contained" : "outlined"}
                  onClick={() => onPlanSelect(key)}
                  sx={{ 
                    py: 1.5,
                    ...(plan.highlight && {
                      bgcolor: selectedPlan === key ? 'secondary.main' : 'transparent',
                      borderColor: 'secondary.main',
                      color: selectedPlan === key ? 'white' : 'secondary.main',
                      '&:hover': {
                        bgcolor: 'secondary.main',
                        color: 'white'
                      }
                    })
                  }}
                >
                  {selectedPlan === key ? 'Selected' : 'Select Plan'}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

const AddOns = ({ selectedPlan, isYearly, extraScans, setExtraScans }: { selectedPlan: string | null, isYearly: boolean, extraScans: number, setExtraScans: React.Dispatch<React.SetStateAction<number>> }) => {
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
        {/* Selected Plan Summary */}
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

        {/* Scan Usage Information */}
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

        {/* Extra Scans Section */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom fontWeight="500">
            Add Extra Scans
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            bgcolor: 'grey.50',
            p: 2,
            borderRadius: 1
          }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setExtraScans(prev => Math.max(0, prev - 1))}
              disabled={extraScans === 0}
            >
              -
            </Button>
            <Typography sx={{ flex: 1 }}>
              {extraScans} blocks of {extraScanQuantity} scans
            </Typography>
            <Typography color="primary.main" fontWeight="500">
              +${(extraScans * (isYearly ? 49.99 : 4.99)).toFixed(2)}/{isYearly ? 'year' : 'month'}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setExtraScans(prev => prev + 1)}
            >
              +
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Each block adds {extraScanQuantity} scans to your monthly limit
          </Typography>
        </Paper>

        {/* Total Summary */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 3,
            bgcolor: 'success.light',
            borderRadius: 1
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="500">
            Total Summary
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Base Plan</Typography>
              <Typography>${isYearly ? plan?.yearlyPrice : plan?.monthlyPrice}/{isYearly ? 'year' : 'month'}</Typography>
            </Box>
            {extraScans > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Extra Scans ({extraScans * extraScanQuantity} scans)</Typography>
                <Typography>
                  +${(extraScans * (isYearly ? 49.99 : 4.99)).toFixed(2)}/{isYearly ? 'year' : 'month'}
                </Typography>
              </Box>
            )}
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="500">Total</Typography>
              <Typography variant="h6" fontWeight="500">
                ${calculateTotal()}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

interface PaymentProps {
  totalAmount: number;
  handleCheckout: () => Promise<void>;
}

const Payment: React.FC<PaymentProps> = ({ totalAmount, handleCheckout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await handleCheckout();
    } catch (error) {
      console.error('Payment error:', error);
      setError(
        error instanceof Error 
          ? `Payment failed: ${error.message}`
          : 'An unexpected error occurred during payment'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Amount: ${totalAmount.toFixed(2)}
      </Typography>
      {error && (
        <Box sx={{ 
          mb: 2, 
          p: 2, 
          bgcolor: 'error.light', 
          borderRadius: 1,
          color: 'error.contrastText'
        }}>
          <Typography variant="body2">
            {error}
          </Typography>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            <Typography>Processing...</Typography>
          </Box>
        ) : (
          'Proceed to Checkout'
        )}
      </Button>
    </Box>
  );
};

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [extraScans, setExtraScans] = useState<number>(0);
  const steps = ['Plans', 'Add-ons', 'Payment'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    if (activeStep === 1) {
      // Create JSON object with all information
      const jsonData = {
        scanInformation: {
          selectedPlan,
          isYearly,
          extraScans,
          totalScans: getTotalScans(),
        },
        amountSummary: calculateTotalAmount(),
      };
      console.log('All Information:', jsonData);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const calculateTotalAmount = () => {
    if (!selectedPlan) return 0;
    const plans = getPlans();
    const plan = plans[selectedPlan as keyof typeof plans];
    const basePrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const extraScanPrice = extraScans * (isYearly ? 49.99 : 4.99);
    return basePrice + extraScanPrice;
  };

  const getTotalScans = () => {
    const scanLimit = selectedPlan ? getScanLimit(selectedPlan) : 0;
    const extraScanQuantity = getExtraScanQuantity();
    if (scanLimit === -1) return "Unlimited";
    return scanLimit + (extraScans * extraScanQuantity);
  };

  localStorage.setItem('emailId', 'aravindece9047@gmail.com');
  const currentUser = localStorage.getItem('emailId');
console.log(currentUser); // Outputs: 'user@example.com'


  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Stripe failed to initialize');
      return;
    }

    try {
      console.log('Creating checkout session with data:', {
        currentUser,
        plan: selectedPlan,
        isYearly,
        extraScans,
        totalScans: getTotalScans(),
        totalAmount: calculateTotalAmount(),
      });

      const response = await fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUser,
          plan: selectedPlan,
          isYearly,
          extraScans,
          totalScans: getTotalScans(),
          totalAmount: calculateTotalAmount(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const session = await response.json();
      console.log('Received session:', session);

      if (!session.url) {
        throw new Error('No checkout URL received from server');
      }

      localStorage.setItem('currentSessionId', session.id);
      window.location.href = session.url;
      

    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  };


  const handleIsYearlyChange = (yearly: boolean) => {
    setIsYearly(yearly);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Plans 
            onPlanSelect={setSelectedPlan} 
            selectedPlan={selectedPlan}
            onIsYearlyChange={handleIsYearlyChange}
          />
        );
      case 1:
        return (
          <AddOns 
            selectedPlan={selectedPlan}
            isYearly={isYearly}
            extraScans={extraScans}
            setExtraScans={setExtraScans}
          />
        );
      case 2:
        return (
          <Payment
            totalAmount={calculateTotalAmount()}
            handleCheckout={handleCheckout}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return selectedPlan === null;
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 4 }}>
          {activeStep === steps.length ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                All steps completed!
              </Typography>
              <Button
                onClick={() => {
                  setActiveStep(0);
                  setSelectedPlan(null);
                  setExtraScans(0);
                }}
                sx={{ mt: 2 }}
                variant="contained"
              >
                Start Over
              </Button>
            </Box>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;




