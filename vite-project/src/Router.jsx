import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to='*'> Go to Users</Link>
        <Link to='home'>GO to Home</Link>
      </header>

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}


function Home(){
  return (
    <h1>Home</h1>
  )
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
        
      </nav>

      <Routes>
        <Route path="me/:id" element={<UserProfile />} />
        <Route path="me" element={<OwnUserProfile />} />
      </Routes>
    </div>
  );
}

function UserProfile(){
  return (
    
    <h1>User PRofile</h1>
  )
}

function OwnUserProfile(){
  return (
    <>
    <h1>KEhinde PRofile</h1>
    <Link to='1'>USer Profile</Link>
    </>
  )
}