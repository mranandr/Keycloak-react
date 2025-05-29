import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  FormControlLabel,
  Switch
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { getPlans } from '../utils/subscriptionUtils';

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

export default Plans;
