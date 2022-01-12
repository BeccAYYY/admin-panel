import React from "react";
import { UserView } from "./UserView";

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.refreshUsers = this.refreshUsers.bind(this);
  }

  async componentDidMount() {
    await this.refreshUsers();
  }

  async refreshUsers() {
    var url = "http://127.0.0.1/API/API/core.php";
    await fetch(url + "?action=" + "admin_get_users", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data.Data });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="mt-4 overflow-scroll">
        <div className="border-bottom text-center">
          <button onClick={() => this.props.createUser()} className="my-3 text-center">Create New User</button>
        </div>
        {data.map((user, i) => (
          <UserView
            onEdit={() => this.props.onEdit(user.username)}
            key={i}
            data={user}
            action={() => this.refreshUsers()}
          />
        ))}
      </div>
    );
  }
}

export { UsersView };
