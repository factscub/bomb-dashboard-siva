import {useCallback} from 'react';
import useBombFinance from './useBombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {Bank} from '../bomb-finance';

const useHarvest = (bank: Bank) => {
  const bombFinance = useBombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback((BANK) => {
    handleTransactionReceipt(
      bombFinance.harvest(bank ? bank.contract : BANK.contract,bank? bank.poolId : BANK.poolId),
      `Claim ${bank ? bank.earnTokenName : BANK.earnTokenName} from ${bank ? bank.contract : BANK.contract }`,
    );
  }, [bank, bombFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvest;
