import React from 'react';
import TokenSymbol from '../TokenSymbol';

interface Props {
  onClick?: () => void;
  width?: number;
  disabled?: boolean;
  text: string;
  symbol?: string;
}

const FancyButton: React.FC<Props> = ({ onClick, text, width, symbol = 'BSHARE', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: width,
        minWidth: 110,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '25px',
        padding: '5px',
        background: 'transparent',
        cursor: 'pointer',
        border: disabled ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid white',
        color: disabled ? 'rgba(255, 255, 255, 0.5)' : 'white',
      }}
      disabled={disabled}
    >
      <p style={{ margin: '0 0 0 5px' }}>{text}</p>
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
