import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
  
export default function AddCustomer(props){
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer]= React.useState({
        firstname:'', 
        lastname:'', 
        streetaddress:'', 
        postcode:'', 
        city:'', 
        email:'', 
        phone:''
    })

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleInputChange = (event) =>{
        setCustomer({...customer,
          [event.target.name]:event.target.value
        })
      }

      const addCustomer = ()=>{
        props.saveCustomer(customer);
        handleClose();
      }

      
    return(
    <div>
      <Button style={{margin:10,padding:10,float:'right'}} variant="contained" color='primary' onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={e=>handleInputChange(e)}
                    label="Firstname"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={e=>handleInputChange(e)}
                    label="Lastname"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={e=>handleInputChange(e)}
                    label="Street Address"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={e=>handleInputChange(e)}
                    label="Post Code"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="city"
                    value={customer.city}
                    onChange={e=>handleInputChange(e)}
                    label="City"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={e=>handleInputChange(e)}
                    label="Email"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={e=>handleInputChange(e)}
                    label="Phone"
                    fullWidth
                />
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
        </div>
    )

}