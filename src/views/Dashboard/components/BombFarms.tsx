import React from 'react';
import { Box } from '@material-ui/core';
import BoxHeading from '../../../components/BoxHeading';
import useBanks from '../../../hooks/useBanks';
import FarmCard from './FarmCard';
import { BombFinanceSummaryProps } from '../type';
import useHarvest from '../../../hooks/useHarvest';
import FancyButton from '../../../components/FancyButton';

export const BombFarms: React.FC<BombFinanceSummaryProps> = (boxStyles) => {
  const [banks] = useBanks();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const { onReward } = useHarvest(null);


  const rewardHandler = () => {
    activeBanks
      .filter((bank) => bank.sectionInUI === 3)
      .forEach((bank) => {
        onReward(bank);
      });
  };
  return (
    <Box style={{ ...boxStyles, position: 'relative' }}>
      <BoxHeading heading="Bomb Farms" description="Stake your LP tokens in our farms to start earning $BSHARE" />

      {activeBanks
        .filter((bank) => bank.sectionInUI === 3)
        .map((bank) => (
          <React.Fragment key={bank.name}>
            <FarmCard bank={bank} />
          </React.Fragment>
        ))}

      <Box style={{ position: 'absolute', top: 30, right: 15 }}>
        <FancyButton text="Claim All" onClick={rewardHandler} />
      </Box>
    </Box>
  );
};
