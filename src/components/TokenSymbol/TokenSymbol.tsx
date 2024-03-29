import React from 'react';

//Graveyard ecosystem logos
import bombLogo from '../../assets/img/bomb.png';
import tShareLogo from '../../assets/img/bshares.png';
import bombLogoPNG from '../../assets/img/bomb.png';
import xbombLogo from '../../assets/img/xbomb.png';
import busmLogo from '../../assets/img/busm-256.png'
import tShareLogoPNG from '../../assets/img/bshares.png';
import tBondLogo from '../../assets/img/bbond.png';

import bombFtmLpLogo from '../../assets/img/bomb-bitcoin-LP.png';
import bshareFtmLpLogo from '../../assets/img/bshare-bnb-LP.png';
import busmBusdLpLogo from '../../assets/img/busm-busd-lp.png';
import metamaskFox from '../../assets/img/metamask-fox.svg';
import bombBtcLp from '../../assets/img/bomb-btc-lp-512.png';



import bnbLogo from '../../assets/img/bnb.png';
import btcLogo from '../../assets/img/BCTB-icon.png';

import up from '../../assets/img/up.png';
import down from '../../assets/img/down.png';
import cart from '../../assets/img/cart.png';

import discord from '../../assets/img/discord.png'
import doc from '../../assets/img/doc.png'

const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  METAMASKFOX:metamaskFox,
  BOMB: bombLogo,
  BOMBPNG: bombLogoPNG,
  BSHAREPNG: tShareLogoPNG,
  XBOMB: xbombLogo,
  BSHARE: tShareLogo,
  BBOND: tBondLogo,
  BUSM: busmLogo,
  WBNB: bnbLogo,
  BOO: bnbLogo,
  SHIBA: bnbLogo,
  ZOO: bnbLogo,
  CAKE: bnbLogo,
  SUSD: bnbLogo,
  SBTC: btcLogo,
  BTCB: btcLogo,
  BTC: btcLogo,
  SVL: bnbLogo,
  'BOMB-BNB-LP': bombFtmLpLogo,
  'BOMB-BTCB-LP': bombFtmLpLogo,
    '80BOMB-20BTCB-LP': bombFtmLpLogo,

  'BSHARE-BOMB-LP': bombFtmLpLogo,
  'BOMB-BSHARE-LP': bombFtmLpLogo,
  'BUSM-BUSD-LP': busmBusdLpLogo,

  'BSHARE-BNB-LP': bshareFtmLpLogo,
    '80BSHARE-20WBNB-LP': bshareFtmLpLogo,
  'BSHARE-BNB-APELP': bshareFtmLpLogo,
  'BOMB-BTCB-APELP': bombFtmLpLogo,

  'BBOND-FARM':bombBtcLp,

  UP:up,
  DOWN:down,
  CART:cart,
  DISCORD:discord,
  DOC:doc
};


type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 64}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
