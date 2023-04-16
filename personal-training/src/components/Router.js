import './CustomerList';
import Customerapp from './CustomerList';
import './Trainings'
import Trainings from './Trainings';
import HomePage from './HomePage';
import * as React from "react";
import {
BrowserRouter,
Routes,
Route,
Link,
} from "react-router-dom";
/*
export default function Nav(){
    return <BrowserRouter className="navigate">
        <Link to="/CustomerList">Customers</Link>{' '}
        <Link to="/Trainings">Training Sessions</Link>{' '}
        <Link to=' '>HomePage</Link>{' '}
        <Link to='/'>HomePage</Link>{' '}
        <Link to='/HomePage'>HomePage</Link>{' '}

        <Routes>
            <Route path="/CustomerList" element={<Customerapp />} />
            <Route path="/Trainings" element={<Trainings />} />
            <Route path="/HomePage" element={<HomePage />}/>
            <Route exact path="/" element={<HomePage />}/>
        </Routes>
        </BrowserRouter>
}*/