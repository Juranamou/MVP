import React from 'react'
import styled from 'styled-components';

function Banner() {
  return (
    <div>
      <Picture src="silentSpy.png"/>
    </div>
  )
}

const Picture = styled.img`
width: 500px;
height: auto;
margins: 0 auto;
`;
export default Banner
