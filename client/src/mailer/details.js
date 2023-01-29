import { useNavigate } from "react-router-dom";
import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, Button } from "react-admin";

const Details = (props) => {
  const navigate = useNavigate();
  const back = () => navigate("/mailers");

  const ListActions = (props) => {
    const { className } = props;
    return (
      <TopToolbar className={className}>
        <Button onClick={back} label="Back" />
        <CreateButton resource="mailers" />
        <ExportButton />
      </TopToolbar>
    );
  };

  return (
    <List actions={<ListActions />} perPage="50" resource="logs" filter={props.id ? { id: props.id } : { group: props?.data?.group || 0, mailer: props?.data?.id || 0 }}>
      <Datagrid>
        <TextField source="email" />
        <TextField source="status" />
      </Datagrid>
    </List>
  );
};

export default Details;
