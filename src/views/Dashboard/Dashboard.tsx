import React from 'react';
import { Box, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';

import HomeImage from '../../assets/img/background.jpg';
import Page from '../../components/Page';
import Container from '../../components/Container';
import { Table } from '../../components/Table/Table';

import useAllBombs from '../../hooks/useAllBombs';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';

import ProgressCountdown from '../Boardroom/components/ProgressCountdown';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
    font-family:Nunito ;
  }
`;

const TITLE = 'bomb.money | Dashboard';

const boxStyles = {
  backgroundColor: 'rgba(35, 40, 75, 0.75)',
  borderRadius: '10px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5.5px)',
  padding: '15px',
  border: '1px solid #728CDF',
  margin: ' 10px 0',
  color: 'white',
};

const Dashboard: React.FC = () => {
  const bombsArray = useAllBombs();
  const TVL = useTotalValueLocked();
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const cashStat = useCashPriceInEstimatedTWAP();
  const cashPrice = useCashPriceInLastTWAP();

  const liveTWAP = React.useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(2) : null), [cashStat]);
  const lastTWAP = React.useMemo(() => (cashPrice ? Number(cashPrice) : null), [cashPrice]);

  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <Container size="lg">
        {/* first box */}
        <Box style={{ ...boxStyles, border: 'none' }}>
          <Typography
            align="center"
            style={{ fontSize: 25, borderBottom: '0.5px solid rgba(195, 197, 203, 0.75)', marginBottom: 20 }}
          >
            {' '}
            Bomb Finance Summary
          </Typography>

          <Box style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
            {/* BOMB, BSHARE, BBOMD table */}
            <Table bombsArray={bombsArray} />

            {/* Latest info of EPOCH, TVL AND TWAP */}
            <Box style={{ textAlign: 'center' }}>
              <Box style={{ borderBottom: '0.5px solid rgba(195, 197, 203, 0.75)' }}>
                <Typography>Current Epoch</Typography>
                <Typography style={{ fontSize: 34, fontWeight: 700 }}>{Number(currentEpoch)}</Typography>
              </Box>

              <Box style={{ borderBottom: '0.5px solid rgba(195, 197, 203, 0.75)', margin: '0 20px', padding: 5 }}>
                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                <Typography style={{ fontSize: 34, fontWeight: 700 }}></Typography>
                <Typography>Next Epoch in</Typography>
              </Box>
              <Typography>
                Live TWAP: <span style={{ color: '#00E8A2' }}>{liveTWAP}</span>
              </Typography>
              <Typography>
                TVL:{' '}
                <span style={{ color: '#00E8A2' }}>
                  <CountUp end={Number(TVL)} separator="," prefix="$" />
                </span>
              </Typography>
              <Typography>
                Last Epoch TWAP:{' '}
                <span style={{ color: '#00E8A2' }}>{(Number(lastTWAP) / 100000000000000).toFixed(2)}</span>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* second box */}
        <Box style={boxStyles}></Box>

        {/* third box */}
        <Box style={boxStyles}></Box>

        {/* forth box */}
        <Box style={boxStyles}></Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
