import React, {useState,useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';

export default function Customerapp(){
    const[customers,setCustomers]= useState([]);
   // const gridRef = useRef();
    useEffect(() => {
        getCustomers()},[]);
//const[open,setOpen]=useState(false);

    const[columnDefs]=useState([
        //{field:'id',sortable:true,filtering:true},
        {field:'firstname',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:150},
        {field:'lastname',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'streetaddress',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'postcode',sortable:true,filtering:true, filter: 'agTextColumnFilter', width:150},
        {field:'city',sortable:true,filtering:true, filter: 'agTextColumnFilter', width:150},
        {field:'email',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'phone',sortable:true,filtering:true, filter: 'agTextColumnFilter'}
    ])

    const getCustomers = () =>{
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{
                alert('Something went wrong');
            }
        })
        .then(data => setCustomers(data.content))
        .catch(err=> console.error(err))
    }

    return(
          <>
        <div className='ag-theme-material'
        style={{width:'90%', height: 600, margin:'auto'}}
        >
            <AgGridReact
              //  ref={gridRef}
              //  onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                rowData={customers}
                animateRows= {true}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
        
        </>
    );
}
