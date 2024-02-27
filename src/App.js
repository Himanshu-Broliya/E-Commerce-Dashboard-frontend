import { Route, Routes } from "react-router-dom";
import Header from "./Components/Common/Header";
import Signup from "./Components/Signup";
import PrivateComponent from "./Components/PrivateComponent";
import Products from "./Components/Products";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import PageNotFound from './Components/PageNotFound';

function App() {
  return (
    <div >
      
      <Header/>

      <Routes>
        <Route element={<PrivateComponent/>}>
          <Route index element={<Products/>}/>
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/update/:id"  element={<UpdateProduct/>}/>
          <Route path="/profile"  element={<Profile/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
