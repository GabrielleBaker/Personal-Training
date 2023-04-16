import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    } from "react-router-dom";
const theme = createTheme({
    palette: {
      primary: {
        light: '#ffccff',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  <BrowserRouter className="navigate">
        <Link to="/CustomerList">Customers</Link>{' '}
        <Link to="/Trainings">Training Sessions</Link>{' '}
  
        </BrowserRouter>

export default function HomePage(){
    const itemData = [
        {
          img: '/training3.jpg',
          title: 'Trainings',
          href:"/Trainings",
        },
        {
          img: '/customers.jpg',
          title: 'Customers',
          href:"/Customers"
        },
        {
          img: 'stats2.jpg',
          title: 'Statistics',
        },
        {
          img: 'calendar.jpg',
          title: 'Calendar',
        }
      ];
    return(
        <div>
            <h2>Welcome</h2>
        <Container margins="auto" maxWidth="90%" align="center" >
            <ImageList sx={{ width: 550, height: 500 }} cols={2} rowHeight={200}>
                {itemData.map((item) => (
                <ImageListItem key={item.img} component="a" href={item.href}>
                    <text>{item.title}</text>
                   <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    /> 
                </ImageListItem>
        ))}
            </ImageList>
        </Container>
        </div>
       
    )
}
