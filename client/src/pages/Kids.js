import React, { Component } from "react";
import { Row } from "reactstrap";
import MainContainer from "../components/Container";
import KidsList from "../components/KidsList";
import FilterPublic from "../components/FilterPublic";
import API from "../utils/API";

class Kids extends Component {
    //set the kids state to an empty array
    state = {
        kids: [],
        loading: null
    }
    //on mount call the function to return kids cards
    componentDidMount() {
        this.loadKidsUnsponsored();
    }
    //a function to get several kid profiles from the database
    loadKidsUnsponsored = () => {
        this.setState({
        })
        API.getKidsUnsponsored()
            .then(res =>
                this.setState({
                    kids: res.data,
                })
            )
            .catch(err => console.log(err));
    };

    // Calculate age by using today's date and birthdate
    calculateAge = (dateString) => {
        var today = new Date();
        var birthday = new Date(dateString);
        console.log(today);
        console.log(birthday);
        // Use .getFullYear method to set age variable by subtracting birth year from current year
        var age = today.getFullYear() - birthday.getFullYear();
        // Use .getMonth method to subtract birth month from current month
        var months = today.getMonth() - birthday.getMonth();
        // If months is less than 0 or if months = 0 and days in the current month is less than days in birth month, decrease age by a year
        if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age;
    }

    render() {
        return (
            <MainContainer>
                <Row>
                    <FilterPublic />
                        <KidsList
                            kids={this.state.kids}
                            calculateAge={this.calculateAge}
                        />
                </Row>
            </MainContainer>
        )
    }
}

export default Kids;






