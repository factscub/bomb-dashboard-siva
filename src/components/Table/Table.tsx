import React from 'react';
import { Box } from '@material-ui/core';
import useBombFinance from '../../hooks/useBombFinance';
import { numberFormater } from '../../utils/numberFormater';

interface Props {
  bombsArray: {
    name: string;
    icon: string;
    currentSupply: string;
    totalSupply: string;
    priceInDollars: string;
    priceInBNB: string;
    metaMaskFox: string;
  }[];
}

export const Table: React.FC<Props> = ({ bombsArray }) => {
  const bombFinance = useBombFinance();

  const titles = ['', 'Current Supply', 'Total Supply', 'Price', ''];

  return (
    <React.Fragment>
      <table style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '0.5px solid rgba(195, 197, 203, 0.75)', fontSize: 10 }}>
            {titles.map((title, i) => (
              <th style={{ padding: '0 10px 5px 10px' }}>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {bombsArray.map((bomb, i) => (
            <tr key={i} style={{ borderBottom: '0.5px solid rgba(195, 197, 203, 0.75)' }}>
              <td style={{ padding: '0 10px 5px 10px' }}>
                <Box component="span" style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: ' #373747',
                      width: 25,
                      borderRadius: '50%',
                      margin: '0 5px 0 5px',
                      padding: 2,
                    }}
                  >
                    <img style={{ maxWidth: '100%' }} src={bomb.icon} alt="img" />
                  </span>
                  <span style={{ fontSize: 12 }}>${bomb.name}</span>
                </Box>
              </td>
              <td style={{ padding: '0 10px 5px 10px' }}>{numberFormater(Number(bomb.currentSupply))}</td>
              <td style={{ padding: '0 10px 5px 10px' }}>{numberFormater(Number(bomb.totalSupply))}</td>
              <td style={{ padding: '0 10px 5px 10px' }}>
                <p style={{margin:0}}>{bomb.priceInDollars}</p>
                <p style={{margin:0}}>{Number(bomb.priceInBNB).toFixed(2)} BTCB</p>
              </td>
              <td style={{ padding: '0 10px 5px 10px' }}>
                <Box style={{ cursor: 'pointer' }} onClick={() => bombFinance.watchAssetInMetamask(bomb.name)}>
                  <img src={bomb.metaMaskFox} alt="img" />
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
