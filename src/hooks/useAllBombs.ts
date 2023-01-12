import { useEffect, useMemo, useState } from "react";
import useBombStats from "./useBombStats";
import useBondStats from "./useBondStats";
import usebShareStats from './usebShareStats';

const useAllBombs= ()=>{

    // Bomb
    const bombStats = useBombStats();
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
    const bombPriceInDollars = useMemo(
      () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
      [bombStats],
    );
    const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  
    // bshare
    const bShareStats = usebShareStats();
    const bShareCirculatingSupply = useMemo(
      () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
      [bShareStats],
    );
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
    const bSharePriceInDollars = useMemo(
      () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
      [bShareStats],
    );
    const bSharePriceInBNB = useMemo(
      () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
      [bShareStats],
    );
  
  
    // tbond
    const tBondStats = useBondStats();
    
    const tBondCirculatingSupply = useMemo(
      () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
      [tBondStats],
    );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
    const tBondPriceInDollars = useMemo(
      () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
      [tBondStats],
    );
    const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  
  
    const [allBombs, setAllBombs]=useState([]);
    useEffect(()=>{
    const bombs = [{
        name:'BOMB',
        currentSupply:bombCirculatingSupply,
        totalSupply:bombTotalSupply,
        priceInDollars:bombPriceInDollars,
        priceInBNB:bombPriceInBNB,
    

    },

{
    name:'BSHARE',
    currentSupply:bShareCirculatingSupply,
    totalSupply:bShareTotalSupply,
    priceInDollars:bSharePriceInDollars,
    priceInBNB:bSharePriceInBNB,

},
{
    name:'BBOND',
    currentSupply:tBondCirculatingSupply,
    totalSupply:tBondTotalSupply,
    priceInDollars:tBondPriceInDollars,
    priceInBNB:tBondPriceInBNB,

}
];
        setAllBombs(bombs);
    },[
    bombCirculatingSupply,
    bShareCirculatingSupply,
    tBondCirculatingSupply,
    bombTotalSupply,
    bShareTotalSupply,
    tBondTotalSupply,
    bombPriceInDollars,
    bSharePriceInDollars,
    tBondPriceInDollars,
    bombPriceInBNB,
    bSharePriceInBNB,
    tBondPriceInBNB,

]);

return allBombs;
}
export default useAllBombs;