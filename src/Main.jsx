import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import axios from 'axios';

export default function Main() {
  //search bar state and initalize prices
  const [search, setSearch] = useState('');
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(0);
  const [url, setUrl] = useState([]);
  const [active, setActive] = useState({
    labels: [0, 0],
    datasets: [{
      label: 'Active Listings',
      backgroundColor: '#8A9BC3',
      borderColor: '#8A9BC3',
      data: [0, 0],
    }]
  });
  const [sold, setSold] = useState({
    labels: [0, 0],
    datasets: [{
      label: 'Sold Listings',
      backgroundColor: '#8A9BC3',
      borderColor: '#8A9BC3',
      data: [0, 0],
    }]
  });

  // gets sold prices and current prices
  function handleSubmit() {
    // turn search into url query search
    let query = search.split(' ');
    query = query.join('+');
    // sold data
    axios.get(`http://localhost:8080/scraper/${query}`)
      .then((data) => {
        // create labels
        let labels = [];
        let values = [];
        let count = 0;
        for (var i = 0; i < data.data.length; i++) {
          let num = Number(data.data[i].split('$')[1])
          if (num > minimum && num < maximum) {
            values.push(num);
            labels.push(count);
            count++;
          }
        }
        // set new line Data
        let line = {
          labels: labels,
          datasets: [{
            label: 'Sold Listings',
            backgroundColor: '#8A9BC3',
            borderColor: '#8A9BC3',
            data: values,
          }]
        }
        console.log(data.data);
        setSold(line);
      })
  }

  // var url = [];
  function handleSubmitAPI() {
    // turn search into url query search
    let query = search.split(' ');
    query = query.join('+');
    // active listings
    axios.get(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=200`, { headers: { "Authorization": `Bearer ${process.env.TOKEN}` } })
      .then((data) => { console.log(data.data.itemSummaries); return data.data.itemSummaries; })
      .then((products) => {
        let prices = [];
        let labels = [];
        let url = [];
        let count = 0;
        for (var i = 0; i < products.length; i++) {
          let num = Number(products[i].price.value)
          if (num > minimum && num < maximum) {
            console.log(products[i].itemWebUrl);
            prices.push(num);
            labels.push(count);
            url.push(products[i].itemWebUrl);
            setUrl(url);
            count++;
          }
        }
        console.log('url', url);
        let line = {
          labels: labels,
          datasets: [{
            label: 'Active Listings',
            backgroundColor: '#8A9BC3',
            borderColor: '#8A9BC3',
            data: prices,
          }]
        }
        setActive(line);
      })
  }

  const lineOptions = {
    onClick: (e, element) => {
      let index = element[0].index;
        alert(url[index]);
    }
  };

  return (
    <>
      <SearchBar>
        <Row>
          <TextField id="outlined-basic" label="Minimum Price $" variant="outlined" onChange={() => { setMinimum(event.target.value) }} />
          <TextField id="outlined-basic" label="Maximum Price $" variant="outlined" onChange={() => { setMaximum(event.target.value) }} />
          <TextField id="outlined-basic" label="Search" variant="outlined" onChange={() => { setSearch(event.target.value) }} />
          <Button size="large" variant="contained" style={{ 'marginLeft': '10px', 'height': '55px' }} onClick={() => { handleSubmit(); handleSubmitAPI(); }}>Search</Button>
        </Row>
      </SearchBar>
      <Row >
        <div style={{ width: '50%' }}><Line data={sold} /></div>
        <div style={{ width: '50%' }}><Line data={active} options={lineOptions}/></div>
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
  width: ${(props) => { props.width }};
`;
