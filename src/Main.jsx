import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import axios from 'axios';

var testData = {
  labels: [0, 1, 2, 3, 4, 5],
  datasets: [{
    label: 'Sold Product',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0,0,0,0,0],
  }]
};

export default function Main() {

  const [search, setSearch] = useState('');
  const [sold, setSold] = useState([]);

  function handleSubmit(){
    console.log('clicked')
    axios.get(`http://localhost:4000/scraper/${search}`)
      .then((data) => {setSold(data)});
    let labels = new Array(sold.length);

    testData = {
      labels: labels,
      datasets: [{
        label: 'Sold Product',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: sold,
      }]
    };
  }

  return (
    <>
      <SearchBar>
        <Row>
          <TextField id="outlined-basic" label="Search" variant="outlined" onChange={() => { setSearch(event.target.value) }} />
          <Button size="large" variant="contained" style={{ 'marginLeft': '10px', 'height': '55px' }} onClick={() => {handleSubmit()}}>Search</Button>
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
