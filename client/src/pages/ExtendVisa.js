import Navbar from '../components/Navbar/Navbar';
import { Container, Grid } from '@mui/material';
import React from 'react';
import Page from 'src/components/Page';
import { AppOrderTimeline } from 'src/sections/@dashboard/app';

export default function ExtendVisa() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Navbar bgCol="#fff" colorVal="#39368a" />
      <Page title="Dashboard | AIVC">
        <Container maxWidth="xl">
          <Grid container spacing={3} style={{ marginTop: '80px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <AppOrderTimeline title="Study Visa Process" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppOrderTimeline title="Visit Visa Process" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppOrderTimeline title="Work Visa Process" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppOrderTimeline title="Spousal Visa Process" />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
}
