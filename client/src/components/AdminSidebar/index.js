import React from "react";
import { Col, ListGroup, ListGroupItem } from "reactstrap";
import AdminMasterSidebar from "../AdminMasterSidebar"
import "./style.css";

// Sidebar for admin page that shows regular admin tools
function AdminSidebar(props) {
  return (
    <Col xs="2" className="p-0 m-0">
      <div className="label">
        <h6 className="text-uppercase text-center p-2 mb-0 label-text">Admin tools</h6>
      </div>
      <ListGroup>
          {/* Add a child displays AddKidForm to be filled out */}
          <ListGroupItem onClick={props.onClickAddKid} tag="button" action>Add a child</ListGroupItem>
          
          {/* Update child displays AdminKidSearch, which lets the admin search for a child */}
          <ListGroupItem onClick={props.onClickKidSearch} tag="button" action>Update child
            <ul>
              <li>Update info</li>
              <li>Connect to donor</li>
              <li>Remove child</li>
            </ul>
          </ListGroupItem>

          {/* View all children, sponsored/unsponsored/both */}
          <ListGroupItem onClick={props.onClickMultipleKidSearch} tag="button" action>View Children</ListGroupItem>
      </ListGroup>
      
      {/* Display, pass props to master admin sidebar */}
      <AdminMasterSidebar 
        onClickAddDonor={props.onClickAddDonor}
        onClickAddAdmin={props.onClickAddAdmin}
        onClickAdminSearch={props.onClickAdminSearch}
        onClickShowDonors={props.onClickShowDonors} 
        onClickShowAdmins={props.onClickShowAdmins} 
      />
    </Col>
    
  )
}

export default AdminSidebar