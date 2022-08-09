import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import axios from 'axios';

export default function Main() {
  const [search, setSearch] = useState('');
  const [sold, setSold] = useState({
    labels: [0, 0],
    datasets: [{
      label: 'Sold Product',
      backgroundColor: '#8A9BC3',
      borderColor: '#8A9BC3',
      data: [0, 0],
    }]
  });

  function handleSubmit() {
    // turn search into url query search
    let query = search.split(' ');
    query = query.join('+');

    axios.get(`http://localhost:8080/scraper/${query}`)
      .then((data) => {
        // create labels
        let labels = [];
        let values = [];
        for (var i = 0; i < data.data.length; i++) {
          values.push(Number(data.data[i].split('$')[1]));
          labels.push(i);
        }
        // set new line Data
        let line = {
          labels: labels,
          datasets: [{
            label: 'Sold Product',
            backgroundColor: '#8A9BC3',
            borderColor: '#8A9BC3',
            data: values,
          }]
        }
        console.log(data.data);
        setSold(line);
      })
  }

  return (
    <>
      <SearchBar>
        <Row>
          <TextField id="outlined-basic" label="Search" variant="outlined" onChange={() => { setSearch(event.target.value) }} />
          <Button size="large" variant="contained" style={{ 'marginLeft': '10px', 'height': '55px' }} onClick={() => { handleSubmit() }}>Search</Button>
        </Row>
      </SearchBar>
      <Row >
        <div style={{width: '50%'}}><Line data={sold} /></div>
        <div style={{width: '50%'}}><Line data={sold} /></div>
      </Row>
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
  width: ${(props) => {props.width}};
`;
