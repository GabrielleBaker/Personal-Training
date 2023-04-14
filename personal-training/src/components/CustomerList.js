import React, {useState,useEffect,useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import AddCustomer from './AddCustomer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCustomer from './EditC'
import AddTraining from './AddTrainings';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

 function Customerapp(){
    const[customers,setCustomers]= useState([]);
    useEffect(() => {
        getCustomers()},[]);
    const[open,setOpen]=useState(false);

//ag grid columns
    const[columnDefs]=useState([
        {field:'firstname',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:130},
        {field:'lastname',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:130},
        {field:'streetaddress',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:180},
        {field:'postcode',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:130},
        {field:'city',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:150},
        {field:'email',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:180},
        {field:'phone',sortable:true,filtering:true, filter: 'agTextColumnFilter',width:130},
        {cellRenderer:params=>
            <EditCustomer updateCustomer={updateCustomer} params={params.data}/>
                , width:80, filtering:false,sortable:false},   
        {cellRenderer: params=>
            <Button 
                color='error'
                onClick={()=> deleteCustomer(params)}
            >
               <DeleteIcon size={1}/>
                </Button>
                , width:80, filtering:false,sortable:false},
        {cellRenderer: params=>
            <AddTraining saveTraining={saveTraining} params={params.data}/>
                , width:120, filtering:false,sortable:false},
         
    ])
    const saveTraining=(training)=>{
        fetch('http://traineeapp.azurewebsites.net/api/trainings',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(training)
        }
        )
        .then(res=> getCustomers())
        .catch(err=>console.error(err))
    }

//get data from api to populate table
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

//save a new customer
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
//update an existing customer -use PUT method-
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
//delete a customer, link is params which is sent in column defs
    const deleteCustomer =(link)=>{
        if(window.confirm('Are you sure?')){
            //follow this path to access the link which contains customer id
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
    //EXPORT functionality
   
    let gridApi;

    const onGridReady=params=>{
        gridApi=params.api
       // console.dir(gridApi)
    }

    function onExportClick() {
       // console.dir(gridApi)
        gridRef.current.api.exportDataAsCsv();
      //  gridApi.exportDataAsCsv();
      }
      const gridRef = useRef();
    return(
          <>
          <h3 style={{margin:'auto', textAlign:'left', width:'90%'}}>
            Customer Information
          </h3>
          <div style={{width:'90%'}}>

          <AddCustomer saveCustomer={saveCustomer}/>

          <Button 
            style={{margin:10,padding:10,float:'right'}} 
            variant="contained" 
            color='secondary' 
            onClick={() => onExportClick()}>
             Download CSV file
        </Button>

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
                onGridReady={onGridReady} 
                ref={gridRef}
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
