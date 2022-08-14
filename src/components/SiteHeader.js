import React from "react";
import { Link } from "react-router-dom";
import School from "../assets/School.svg"
class SiteHeader extends React.Component
{










  render(){
  return (
    <div className="site-header">
    
    <div className="Header-div">
      <img className="img-school" src={School} alt="school">
      </img>
<div className="SiteHedaer-div">
<Link className="Link-to-Page" to="/">
   <div> Home Page</div>
   
  </Link>
 
  <Link className="Link-to-Page" to="/AddNewStudent/"> <div>Add new student</div></Link>
  <Link className="Link-to-Page" to=""> <div>Contact</div></Link>
  <Link className="Link-to-Page" to=""> <div>About</div></Link>
</div>
</div>
    </div>
  );
}
}

export default SiteHeader;
