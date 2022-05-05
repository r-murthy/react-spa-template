import { Component } from "react";
import { List, ListInput, Page } from "framework7-react";
import { upsertCustomer, getCustomer } from "../../services/custapi";
import { Form } from "../../components/form_component";
import { SUCCESSUPDATE } from "../../constants";

export class CustomerPage extends Component {
  constructor(props) {
    super(props);

    this.customerId = this.props.f7route.params.customerId;
    
    this.state = {};

    if (!this.customerId) {
      this.state = {
        customer: {
          name: "",
          email: "",
          phone: "",
          gstin: "",
        },
      };
    }
  }

  async componentDidMount() {
    if (this.customerId) {
      try {
        const customer = await this.props.task(getCustomer(this.customerId));
        this.setState({ customer });
      } catch {}
    }
  }

  handleSubmit = async (customer) => {
    try {
      const response = await this.props.task(
        upsertCustomer(
          this.customerId,
          customer.name,
          customer.email,
          customer.phone,
          customer.gstin
        )
      );

      this.props.renderAppElements({ notification: SUCCESSUPDATE });
      this.customerId = response.customerid;
      history.replaceState({}, "", `/customers/${this.customerId}`);
      this.setState({ customer });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  render() {
    return (
      <Page>
        {this.state.customer && (
          <Form onSubmit={this.handleSubmit}>
            <List>
              <ListInput
                label="Name"
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={this.state.customer.name}
                required
              ></ListInput>
              <ListInput
                label="Email"
                type="email"
                name="email"
                placeholder="Email address"
                defaultValue={this.state.customer.email}
                required
              ></ListInput>
              <ListInput
                label="Phone number"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                defaultValue={this.state.customer.phone}
                required
              ></ListInput>
              <ListInput
                label="GSTIN"
                type="text"
                name="gstin"
                placeholder="GSTIN"
                defaultValue={this.state.customer.gstin}
                required
              ></ListInput>
            </List>
          </Form>
        )}
      </Page>
    );
  }
}
