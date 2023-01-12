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
import BoxHeading from '../../components/BoxHeading';

import bshareIcon from '../../assets/img/bshares.png';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import { getDisplayBalance } from '../../utils/formatBalance';
import useBoardroomTVL from '../../hooks/useBoardroomTVL';
import { roundAndFormatNumber } from '../../0x';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useBombStats from '../../hooks/useBombStats';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useBombFinance from '../../hooks/useBombFinance';
import BombDetails from '../../components/BombDetails';
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
  const totalStaked = useTotalStakedOnBoardroom();
  const boardroomTVL = useBoardroomTVL();
  const boardroomAPR = useFetchBoardroomAPR();

  const bombStats = useBombStats();
  const boardroomEarnings = useEarningsOnBoardroom();
  const boardroomBombTokenPriceInDollars = React.useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const boardroomEarnedInDollars = (
    Number(boardroomBombTokenPriceInDollars) * Number(getDisplayBalance(boardroomEarnings))
  ).toFixed(2);

  const bombFinance = useBombFinance();
  const boardroomStakedBalance = useStakedBalanceOnBoardroom();
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  const boardroomBshareTokenPriceInDollars = React.useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(boardroomStakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, boardroomStakedBalance],
  );

  const liveTWAP = React.useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(2) : null), [cashStat]);
  const lastTWAP = React.useMemo(() => (cashPrice ? Number(cashPrice) : null), [cashPrice]);
  const boardroomDailyReturns = React.useMemo(
    () => (boardroomAPR ? Number(boardroomAPR / 365).toFixed(1) : null),
    [boardroomAPR],
  );

  // console.log(boardroomDailyReturns);

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
        <Box
          style={{
            ...boxStyles,
            border: 0,
            background: 'transparent',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box style={{ width: '60%', textAlign: 'center' }}>
            <Typography style={{ textAlign: 'right' }}>
              <a style={{ color: '#9EE6FF' }} href="/">
                Read Investment Strategy
              </a>
            </Typography>
            <Typography
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: 'white',
                margin: '10px 0',
                background:
                  'radial-gradient(59345.13% 4094144349.28% at 39511.5% -2722397851.45%, rgba(0, 245, 171, 0.5) 0%, rgba(0, 173, 232, 0.5) 100%)',
              }}
            >
              Invest Now
            </Typography>
            <Box display="flex" justifyContent="space-between">
              {' '}
              <Typography style={{ width: '48%', background: 'blue' }}>df</Typography>
              <Typography style={{ width: '48%', background: 'blue' }}>df</Typography>
            </Box>

            {/* Boardroom box */}
            <Box style={{ ...boxStyles }}>
              <BoxHeading
                heading="Boardroom"
                description="Stake BSHARE and earn BOMB every epoch"
                icon={bshareIcon}
                showWrapper={true}
                tvl={roundAndFormatNumber(Number(boardroomTVL), 0)}
              />
              <Typography style={{ display: 'flex', justifyContent: 'flex-end', padding: 5 }}>
                Total Staked:{' '}
                <Box style={{ width: 20 }}>
                  <img style={{ maxWidth: '100%' }} src={bshareIcon} alt="img" />
                </Box>{' '}
                {Number(getDisplayBalance(totalStaked)).toFixed(0)}
              </Typography>

              {/* boardroom bombdetails */}
              <BombDetails
                dailyReturns={Number(boardroomDailyReturns)}
                stake={boardroomStakedBalance}
                stakedInDollars={Number(boardroomBshareTokenPriceInDollars)}
                earned={boardroomEarnings}
                earnedInDollars={Number(boardroomEarnedInDollars)}
                stakeIcon="BSHARE"
                earnedIcon="BOMB"
              />
            </Box>
          </Box>

          {/* Empty box for latest news */}
          <Box style={{ ...boxStyles, padding: '10px 20px', width: '35%' }}>
            <Typography>Latest News</Typography>
          </Box>
        </Box>

        {/* third box */}
        <Box style={boxStyles}></Box>

        {/* forth box */}
        <Box style={boxStyles}></Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
