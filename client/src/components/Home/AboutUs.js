import { Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import { ContentStyle, RootStyle, SectionStyle } from '../../pages/Login';
import Navbar from '../Navbar/Navbar';
export default function AboutUs() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Navbar bgCol="#fff" colorVal="#39368a" />

      <RootStyle title="Login | AIVC">
        <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
          {/* <Typography color="primary" variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Our Story
          </Typography> */}
          <img src="/static/about4.png" alt="login" />
        </SectionStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack sx={{ mb: 5 }}>
              <Typography variant="h4" color="primary" sx={{ padding: '20px' }} gutterBottom>
                About Allrise Immigration & Visa Consultancy
              </Typography>
              <Typography sx={{ color: 'text.secondary', padding: '20px' }}>
                Allrise Immigration & Visa Consultancy (AIVC) is a renowned and licensed Immigration
                Consulting Firm located at Payal Business Centre in Surrey(Vancouver), BC, Canada
                offering affordable Canadian Immigration to clients across Canada with a branch
                office in Kamloops, BC serving our dear customers from Toronto, Brampton, Windsor,
                Calgary, Winnipeg, Nova Scotia, Vancouver, Kelowna, Victoria, etc. We generally help
                migrants to Settle in Canada by giving the correct guidance in a successful and
                ideal way. We work on “try us once, keep us forever policy” and with that being
                said, our vision is to Satisfy the Client by providing exceptional services at a
                competitive price in a safe and concise manner. Our company is constantly working on
                making dreams come alive for our loving clients as part of our vision deliverables.
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 3,
                display: { sm: 'none' }
              }}
            >
              gukjgv
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </div>
  );
}
