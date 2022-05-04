import { Box, Grid, Container, Typography, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import {
  AppWebsiteVisits,
  AppCurrentSubject,
  AppConversionRates,
  AppTotalCases,
  RetainedCases,
  RetainedCasePercent,
  CaseInProcess
} from '../sections/@dashboard/app';
import * as api from '../api/index.js';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.fetchPosts();
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <Page title="Dashboard | AIVC">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          {/* <Card
            sx={{ position: 'relative' }}
            style={{ border: '1px solid #d7dde1', margin: '10px 0' }}
          >
           {dataList &&
              posts.length(
                <>
                  <CardMedia
                    style={{
                      position: 'relative',
                      width: 'auto',
                      height: '100px',
                      backgroundColor: 'aliceblue'
                    }}
                    image={
                      posts[posts.length - 1].selectedFile ||
                      'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                    }
                    title={posts.termAgreed}
                  />
                </>
              )} 
          </Card> */}
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {data && <AppTotalCases cases={data} event="Total Cases" />}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {data && <RetainedCases cases={data} />}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {data && <RetainedCasePercent total={data.length} cases={data} />}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {data && <CaseInProcess total={data.length} cases={data} />}
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            {/* <Grid item xs={12} md={6} lg={8}> */}
            <AppWebsiteVisits />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={12}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
