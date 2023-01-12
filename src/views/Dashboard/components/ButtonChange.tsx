import React from 'react';
import useWallet from 'use-wallet';
import ERC20 from '../../../bomb-finance/ERC20';
import FancyButton from '../../../components/FancyButton';
import UnlockWallet from '../../../components/UnlockWallet';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useBombFinance from '../../../hooks/useBombFinance';
import useCatchError from '../../../hooks/useCatchError';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import ExchangeModal from '../../Bond/components/ExchangeModal';

interface ButtonChangeProps {
  fromToken: ERC20;
  symbol: string;
  action: string;
  fromTokenName: string;
  toTokenName?: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
}

const ButtonChange: React.FC<ButtonChangeProps> = ({
  fromToken,
  disabled,
  onExchange,
  symbol,
  fromTokenName,
  toTokenName,
  action,
}) => {
  const { account } = useWallet();
  const catchError = useCatchError();
  const {
    contracts: { Treasury },
  } = useBombFinance();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);
  const balance = useTokenBalance(fromToken);

  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={''}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (
    <>
      {' '}
      {!!account ? (
        <>
          {approveStatus !== ApprovalState.APPROVED && !disabled ? (
            <FancyButton
              text={action}
              symbol={symbol}
              disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
              onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
            />
          ) : (
            <FancyButton text={action} symbol={symbol} onClick={onPresent} disabled={disabled} />
          )}
        </>
      ) : (
        <UnlockWallet />
      )}
    </>
  );
};

export default ButtonChange;
