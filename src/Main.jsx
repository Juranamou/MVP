import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const testData = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

export default function Main() {

  const [string, setString] = useState('');

  return (
    <>
      <SearchBar>
        <Row>
          <TextField id="outlined-basic" label="Search" variant="outlined" onChange={() => { setString(event.target.value) }} />
          <Button size="large" variant="contained" style={{ 'marginLeft': '10px', 'height': '55px' }}>Search</Button>
        </Row>
      </SearchBar>
      <Line data={testData} />
    </>
  )
}

const SearchBar = styled.div`
  width: 50%;
  margin: 0 auto;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
`;
