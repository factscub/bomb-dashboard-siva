import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { getDisplayBalance } from '../../utils/formatBalance';
import { BigNumber } from 'ethers';
import TokenSymbol from '../TokenSymbol';
type BombDetails = {
  dailyReturns: number;
  stake: BigNumber;
  stakedInDollars: number;
  stakeIcon: string;
  earned: BigNumber;
  earnedIcon: string;
  earnedInDollars: number;
};

const BombDetails: React.FC<BombDetails> = ({
  dailyReturns,
  stake,
  stakedInDollars,
  stakeIcon,
  earned,
  earnedIcon,
  earnedInDollars,
}) => {
  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Details box */}
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Daily returns box */}
        <Box style={{marginRight:30}}>
          <Typography>Daily Returns:</Typography>
          <Typography>{dailyReturns} %</Typography>
        </Box>

        {/* your stake box */}
        <Box style={{marginRight:30}}>
          <Typography>Your Stake:</Typography>
          <Box style={{ display: 'flex' }}>
            <TokenSymbol symbol={stakeIcon} size={16} />{' '}
            {/* <img style={{ width: 16, height: 16 }} src={stakeIcon} alt="img" /> */}
            <Typography>{getDisplayBalance(stake)}</Typography>
          </Box>
          <Typography>≈ ${stakedInDollars}</Typography>
        </Box>

        {/* earned box */}
        <Box style={{marginRight:30}}>
          <Typography>Earned:</Typography>
          <Box style={{display:'flex'}}>
            <TokenSymbol symbol={earnedIcon} size={16} />{' '}
            {/* <img src={earnedIcon} alt="img" /> */}
            <Typography>{getDisplayBalance(earned)}</Typography>
          </Box>
          <Typography>≈ ${earnedInDollars}</Typography>
        </Box>
      </Box>

      {/* Buttons box */}
      <Box></Box>
    </Box>
  );
};

export default BombDetails;
