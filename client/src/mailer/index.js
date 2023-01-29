import { useNavigate, useSearchParams } from "react-router-dom";
import { List, TopToolbar, CreateButton, ExportButton, Datagrid, TextField, DateField } from "react-admin";
import Details from "./details";

export const Mailer = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onGoing = searchParams.get("onGoing"),
    id = searchParams.get("id");

  const edit = (id) => {
    navigate("/mailers?onGoing=true&id=" + id);
  };

  const ListActions = (props) => {
    const { className } = props;
    return (
      <TopToolbar className={className}>
        <CreateButton resource="mailers" />
        <ExportButton />
      </TopToolbar>
    );
  };

  return onGoing && id ? (
    <Details id={id} />
  ) : (
    <List hasCreate={true} actions={<ListActions />} {...props} resource="mailers">
      <Datagrid rowClick={edit}>
        <TextField source="id" />
        <TextField source="status" />
        <DateField source="created" />
      </Datagrid>
    </List>
  );
};

export default Mailer;
