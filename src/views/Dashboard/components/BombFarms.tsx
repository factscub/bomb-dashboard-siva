import React from 'react';
import { Box,  } from '@material-ui/core';
import BoxHeading from '../../../components/BoxHeading';
import useBanks from '../../../hooks/useBanks';
import FarmCard from './FarmCard';

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

export const BombFarms = () => {
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
