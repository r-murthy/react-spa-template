import { Block, Button, List, ListInput } from "framework7-react";
import { Component } from "react";
import {
  signInWithGoogle,
  signUpWithEmail,
  updateUserProfile,
} from "../services/authsvc";
import "../../css/auth.css";

export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
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
          <Block>
            <form
              onSubmit={this.onSignupWithEmailClicked.bind(this)}
              action=""
              method="GET"
              className="form-ajax-submit"
            >
              <List className="login-list">
                <ListInput
                  label="Name"
                  type="text"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
                <ListInput
                  label="Signup with your email"
                  type="email"
                  placeholder="Email address"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
                <ListInput
                  label="Signup your password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </List>
              <Button fill type="submit">
                Signup
              </Button>
            </form>
            <Block>
              <Button fill onClick={this.onSignupWithGoogleClicked.bind(this)}>
                Sign in with Google
              </Button>
            </Block>
          </Block>
        </div>
      </div>
    );
  }

  reNavigate() {
    window.location.href = "/";
  }
  
  async onSignupWithGoogleClicked(e) {
    e.preventDefault();
    try {
      await signInWithGoogle();
      this.reNavigate();
    } catch (err) {
      this.props.renderAppElements({ notification: err.message });
    }
  }

  async onSignupWithEmailClicked(e) {
    e.preventDefault();
    if (!this.state.name) {
      this.props.renderAppElements({ notification: "please enter user name!" });
      return;
    }
    try {
      const userCredential = await signUpWithEmail(
        this.state.email,
        this.state.password
        );
      await updateUserProfile(userCredential.user, this.state.name);
      this.reNavigate();
    } catch (err) {
      this.props.renderAppElements({ notification: err.message });
    }
  }
}
