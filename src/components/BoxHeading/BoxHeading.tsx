import { Box, Typography } from '@material-ui/core';
import React from 'react';
import TokenSymbol from '../TokenSymbol';

type BoxHeading = {
  symbol?: string;
  showWrapper?: boolean;
  tvl?: string;
  description: string;
  heading: string;
};

const BoxHeading: React.FC<BoxHeading> = ({ symbol, showWrapper, tvl, description, heading }) => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '0.5px solid rgba(195, 197, 203, 0.75)',
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        {!!symbol && (
          <Box style={{ minHeight: 35, maxWidth: 50 }}>
            <TokenSymbol symbol={symbol} size={50}/>
            {/* <img style={{ maxWidth: '100%' }} src={symbol} alt="img" /> */}
          </Box>
        )}

        <Box style={{ marginLeft: 10 }}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ fontSize: 22, fontWeight: 700 }}>{heading}</Typography>
            {showWrapper && (
              <Typography
                style={{
                  borderRadius: 5,
                  fontSize: 14,
                  margin: '0 5px',
                  padding: '2px 5px',
                  background: 'rgba(0, 232, 162, 0.5)',
                }}
              >
                Recommended
              </Typography>
            )}
          </Box>
          {!!description && <Typography>{description}</Typography>}{' '}
        </Box>
      </Box>
      {!!tvl && <Box style={{ display: 'flex', alignItems: 'flex-end', paddingRight: 10 }}>TVL:{' '}${tvl}</Box>}{' '}
    </Box>
  );
};

export default BoxHeading;
