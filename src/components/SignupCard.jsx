import { Component } from "react";

class SignupCard extends Component {
    constructor(props) {
        super(props);
        this.toggleClass=this.toggleClass.bind(this);
        this.state = {
            active: false,
        };
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    
    render () {
        let isActive = this.state.active
        console.log(this.props.user.latest_waiver);
        return (
            <div className={isActive ? "signup-card-selected" : "signup-card"}
                 onClick={this.toggleClass}>
                <h1 className="text-xl pt-2">
                    <b>Student Name/Pronouns:</b> {this.props.user.name_pronouns}
                </h1>
                <p>Email: {this.props.user.email}</p>
                <p>Phone Number: {this.props.user.phone_number}</p>
                <p>Signup Time: {(new Date (this.props.user.signup_time)).toLocaleString("en-US")}</p>
                <p>Earliest Depart Time: {this.props.user.earliest_depart_time}</p>
                <p>Latest Waiver uploaded on: {this.props.user.latest_waiver !== null ? (new Date(this.props.user.latest_waiver)).toLocaleString() : "no waiver on record"}</p>
                <p>Allergies / Dietary: {this.props.user.allergies_dietary}</p>
                <p>Missings Items: {this.props.user.missing_items}</p>
                <p>Comments & Questions: {this.props.user.comments_questions}</p>
            </div>
        );
    };
}

export default SignupCard;