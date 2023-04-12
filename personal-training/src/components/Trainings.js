import React, {useState,useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import dayjs from 'dayjs';
export default function Trainings(){
    const[trainings,setTrainings]= useState([]);
   // const gridRef = useRef();
    useEffect(() => {
        getTrainings()},[]);
//const[open,setOpen]=useState(false);

    const[columnDefs]=useState([
        //{field:'id',sortable:true,filtering:true},
        {field:'date',valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD HH:mm'),
         headerName: 'Date',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'duration',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'activity',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'customer.firstname',headerName: 'Customer',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
    ])

    const getTrainings = () =>{
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{
                alert('Something went wrong');
            }
        })
        .then(data => setTrainings(data))
        .catch(err=> console.error(err))
    }
    

    return(
          <>
          <h3 style={{margin:'auto', textAlign:'left', width:'90%'}}>
            Training Sessions
          </h3>
          <hr style={{ width:'90%'}}></hr>
        <div className='ag-theme-material'
        style={{width:'90%', height: 600, margin:'auto'}}
        >
            <AgGridReact
              //  ref={gridRef}
              //  onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                rowData={trainings}
                animateRows= {true}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
        
        </>
    );
}
