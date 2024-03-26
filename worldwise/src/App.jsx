import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom"

import HomePage from "./pages/HomePage"
import Pricing from "./pages/Pricing"
import Product from "./pages/Product"
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import CityList from "./components/CityList"
import City from './components/City';
import Form from "./components/Form"
import PageNotFound from "./pages/PageNotFound"
import CountryList from "./components/CountryList"
import { CitiesProvider } from "./contexts/citiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRout from "./pages/ProtectedRout"



function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={
              <ProtectedRout>
                <AppLayout />
              </ProtectedRout>}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
