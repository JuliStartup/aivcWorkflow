import { Card, Container, Grid } from '@mui/material';
import React from 'react';
import Navbar from 'src/components/Navbar/Navbar';
import Page from 'src/components/Page';
import UploadMissingDocs from 'src/components/StepForm/UploadDocs/UploadMissingDocs';

export default function MissingDocs() {
  return (
    <div style={{ height: '100vh' }}>
      <Navbar isClient="true" />
      <Page title="Dashboard | AIVC">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Card>
                <UploadMissingDocs />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
}
