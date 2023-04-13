import React, {useState,useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import AddCustomer from './AddCustomer';

import EditCustomer from './EditC'

 function Customerapp(){
    const[customers,setCustomers]= useState([]);
    useEffect(() => {
        getCustomers()},[]);
    const[open,setOpen]=useState(false);


    const[columnDefs]=useState([
        {field:'firstname',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:150},
        {field:'lastname',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:150},
        {field:'streetaddress',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'postcode',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:150},
        {field:'city',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:150},
        {field:'email',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:150},
        {field:'phone',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:150},
        {cellRenderer:params=>
            <EditCustomer updateCustomer={updateCustomer} params={params.data}/>
                , width:100, filtering:false,sortable:false},   
        {cellRenderer: params=>
            <Button 
                size='small' 
                color='error'
                onClick={()=> deleteCustomer(params)}
            >
                Delete
                </Button>
                , width:120, filtering:false,sortable:false},
         
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


    const saveCustomer=(customer)=>{
        fetch('http://traineeapp.azurewebsites.net/api/customers',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(customer)
        }
        )
        .then(res=> getCustomers())
        .catch(err=>console.error(err))
    }

    const updateCustomer=(customer,link)=>{
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(customer)
        }
        )
        .then(res=> getCustomers())
        .catch(err=>console.error(err))
    }

    const deleteCustomer =(link)=>{
       // console.log(link);
        if(window.confirm('Are you sure?')){
        fetch(link.data.links[0].href,{method:'DELETE'})
        .then(response=>{
            if(response.ok){
                setOpen(true);
                getCustomers();
            }
            else{
                alert('Something went wrong in deletion');
            }
        })
        .catch(err=> console.log(err))
    }}

    return(
          <>
          <h3 style={{margin:'auto', textAlign:'left', width:'90%'}}>
            Customer Information
          </h3>
          <div style={{width:'90%'}}>
          <AddCustomer saveCustomer={saveCustomer}/>
          
          </div>
          <hr style={{ width:'90%'}}></hr>
        <div className='ag-theme-material'
        style={{width:'90%', height: 600, margin:'auto'}}
        >
            <AgGridReact
                rowSelection="single"
                rowData={customers}
                animateRows= {true}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
        <Snackbar
                    open={open}
                    message="Customer deleted successfully"
                    autoHideDuration={3000}
                    onClose={()=>setOpen(false)}
                />
        
        
        </>
    );
}export default Customerapp;
