import React, { useCallback, useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import { BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';
import useBombFinance from '../../../hooks/useBombFinance';
import useBondStats from '../../../hooks/useBondStats';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import TokenSymbol from '../../../components/TokenSymbol';
import { getDisplayBalance } from '../../../utils/formatBalance';
import BoxHeading from '../../../components/BoxHeading';
import ButtonChange from './ButtonChange';

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
const Bond: React.FC = () => {
  const bombFinance = useBombFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useCashPriceInLastTWAP();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    },
    [bombFinance, addTransaction],
  );
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);

  return (
    <Box style={boxStyles}>
      <BoxHeading
        symbolSize={50}
        heading="Bonds"
        description="BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1"
        symbol="BBOND"
      />
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px 0' }}>
        {/* bomb current price and available to redeem box */}
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box style={{ marginRight: 90 }}>
            <Typography>Current Price: (Bomb)^2</Typography>
            <Typography style={{ fontSize: 22 }}>
              BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB
            </Typography>
          </Box>
          <Box>
            <Typography>Available to redeem: </Typography>
            <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TokenSymbol symbol="BBOND" size={40} />
              <Typography style={{ fontSize: 22 }}>{Number(getDisplayBalance(bondBalance)).toFixed(2)}</Typography>
            </Typography>
          </Box>
        </Box>

        {/* purchase, redeem boxes */}
        <Box style={{ width: '40%' }}>
          {/* purchase text and button */}
          <Box
            style={{
              padding: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '0.5px solid rgba(195, 197, 203, 0.75)',
            }}
          >
            {/* text */}
            <Box>
              <Typography style={{ fontWeight: 600 }}>Purchase BBond</Typography>
              <Typography>Bomb is over peg</Typography>
            </Box>

            {/* purhcase button */}
            <ButtonChange
              action="Purchase"
              fromToken={bombFinance.BOMB}
              fromTokenName="BOMB"
              onExchange={handleBuyBonds}
              disabled={!bondStat || isBondRedeemable}
              symbol="CART"
            />
          </Box>

          {/* redeem text and button */}
          <Box style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
            {/* text */}
            <Typography style={{ fontWeight: 600 }}>Redeem Bomb</Typography>
            {/* redeem button */}
            <ButtonChange
              action="Redeem"
              fromToken={bombFinance.BBOND}
              fromTokenName="BBOND"
              toTokenName="BOMB"
              onExchange={handleRedeemBonds}
              disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
              symbol="DOWN"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Bond;
