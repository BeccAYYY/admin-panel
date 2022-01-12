import React from "react";
import { deleteUser } from "../../Utils/delete-user";

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastAction: [] };
  }
  
  componentDidMount() {
    this.setLastActive()
  }

  setLastActive() {
    if (this.props.data.lastAction == null) {
      this.setState({
        lastAction: "Never",
    })
    } else {
      this.setState({lastAction: this.props.data.lastAction})
    }
  }

  async delete_user () {
    await deleteUser(this.props.data.username);
    this.props.action();
  }


  render() {
    const {lastAction} = this.state;
    return (
      <div className="my-0 border-bottom row justify-content-stretch mx-0 w-100">
        <div className="col-7 d-flex flex-column justify-content-center align-items-center pe-0">
          <h5>{this.props.data.username}</h5>
          <div className="d-flex justify-content-center w-100">
            <button className="secondary-text w-25 me-1" onClick={() => this.props.onEdit()}>Edit</button>
            <button className="secondary-text w-25 ms-1" onClick={()=>this.delete_user()}>Delete</button>
          </div>
        </div>
        <div className="col mt-3">
          <p className="secondary-text">Joined: {this.props.data.dateCreated}</p>
          <p className="secondary-text">
            Last Active: {lastAction}
          </p>
        </div>
      </div>
    );
  }
}

export { UserView };
