import { Component } from "react";
import { List, ListInput, Page } from "framework7-react";
import { upsertItem, getItem } from "../../services/itemapi";
import { Form } from "../../components/form_component";
import { SUCCESSUPDATE } from "../../constants";

export class ItemPage extends Component {
  constructor(props) {
    super(props);

    this.itemId = this.props.f7route.params.itemId;

    this.state = {};

    if (!this.itemId) {
      this.state = {
        item: {
          itemid: "",
          name: "",
          type: "",
          hsn: "",
          sac: "",
          gst: "",
          igst: "",
        },
      };
    }
  }

  async componentDidMount() {
    if (this.itemId) {
      try {
        const item = await this.props.task(getItem(this.itemId));
        this.setState({ item });
      } catch {}
    }
  }

  handleSubmit = async (item) => {
    try {
      const response = await this.props.task(
        upsertItem(
          this.itemId,
          item.name,
          item.type,
          item.hsn,
          item.sac,
          item.gst,
          item.igst
        )
      );

      this.props.renderAppElements({ notification: SUCCESSUPDATE });
      this.itemId = response.itemid;
      history.replaceState({}, "", `/items/${this.itemId}`);
      this.setState({ item });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  render() {
    return (
      <Page>
        {this.state.item && (
          <Form onSubmit={this.handleSubmit}>
            <List>
              <ListInput
                label="Name"
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={this.state.item.name}
                required
              ></ListInput>
              <ListInput
                label="Type"
                type="text"
                name="type"
                placeholder="Type"
                defaultValue={this.state.item.type}
              ></ListInput>
              <ListInput
                label="HSN"
                type="number"
                name="hsn"
                placeholder="HSN"
                defaultValue={this.state.item.hsn}
              ></ListInput>
              <ListInput
                label="SAC"
                type="number"
                name="sac"
                placeholder="SAC"
                defaultValue={this.state.item.sac}
              ></ListInput>
              <ListInput
                label="GST"
                type="number"
                name="gst"
                placeholder="GST"
                defaultValue={this.state.item.gst}
              ></ListInput>
              <ListInput
                label="IGST"
                type="number"
                name="igst"
                placeholder="IGST"
                defaultValue={this.state.item.igst}
              ></ListInput>
            </List>
          </Form>
        )}
      </Page>
    );
  }
}
