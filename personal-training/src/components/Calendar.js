import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth';
import Container from '@mui/material/Container';
// code adapted from
//https://fullcalendar.io/docs
//https://www.youtube.com/watch?v=X2zLbKimvQQ
function Calendar() {
    return (
      <div>
        <Container
            sx={{
                backgroundColor:'white',
                maxWidth:'90%',
                margins:"auto" ,
                borderRadius: '25px',
                padding:3
                }}>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,multiMonthPlugin]}
          initialView={"dayGridMonth"}
          selectable='true'
          headerToolbar={{
            start: "today prev,next", 
            center: "title",
            end: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear", 
          }}
          events={[
            { title: 'event 1', date: '2023-04-01' },
            { title: 'event 2', date: '2023-04-17' }
          ]}
          height={"80vh"}
          
           />
      </Container>
      </div>
      
    );
  }
  
  export default Calendar;