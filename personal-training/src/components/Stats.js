import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Container from '@mui/material/Container';
import React, {useState,useEffect} from 'react';
import _groupby from "lodash/groupBy";

//https://recharts.org/en-US

export default function Statistics() {

    let _ = require('lodash');
    const[inputData,setInputData]= useState([]);
    const[open,setOpen]=useState(false)

    const[data,setData]=useState([]);

    const[statistics,setStatistics]=useState([])

    const getData = () =>{
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{
                alert('Something went wrong');
            }
        })
        .then(data => 
            {data.map(
                item=>data.push(
            {
                activity:item.activity,
                duration:item.duration,
            }
            
            )
        )
        setInputData(data)
        setOpen(true)
            })
        .catch(err=> console.error(err))
    }
    if(open){
        let groupedData=[]
        let chartData=[]

        setStatistics({statistics:inputData})
        groupedData=_.mapValues(_.groupBy(statistics.statistics,'activity'),v=> _.sumBy(v,'duration'))
        const makeArray =Object.entries(groupedData)
        makeArray.map(item=>
            chartData.push({
                activity:item[0],
                duration:item[1]
            })
            )
            setData(chartData)
            setOpen(false)
    }

    useEffect(()=>{
        getData();
     },[])


    return (
        <div>
            <h2>Statistics</h2>
        
        <Container maxWidth="90%" maxHeight="90%" margin='auto'>
            <BarChart
            width={1050}
            height={550}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </Container>
      </div>
    );
    
  
}
