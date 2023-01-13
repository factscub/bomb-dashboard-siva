import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Table } from '../../../components/Table/Table';
import useAllBombs from '../../../hooks/useAllBombs';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import CountUp from 'react-countup';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import { BombFinanceSummaryProps } from '../type';

const BombFinanceSummary: React.FC<BombFinanceSummaryProps> = (boxStyles ) => {
  const bombsArray = useAllBombs();
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const cashStat = useCashPriceInEstimatedTWAP();
  const TVL = useTotalValueLocked();
  const cashPrice = useCashPriceInLastTWAP();

  const liveTWAP = React.useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(2) : null), [cashStat]);

  const lastTWAP = React.useMemo(() => (cashPrice ? Number(cashPrice) : null), [cashPrice]);

  return (
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
            Last Epoch TWAP: <span style={{ color: '#00E8A2' }}>{(Number(lastTWAP) / 100000000000000).toFixed(2)}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BombFinanceSummary;
