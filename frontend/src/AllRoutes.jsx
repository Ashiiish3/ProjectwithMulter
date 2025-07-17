import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import EditNote from './page/EditNote'
import CreateNote from './page/CreateNote'

export default function AllRoutes() {
  return (
    <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/editnote/:id"} element={<EditNote />} />
        <Route path={"/createNote"} element={<CreateNote />} />
        <Route path={"*"} element={<h1>no page found.</h1>} />
    </Routes>
  )
}
