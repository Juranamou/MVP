import React from 'react'
import styled from 'styled-components';

function Banner() {
  return (
    <div>
      <Row>
        <Picture src="silentSpy.png" />
        <Paragraph>SilentSpy utilizes a web scraper and the ebay API to allow users to make informed purchases by comparing the current listing prices to previously sold items. The application also allows users to input their email, ebay query, and target price to be notified when their product reaches a certain value.</Paragraph>
      </Row>
    </div>
  )
}

const Picture = styled.img`
width: 1000px;
height: auto;
margin-top: 0;
margin-bottom: 0;
margin-left: auto;
margin-right: auto;
`;

const Row = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Paragraph = styled.p`
margin-top: 40px;
margin-bottom: 40px;
margin-left: auto;
margin-right: auto;
color: #9CABCD;
// background-color: #9CABCD;
width: 1200px;
font-size: 25px;
padding: 20px;
text-align: center;
// border-style: solid;
`;
export default Banner
