import React from "react";
import { Link, Route } from "react-router-dom";
import Add from "./directory/add";
import List from "./directory/list";
import Edit from "./directory/edit";

const Header = () => {
    return(
      <div className="col-lg-12 col-md-12">
          <div className="page-header">
              <h1>Employee Management System</h1>
          </div>
          <Link className="btn btn-info" to="/">Listings</Link>&nbsp;
          <Link className="btn btn-info" to="/Add">Add New Employee</Link>
          <Route exact path="/" component={List} />
          <Route path="/add" component={Add} />
          <Route path="/edit/:id" component={Edit} />
      </div>
    );
}

export default Header;