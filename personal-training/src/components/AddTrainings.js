//React imports
import React from 'react';
//Mui imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//Mdi imports
import Icon from '@mdi/react';
import { mdiNotePlusOutline } from '@mdi/js';


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
  
    const[customerLink,setCustomerLink]= React.useState({link:''})
    
    //opening the dialog form 
    //take the data of the customer and set it to the customer const so we can check 
    //that its the correct customer and link the new training to that customer
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
          });
        setCustomerLink({link:props.params.links[0].href.toString()});
        console.log(JSON.stringify(props.params.links[0].href));
        //setTraining({...training.customer,customerLink});
        console.log(customerLink)
      };

    //close the dialog
      const handleClose = () => {
        setOpen(false);
      };

      //mapping the input data to the training const
      const handleInputChange = (event) =>{
        setTraining({...training,
          [event.target.name]:event.target.value
        })
      }

      //use the saveTraining function on CustomerList page via props
      //to save the const training as a new training
      const addTraining = ()=>{
        console.log(training);
        props.saveTraining(training);
        handleClose();
      }
      //handling of the datepicker to set the date picked to the training const
      const ChangeDate=(date)=>{
        setTraining({...training.date,date})
      }
      /*const custLink=(link)=>{
        setTraining({...training.customer,link})
      }*/

    return(
     <div>
      <Button  
        color='primary' 
        onClick={handleClickOpen}>
        <Icon 
          path={mdiNotePlusOutline} 
          size={1} 
          />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New Training
        </DialogTitle>
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
          <Button 
            onClick={handleClose}>
              Cancel
          </Button>
          <Button 
          onClick={addTraining}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )

}