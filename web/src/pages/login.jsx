import { Block, Button, List, ListInput, BlockTitle } from "framework7-react";
import { Component } from "react";
import { loginWithEmail } from "../services/authsvc";
import "../../css/auth.css";

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onHomeLinkClicked() {
    this.props.updateHeader();
  }

  render() {
    return (
      <div className="page no-toolbar no-swipeback login-screen-page">
        <div className="page-content login-screen-content auth-position">
          <div className="login-screen-title">
            <a href="/" className="link">
              React template
            </a>
          </div>
          <Block strong>
            <form
              onSubmit={this.onLoginWithEmailClicked.bind(this)}
              action=""
              method="GET"
              className="form-ajax-submit"
            >
              <List>
                <ListInput
                  label="Login with your email"
                  type="email"
                  placeholder="Email address"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  required
                ></ListInput>
                <ListInput
                  label="Provide your password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </List>
              <Button fill type="submit">
                Login
              </Button>
              <BlockTitle>No Account yet?</BlockTitle>
              <Button fill href="/signup/">
                Create a new Account
              </Button>
            </form>
          </Block>
        </div>
      </div>
    );
  }

  reNavigate() {
    window.location.href = "/";
  }

  onLoginWithEmailClicked(e) {
    e.preventDefault();
    loginWithEmail(this.state.email, this.state.password)
      .then(() => {
        this.reNavigate();
      })
      .catch((error) => {
        this.props.renderAppElements({ notification: error.message });
      });
  }
}
