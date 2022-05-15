// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <div>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography data-testid="chatbot-header" variant="h4">Hi, You can start chatting here!</Typography>
        </Box>
      </Container>
    </div>
  );
}
