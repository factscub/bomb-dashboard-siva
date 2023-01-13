import React from 'react';
import { Box,  } from '@material-ui/core';
import BoxHeading from '../../../components/BoxHeading';
import useBanks from '../../../hooks/useBanks';
import FarmCard from './FarmCard';
import { BombFinanceSummaryProps } from '../type';

export const BombFarms:React.FC<BombFinanceSummaryProps> = (boxStyles) => {
  const [banks] = useBanks();
  const activeBanks = banks.filter((bank) => !bank.finished);

  return (
    <Box style={boxStyles}>
      <BoxHeading heading="Bomb Farms" description="Stake your LP tokens in our farms to start earning $BSHARE" />

      {activeBanks
        .filter((bank) => bank.sectionInUI === 3)
        .map((bank) => (
          <React.Fragment key={bank.name}>
            <FarmCard bank={bank} />
          </React.Fragment>
        ))}
    </Box>
  );
};
