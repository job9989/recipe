import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu'
import  Veg from './components/Veg'
import Non_veg from './components/Non_veg';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu/>}/>
        <Route path='Veg/' element={<Veg/>}/>
        <Route path='Non_veg/' element={<Non_veg/>}/>
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
