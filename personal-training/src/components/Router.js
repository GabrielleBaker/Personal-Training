import './CustomerList';
import Customerapp from './CustomerList';
import './Trainings'
import Trainings from './Trainings';
import * as React from "react";
import {
BrowserRouter,
Routes,
Route,
Link,
Navigate
} from "react-router-dom";

export default function Nav(){
    return <BrowserRouter className="navigate">
        <Link to="/CustomerList">Customers</Link>{' '}
        <Link to="/Trainings">Training Sessions</Link>{' '}
        <Routes>
            <Route path="/CustomerList" element={<Customerapp />} />
            <Route path="/Trainings" element={<Trainings />} />
        </Routes>
        </BrowserRouter>
}