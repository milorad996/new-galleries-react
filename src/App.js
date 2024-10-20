import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllGalleries from './pages/AllGalleries';
import Register from './pages/Register';
import ViewGallery from './pages/ViewGallery';
import Login from './pages/Login';
import AuthorGalleries from './pages/AuthorGalleries';
import MyGalleries from './pages/MyGalleries';
import NavbarComponent from './components/Navbar';
import CreateNewGallery from './pages/CreateNewGallery';




function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />

        <Routes>
          <Route exact path='/' element={<AllGalleries />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/galleries/:id' element={<ViewGallery />} />
          <Route exact path='/authors/:id' element={<AuthorGalleries />} />
          <Route exact path='/my-galleries' element={<MyGalleries />} />
          <Route exact path='/create' element={<CreateNewGallery />} />
          <Route exact path='/edit/:id' element={<CreateNewGallery />} />



        </Routes>
      </div>
    </Router>
  );
}


export default App;
