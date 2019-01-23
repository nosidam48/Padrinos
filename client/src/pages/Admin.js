import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import AddKidForm from "../components/AddKidForm";
import AdminSidebar from "../components/AdminSidebar";
import AdminKidSearch from "../components/AdminKidSearch";
import AdminMultipleKids from "../components/AdminMultipleKidList";
import AdminDonorSearch from "../components/AdminDonorSearch";
import AddAdmin from "../components/AddAdmin";
import AdminKidList from "../components/AdminKidList";
import AddDonorForm from "../components/AddDonorForm";
import AdminSearch from "../components/AdminSearch";
import AdminList from "../components/AdminList";
import ConnectDonorModal from "../components/ConnectDonorModal";
import MainContainer from "../components/Container";
import AdminMasterSidebar from "../components/AdminMasterSidebar";

class Admin extends Component {
    state = {
        showAddKidForm: false,
        showKidSearch: false,
        showMultipleKids: false,
        showAddDonorForm: false,
        showAddAdmin: false,
        showAdminSearch: false
    };

    // Toggles display of form to add a kid
    toggleAddKidForm = () => {
        this.setState({
            showAddKidForm: !this.state.showAddKidForm,
            showKidSearch: false,
            showMultipleKids: false,
            showAddDonorForm: false,
            showAddAdmin: false,
            showAdminSearch: false
        });
    }
    // Lets admin search for specific kid
    showKidSearch = () => {
        this.setState({
            showKidSearch: true,
            showAddKidForm: false,
            showMultipleKids: false,
            showAddDonorForm: false,
            showAddAdmin: false,
            showAdminSearch: false
        })
    }
    // Lets admin search for group of kids
    showMultipleKids = () => {
        this.setState({
            showMultipleKids: true,
            showKidSearch: false,
            showAddKidForm: false,
            showAddDonorForm: false,
            showAddAdmin: false,
            showAdminSearch: false
        })
    }
    // Toggles display of form to add a donor
    toggleAddDonorForm = () => {
        this.setState({
            showAddKidForm: false,
            showKidSearch: false,
            showMultipleKids: false,
            showAddDonorForm: !this.state.showAddDonorForm,
            showAddAdmin: false,
            showAdminSearch: false
        });
    }
    // Toggles display of form to add a donor
    toggleAddAdmin = () => {
        this.setState({
            showAddKidForm: false,
            showKidSearch: false,
            showMultipleKids: false,
            showAddDonorForm: false,
            showAddAdmin: !this.state.showAddAdmin,
            showAdminSearch: false
        });
    } 
    // Lets admin search for admin
    showAdminSearch = () => {
        console.log("this worked")
        this.setState({
            showKidSearch: false,
            showAddKidForm: false,
            showMultipleKids: false,
            showAddDonorForm: false,
            showAddAdmin: false,
            showAdminSearch: true
        })
    }
    
    render() {
        return (
            <MainContainer>
                <Row>
                    {/* Displays the AdminSidebar with needed props */}
                    <AdminSidebar 
                        onClickAddKid={this.toggleAddKidForm}
                        onClickKidSearch={this.showKidSearch}
                        onClickMultipleKidSearch={this.showMultipleKids} 
                        onClickAddDonor={this.toggleAddDonorForm}
                        onClickAddAdmin={this.toggleAddAdmin}
                        onClickAdminSearch={this.showAdminSearch}
                    />
                    <Col xs="10" className="px-5">
                        {/* Shows AddKidForm if true and passes onClick to AddKidForm button */}
                        {this.state.showAddKidForm ? 
                            <AddKidForm onClickAddKid={this.toggleAddKidForm} /> :
                            null
                        }
                        {/* Shows kid search bar if true */}
                        {this.state.showKidSearch ? 
                            <AdminKidSearch /> :
                            null
                        }
                        {/* <AdminKidList /> */}
                        
                        {/* Shows multiple kids  */}
                        {this.state.showMultipleKids ?
                            <AdminMultipleKids /> : 
                            null
                        }
                        {/* Shows form to add donor */}
                        {this.state.showAddDonorForm ?
                            <AddDonorForm 
                                onClickAddDonor={this.toggleAddDonorForm}
                            /> : 
                            null
                        }
                        {/* Shows form to add admin */}
                        {this.state.showAddAdmin ? 
                            <AddAdmin 
                                onClickAddAdmin={this.toggleAddAdmin}
                            /> :
                            null
                        }
                        {/* Shows admin search bar*/}
                        {this.state.showAdminSearch ? 
                            <AdminSearch 
                                onClickAdminSearch={this.showAdminSearch}
                            /> :
                            null
                        }
                        {/* <AdminList /> */}

                        {/* <AdminDonorSearch /> */}
                        {/* <ConnectDonorModal /> */}
                    </Col>
                </Row>
            </MainContainer>
        )
    } 
}

export default Admin;






