import { Page } from "framework7-react";
import { AutoComplete } from "../../components/auto_complete";

export const ListSelect = () => {
  const optionItems = [
    { label: "bar", value: "car" },
    { label: "far", value: "war" },
    { label: "var", value: "bar" },
  ];

  const selectedItem = (item) => {
    console.log("selected item: ", item);
  };

  const handleCreate = (inputValue) => {
    console.log("created value: ", inputValue);
  };

  return (
    <Page>
      <p>AutoComplete</p>
      <div>
        <AutoComplete
          name="testautocomplete"
          options={optionItems}
          defaultValue="car"
          onChange={selectedItem}
          onCreateOption={handleCreate}
        />
      </div>
    </Page>
  );
};
