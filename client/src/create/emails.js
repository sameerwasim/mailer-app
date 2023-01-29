import { Create, SimpleForm, TextInput, required, email } from "react-admin";

export const EmailCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="email" validate={[required(), email()]} fullWidth />
      <TextInput source="group" validate={[required()]} label="Group e.g, CityBook - Sale Group" fullWidth />
    </SimpleForm>
  </Create>
);

export default EmailCreate;
