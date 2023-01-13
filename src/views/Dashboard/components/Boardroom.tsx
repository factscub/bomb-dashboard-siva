import React from 'react';
import { Box, Typography } from '@material-ui/core';
import BoxHeading from '../../../components/BoxHeading';
import TokenSymbol from '../../../components/TokenSymbol';
import { getDisplayBalance } from '../../../utils/formatBalance';
import BombDetails from '../../../components/BombDetails';
import useBoardroomTVL from '../../../hooks/useBoardroomTVL';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useBombFinance from '../../../hooks/useBombFinance';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useBombStats from '../../../hooks/useBombStats';
import FancyButton from '../../../components/FancyButton';
import WithdrawModal from '../../Boardroom/components/WithdrawModal';
import useModal from '../../../hooks/useModal';
import { BombFinanceSummaryProps } from '../type';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import DepositModal from '../../Boardroom/components/DepositModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import { Link } from 'react-router-dom';

export const Boardroom: React.FC<BombFinanceSummaryProps> = (boxStyles) => {
  const totalStaked = useTotalStakedOnBoardroom();
  const boardroomTVL = useBoardroomTVL().toString();
  const boardroomAPR = useFetchBoardroomAPR();
  const bombFinance = useBombFinance();
  const boardroomEarnings = useEarningsOnBoardroom();
  const bombStats = useBombStats();
  const boardroomStakedBalance = useStakedBalanceOnBoardroom();

  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);

  const boardroomDailyReturns = React.useMemo(
    () => (boardroomAPR ? Number(boardroomAPR / 365).toFixed(2) : null),
    [boardroomAPR],
  );

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);

  const boardroomBshareTokenPriceInDollars = React.useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(boardroomStakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, boardroomStakedBalance],
  );

  const boardroomBombTokenPriceInDollars = React.useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const boardroomEarnedInDollars = (
    Number(boardroomBombTokenPriceInDollars) * Number(getDisplayBalance(boardroomEarnings))
  ).toFixed(2);

  const { onWithdraw } = useWithdrawFromBoardroom();
  const canWithdrawFromBoardroom = useWithdrawCheck();

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={boardroomStakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'BShare'}
    />,
  );

  const tokenBalance = useTokenBalance(bombFinance.BSHARE);
  const { onStake } = useStakeToBoardroom();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BShare'}
    />,
  );

  const { onReward } = useHarvestFromBoardroom();
  const canClaimReward = useClaimRewardCheck();

  return (
    <Box
      style={{
        ...boxStyles,
        border: 0,
        margin: 0,
        padding: 0,
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box style={{ width: '60%', textAlign: 'center' }}>
        <Typography style={{ textAlign: 'right' }}>
         
          <Link to={'#'} style={{color:' #9EE6FF'}}>Read Investment Strategy</Link>
        </Typography>
        <Typography
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: 'white',
            margin: '10px 0',
            background:
              'radial-gradient(59345.13% 4094144349.28% at 39511.5% -2722397851.45%, rgba(0, 245, 171, 0.5) 0%, rgba(0, 173, 232, 0.5) 100%)',
          }}
        >
          Invest Now
        </Typography>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          {' '}
          <Typography style={{ width: '48%', background: 'rgba(255, 255, 255, 0.5)' }}>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px 0' }}>
              <Box style={{ borderRadius: '50%', background: 'white', width: 26, height: 26 }}>
                <TokenSymbol size={24} symbol="DISCORD" />
              </Box>
              <Typography style={{ fontWeight: 700, marginLeft: 10 }}>
                <a
                  href="https://discord.bomb.money"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Chat On Discord
                </a>
              </Typography>
            </Box>
          </Typography>
          <Typography style={{ width: '48%', background: 'rgba(255, 255, 255, 0.5)' }}>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px 0' }}>
              <Box style={{ borderRadius: '50%', background: 'white', width: 26, height: 26 }}>
                <TokenSymbol size={22} symbol="DOC" />
              </Box>
              <Typography style={{ fontWeight: 700, marginLeft: 10 }}>
                <a
                  href="https://docs.bomb.money"
                  style={{ color: 'black', textDecoration: 'none' }}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Read Doc
                </a>
              </Typography>
            </Box>
          </Typography>
        </Box>

        {/* Boardroom box */}
        <Box style={boxStyles}>
          <BoxHeading
            symbolSize={50}
            borderBottom={true}
            heading="Boardroom"
            description="Stake BSHARE and earn BOMB every epoch"
            symbol="BSHARE"
            showWrapper={true}
            tvl={boardroomTVL}
          />
          <Typography style={{ display: 'flex', justifyContent: 'flex-end', padding: 5 }}>
            Total Staked:{' '}
            <Box style={{ width: 20 }}>
              <TokenSymbol size={20} symbol="BSHARE" />
              {/* <img style={{ maxWidth: '100%' }} src={bshareIcon} alt="img" /> */}
            </Box>{' '}
            {Number(getDisplayBalance(totalStaked)).toFixed(0)}
          </Typography>

          {/* boardroom bombdetails */}
          <BombDetails
            dailyReturns={boardroomDailyReturns}
            stake={boardroomStakedBalance}
            stakedInDollars={boardroomBshareTokenPriceInDollars}
            earned={boardroomEarnings}
            earnedInDollars={boardroomEarnedInDollars}
            stakeIcon="BSHARE"
            earnedIcon="BOMB"
          >
            <Box
              style={{
                padding: '0 0 0 110px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              {approveStatus !== ApprovalState.APPROVED ? (
                <FancyButton
                  disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                  onClick={approve}
                  text="Approve BSHARE"
                  width="100%"
                />
              ) : (
                <>
                  <FancyButton
                    symbol="UP"
                    text="Deposit"
                    onClick={onPresentDeposit}

                    // disabled={approveStatus !== ApprovalState.APPROVED}
                  />
                  <FancyButton
                    symbol="DOWN"
                    text="Withdraw"
                    // disabled={approveStatus !== ApprovalState.APPROVED || !canWithdrawFromBoardroom}
                    disabled={!canWithdrawFromBoardroom}
                    onClick={onPresentWithdraw}
                  />
                </>
              )}

              <FancyButton
                text="Claim Rewards"
                width="100%"
                onClick={onReward}
                disabled={boardroomEarnings.eq(0) || !canClaimReward}
              />
            </Box>
          </BombDetails>
        </Box>
      </Box>

      {/* Empty box for latest news */}
      <Box style={{ ...boxStyles, padding: '10px 20px', width: '35%' }}>
        <Typography>Latest News</Typography>
      </Box>
    </Box>
  );
};
