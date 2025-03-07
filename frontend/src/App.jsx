import { useEffect, useState } from 'react'
import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Internship from './Internship'
import Placement from './Placement'
import Home from './Home'
import AddStudent from './AddStudent'
import AddPlacement from './AddPlacement'
import EditStudent from './EditStudent'
import EditPlacement from './EditPlacement'
import SelectEdit from './SelectEdit'
import SinglePlaceEdit from './SinglePlaceEdit'
import StudentDelete from './StudentDelete'
import SinglePlaceDelete from './SinglePlaceDelete'
import BarChart from './Charts/BarChart'
import AddInternship from './AddInternship'
import SelectInternEdit from './SelectInternEdit'
import SingleInternEdit from './SingleInternEdit'
import SingleInternDelete from './SingleInternDelete'
import MainClass from './MainClass'
import ResumeMaker from './ResumeMaker'
import Start from './Start'
import UserLogin from './UserLogin'
import UserDetail from './UserDetail'
import Drive from './Drive'
import DriveList from './DriveList'
import PostJob from './PostJob';
import Modal from 'react-modal';
import UserDashboard from './UserDashboard'
import UserPlacement from './UserPlacement'
import UserInternship from './UserInternship'
import UserDrive from './UserDrive'
import HigherStudies from './HigherStudies'
import AddHigherStudies from './AddHigherStudies'
import Students from './Students'
import DriveEdit from './DriveEdit'

function App() {
  Modal.setAppElement('#root');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<MainClass />}></Route>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/user' element={<UserDashboard />}>
          <Route path='/user/userdetail/:id' element={<UserDetail />}></Route>
          <Route path='/user/placement/:id' element={<UserPlacement />}></Route>
          <Route path='/user/:id/internship' element={<UserInternship />}></Route>
          <Route path='/user/drive' element={<UserDrive />}></Route>
        </Route>

        <Route path='/' element={<Dashboard />}>

          <Route path='/home' element={<Home />}></Route>
          <Route path='/resume' element={<ResumeMaker />}></Route>
          <Route path='/placement' element={<Placement />}></Route>
          <Route path='/student' element={<Students />}></Route>
          <Route path='/internship' element={<Internship />}></Route>
          <Route path='/create' element={<AddStudent />}></Route>
          <Route path='/addplacement' element={<AddPlacement />}></Route>
          <Route path='/addInternship' element={<AddInternship />}></Route>
          <Route path='/addHigherStudies' element={<AddHigherStudies />}></Route>
          <Route path='/studentEdit/:id' element={<EditStudent />}></Route>
          <Route path='/placementEdit/:id' element={<EditPlacement />}></Route>
          <Route path='/selectEdit/:id' element={<SelectEdit />}></Route>
          <Route path='/selectInternEdit/:id' element={<SelectInternEdit />}></Route>
          <Route path='/singleInternEdit/:id/:company' element={<SingleInternEdit />}></Route>
          <Route path='/singlePlaceEdit/:id/:company' element={<SinglePlaceEdit />}></Route>
          <Route path='/singleInternDelete/:id/:company' element={<SingleInternDelete />}></Route>
          <Route path='/driveEdit/:jobtitle/:companyName' element={<DriveEdit />}></Route>
          <Route path='/selectDelete/:id' element={<StudentDelete />}></Route>
          <Route path='/singlePlaceDelete/:id/:company' element={<SinglePlaceDelete />}></Route>\
          <Route path='/chartEx' element={<BarChart />}></Route>
          <Route path='/admin/drive' element={<Drive />}></Route>
          <Route path='/admin/drivePost' element={<DriveList />}></Route>
          <Route path='/admin/higherstudies' element={<HigherStudies />}></Route>

        </Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/userlogin' element={<UserLogin />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
