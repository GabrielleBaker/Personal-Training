import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mdi/react';
import { mdiNotePlusOutline } from '@mdi/js';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function AddTraining(props){
    const [open, setOpen] = React.useState(false);

   //get customer from props to display name in new training dialog
    const [customerdetail,setCustomerdetail]=React.useState({
        firstname:'', 
        lastname:'', 
        streetaddress:'', 
        postcode:'', 
        city:'', 
        email:'', 
        phone:''
    });
    
    const[training,setTraining]= React.useState({
        date:'',
        duration:'',
        activity:'',
        customer:'',
    });
    const customerLink= [props.params.links[0].href];
    // 
    
    const handleClickOpen = () => {
        setOpen(true);
        setCustomerdetail({
            firstname:props.params.firstname, 
            lastname:props.params.lastname,
            streetaddress:props.params.streetaddress,
            postcode:props.params.postcode,
            city:props.params.city,
            email:props.params.email,
            phone:props.params.phone
          })
          setTraining({...training.customer, customerLink})
      };
    
      const handleClose = () => {
        setOpen(false);

      };
      const handleInputChange = (event) =>{
        setTraining({...training,
          [event.target.name]:event.target.value
        })
      }

      const addTraining = ()=>{
        props.saveTraining(training);
        handleClose();
      }
      const ChangeDate=(date)=>{
        setTraining({...training.date,date})
      }
      
    return(
    <div>
      <Button  color='primary' onClick={handleClickOpen}>
      <Icon path={mdiNotePlusOutline} size={1} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
            <DialogContent>
            <TextField
                    autoFocus
                    InputProps={{
                        disabled: true,}}
                    margin="dense"
                    name="cust"
                    value={customerdetail.firstname + " "+ customerdetail.lastname}
                    label="Customer Name"
                    fullWidth
                />
                <TextField
                    InputProps={{
                        disabled: true,}}
                    margin="dense"
                    name="customer"
                    value={props.params.links[0].href}
                    label="Customer"
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    label="Date" 
                    name='date'
                    value={training.date}
                    onChange={date => ChangeDate(date)}></DatePicker>
                    </DemoContainer>
                    </LocalizationProvider>
                  
                <TextField
                    type="number"
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={e=>handleInputChange(e)}
                    label="Duration"
                    fullWidth
                />
                <TextField
                  
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={e=>handleInputChange(e)}
                    label="Activity"
                    fullWidth
                />
               
                
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
        </div>
    )

}