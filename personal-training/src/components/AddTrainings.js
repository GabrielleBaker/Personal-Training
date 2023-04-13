import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mdi/react';
import { mdiNotePlusOutline } from '@mdi/js';
  
export default function AddTraining(props){
    const [open, setOpen] = React.useState(false);

   //get customer from props to display name in new training dialog
    const [customer,setCustomer]=React.useState({
        firstname:'', 
        lastname:'', 
    });
    //create link to customer id
    const[customerLink,setCustomerLink]=React.useState('');
    
    const[training,setTraining]= React.useState({
        date:'',
        duration:'',
        activity:'',
        customer:'',
    });

    const handleClickOpen = () => {
        setOpen(true);
        setCustomerLink(props.params.links[0].href)
        setCustomer({
            firstname:props.params.firstname, 
            lastname:props.params.lastname,
          })
          //issues setting the link as customer
          setTraining({[training.customer] : customerLink})
          console.log(training.customer)
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

      
    return(
    <div>
      <Button style={{margin:10,padding:10,float:'right'}} variant="contained" color='primary' onClick={handleClickOpen}>
      <Icon path={mdiNotePlusOutline} size={1} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
            <DialogContent>
            <TextField
                    autoFocus
                    InputProps={{
                        readOnly: true,}}
                    margin="dense"
                    name="customer"
                    value={customer.firstname + " "+ customer.lastname}
                    label="Customer"
                    fullWidth
                />
                <TextField
                    
                    margin="dense"
                    name="date"
                    value={training.date}
                    onChange={e=>handleInputChange(e)}
                    label="Date"
                    fullWidth
                />
                <TextField
                    
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