import React, { useMemo } from 'react'
import { Box } from '@material-ui/core';
import useEarnings from '../../../hooks/useEarnings';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useStatsForPool from '../../../hooks/useStatsForPool';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import BoxHeading from '../../../components/BoxHeading';
import BombDetails from '../../../components/BombDetails';
import FancyButton from '../../../components/FancyButton';
import useHarvest from '../../../hooks/useHarvest';
import useModal from '../../../hooks/useModal';
import DepositModal from '../../Bank/components/DepositModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useStake from '../../../hooks/useStake';
import WithdrawModal from '../../Bank/components/WithdrawModal';
import useWithdraw from '../../../hooks/useWithdraw';

const FarmCard = ({ bank }) => {

    let statsOnPool = useStatsForPool(bank);

    const { onReward } = useHarvest(bank);


    const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);

    const STAKEDtokenPriceInDollars = useMemo(
        () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
        [stakedTokenPriceInDollars],
    );

    const stakedInDollars = (
        Number(STAKEDtokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))
    ).toFixed(2);


    const tShareStats = useShareStats();
    const bombStats = useBombStats();

    const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
    const tokenStats = bank.earnTokenName === 'BSHARE' ? tShareStats : bombStats;

    const tokenPriceInDollars = useMemo(
        () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
        [tokenStats],
    );

    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

    const tokenBalance = useTokenBalance(bank.depositToken);

    const { onStake } = useStake(bank);

    const [onPresentDeposit, onDismissDeposit] = useModal(
        <DepositModal
            max={tokenBalance}
            decimals={bank.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onStake(amount);
                onDismissDeposit();
            }}
            tokenName={bank.depositTokenName}
        />,
    );

    const { onWithdraw } = useWithdraw(bank);

    const [onPresentWithdraw, onDismissWithdraw] = useModal(
        <WithdrawModal
            max={stakedBalance}
            decimals={bank.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onWithdraw(amount);
                onDismissWithdraw();
            }}
            tokenName={bank.depositTokenName}
        />,
    );


    return (
        <>
           
            <BoxHeading
                marginTop={15}
                heading={bank?.depositTokenName}
                tvl={statsOnPool?.TVL}
                showWrapper={true}
                symbol={bank?.depositToken?.symbol}
                symbolSize={35}
                borderBottom={true}
            />
            <BombDetails
                dailyReturns={statsOnPool?.dailyAPR}
                stake={stakedBalance}
                stakedInDollars={stakedInDollars}
                stakeIcon={bank?.depositToken?.symbol}
                earned={earnings}
                earnedInDollars={earnedInDollars}
                earnedIcon='BSHARE'

            >
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <FancyButton marginLeft={30} symbol='UP' text='Deposit' disabled={bank.closedForStaking} onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
                    />
                    <FancyButton symbol='DOWN' marginLeft={30} text='Withdraw' onClick={onPresentWithdraw} />
                    <FancyButton text='Claim Rewards' marginLeft={30} onClick={onReward} disabled={earnings.eq(0)} />
                </Box>

            </BombDetails>
          
        </>
    )
};

export default FarmCard;
