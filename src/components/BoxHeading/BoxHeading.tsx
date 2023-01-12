import { Box, Typography } from '@material-ui/core';
import React from 'react';
import TokenSymbol from '../TokenSymbol';

type BoxHeading = {
  symbol?: string;
  showWrapper?: boolean;
  tvl?: string;
  description?: string;
  heading: string;
  symbolSize?: number;
  marginTop?: number;
  borderBottom?: boolean;
};

const BoxHeading: React.FC<BoxHeading> = ({
  marginTop,
  borderBottom,
  symbolSize,
  symbol,
  showWrapper,
  tvl,
  description,
  heading,
}) => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: borderBottom ? '0.5px solid rgba(195, 197, 203, 0.75)' : 0,
        marginTop,
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        {!!symbol && <TokenSymbol symbol={symbol} size={symbolSize ? symbolSize : 35} />}

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
      {!!tvl && <Box style={{ display: 'flex', alignItems: 'flex-end', paddingRight: 10 }}>TVL: ${tvl}</Box>}{' '}
    </Box>
  );
};

export default BoxHeading;
