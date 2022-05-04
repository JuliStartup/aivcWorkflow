import { Card, Container, Grid } from '@mui/material';
import React from 'react';
import Page from 'src/components/Page';
import ApplyVisa from './ApplyVisa';
import Navbar from '../components/Navbar/Navbar';

export default function ExtendVisitVisa() {
  return (
    <div style={{ height: '100vh' }}>
      <Navbar isClient="true" />
      <Page title="Dashboard | AIVC">
        <Container maxWidth="xl">
          <Grid container spacing={3} style={{}}>
            <Grid item xs={12} md={6} lg={12}>
              <Card>
                <ApplyVisa category="ExtendVisit" title="Apply to Extend Visit Visa" />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
}
