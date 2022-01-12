import { UsersView } from "./Components/Views/UsersView";
import { UserForm } from "./Components/Forms/UserForm.jsx";
import { UserEditForm } from "./Components/Forms/UserEditForm";
import { LoginForm } from "./Components/Forms/LoginForm";
import { url } from "./Utils/form-submit";
import { Header } from "./Components/Header.jsx";
import { logout } from "./Utils/logout";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      currentPage: "UserList",
    };
  }

  componentDidMount() {
    this.refreshLoginState();
  }

  refreshLoginState() {
    fetch(url + "?action=admin_login_check", {
      credentials: "include",
    }).then((response) => {
      this.setState({ isLoggedIn: response.ok });
    });
  }

  switchToEditing(username) {
    this.setState({ currentPage: "UserEdit", editingUsername: username });
  }

  switchToUserList() {
    this.setState({ currentPage: "UserList", editingUsername: null });
  }

  switchToCreating() {
    this.setState({ currentPage: "UserCreate", editingUsername: null });
  }

  renderLoggedInView() {
    const { currentPage, editingUsername } = this.state;
    switch (currentPage) {
      case "UserList":
        return (
          <UsersView
            onEdit={(username) => this.switchToEditing(username)}
            createUser={() => this.switchToCreating()}
          />
        );
      case "UserCreate":
        return <UserForm onExit={() => this.switchToUserList()} />;
      case "UserEdit":
        return (
          <UserEditForm
            onExit={() => this.switchToUserList()}
            username={editingUsername}
          />
        );
      default:
        throw new Error("Invalid state");
    }
  }

  renderLoggedOutView() {
    return <LoginForm onSuccess={() => this.refreshLoginState()} />;
  }

  async logout() {
    await logout();
    this.refreshLoginState();
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <>
        <Header logout={() => this.logout()} />
        {isLoggedIn ? this.renderLoggedInView() : this.renderLoggedOutView()}
      </>
    );
  }
}

export { App };

// ========================================
