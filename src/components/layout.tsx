import React from "react";
import "./layout.css"; 
import Navbar from "./navbar"; 
import Footer from "./footer"; 

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content">
        {children}
        
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
