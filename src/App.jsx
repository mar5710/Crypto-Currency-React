import { useState } from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import Home from './page/home'
import SingleProduct from './page/singleProduct/singleProduct'

function App() {

  return (
		<>
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path='/:id' element={<SingleProduct />} />
			</Routes>
		</>
	)
}

export default App
