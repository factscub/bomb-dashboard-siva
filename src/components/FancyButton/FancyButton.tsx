import React from 'react';
import TokenSymbol from '../TokenSymbol';

interface Props {
  onClick?: () => void;
  width?: string;
  disabled?: boolean;
  text: string;
  symbol?: string;
  marginLeft?:number
}

const FancyButton: React.FC<Props> = ({ marginLeft, onClick, text, width, symbol = 'BSHARE', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: width,
        minWidth: 110,
        display: 'flex',
        justifyContent: width ? 'center' : 'space-between',
        alignItems: 'center',
        borderRadius: '25px',
        padding: '5px',
        marginLeft:marginLeft ? marginLeft : 0,
        background: 'transparent',
        cursor: 'pointer',
        border: disabled ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid white',
        color: disabled ? 'rgba(255, 255, 255, 0.5)' : 'white',
      }}
      disabled={disabled}
    >
      <p style={{ margin: '0 15px 0 5px' }}>{text}</p>
      <p
        style={{
          padding: 5,
          margin: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          background: 'white',
        }}
      >
        <TokenSymbol symbol={symbol} size={15} />
      </p>
    </button>
  );
};

export default FancyButton;
