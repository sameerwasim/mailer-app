import { Edit, SimpleForm, TextInput, email, required } from "react-admin";

export const EmailEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" fullWidth />
      <TextInput source="email" validate={[required(), email()]} fullWidth />
      <TextInput source="group" validate={[required()]} label="Group e.g, CityBook - Sale Group" fullWidth />
    </SimpleForm>
  </Edit>
);

export default EmailEdit;
