import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./style.css";

// Sidebar to show tools for master admins
function AdminMasterSidebar(props) {
  return (
    <div>
      <div className="label">
        <h6 className="text-uppercase text-center p-2 mb-0 label-text">Master Admin tools</h6>
      </div>
      <ListGroup>
          <ListGroupItem onClick={props.onClickAddDonor} tag="button" action>Add donor</ListGroupItem>
          <ListGroupItem onClick={props.onClickAddAdmin} tag="button" action>Add admin</ListGroupItem>
          <ListGroupItem onClick={props.onClickAdminSearch} tag="button" action>Update admin</ListGroupItem>
      </ListGroup>
    </div>    
  )
}

export default AdminMasterSidebar;