import * as React from 'react';
import styled from '@mui/material/styles/styled';

const StyledDiv = styled('div')(({ theme }) => ({
  '& .cls-1': {
    fill: '#06c755',
  },

  '& .cls-2': {
    fill: '#fff',
  },
}));

function SvgImage({ height, width }) {
  return (
    <StyledDiv>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 320 320"
      >
        <g id="Layer_2" dataname="Layer 2">
          <g id="LINE_LOGO" dataname="LINE LOGO">
            <rect className="cls-1" width="320" height="320" rx="72.14" />
            <path
              className="cls-2"
              d="M266.66,144.92c0-47.74-47.86-86.58-106.69-86.58S53.28,97.18,53.28,144.92c0,42.8,38,78.65,89.22,85.42,3.48.75,8.21,2.29,9.4,5.26,1.08,2.7.71,6.93.35,9.65,0,0-1.25,7.53-1.52,9.13-.47,2.7-2.15,10.55,9.24,5.76s61.44-36.18,83.82-61.95h0C259.25,181.24,266.66,164,266.66,144.92Z"
            />
            <path
              className="cls-1"
              d="M231.16,172.49h-30a2,2,0,0,1-2-2v0h0V123.94h0v0a2,2,0,0,1,2-2h30a2,2,0,0,1,2,2v7.57a2,2,0,0,1-2,2H210.79v7.85h20.37a2,2,0,0,1,2,2V151a2,2,0,0,1-2,2H210.79v7.86h20.37a2,2,0,0,1,2,2v7.56A2,2,0,0,1,231.16,172.49Z"
            />
            <path
              className="cls-1"
              d="M120.29,172.49a2,2,0,0,0,2-2v-7.56a2,2,0,0,0-2-2H99.92v-37a2,2,0,0,0-2-2H90.32a2,2,0,0,0-2,2v46.53h0v0a2,2,0,0,0,2,2h30Z"
            />
            <rect
              className="cls-1"
              x="128.73"
              y="121.85"
              width="11.64"
              height="50.64"
              rx="2.04"
            />
            <path
              className="cls-1"
              d="M189.84,121.85h-7.56a2,2,0,0,0-2,2v27.66l-21.3-28.77a1.2,1.2,0,0,0-.17-.21v0l-.12-.12,0,0-.11-.09-.06,0-.11-.08-.06,0-.11-.06-.07,0-.11,0-.07,0-.12,0-.08,0-.12,0h-.08l-.11,0h-7.71a2,2,0,0,0-2,2v46.56a2,2,0,0,0,2,2h7.57a2,2,0,0,0,2-2V142.81l21.33,28.8a2,2,0,0,0,.52.52h0l.12.08.06,0,.1.05.1,0,.07,0,.14,0h0a2.42,2.42,0,0,0,.54.07h7.52a2,2,0,0,0,2-2V123.89A2,2,0,0,0,189.84,121.85Z"
            />
          </g>
        </g>
      </svg>
    </StyledDiv>
  );
}

function SvgImages({ height, width }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <SvgImage width={320} height={320} />
      <SvgImage width={240} height={240} />
      <SvgImage width={160} height={160} />
      <SvgImage width={80} height={80} />
    </div>
  );
}

export default SvgImages;
