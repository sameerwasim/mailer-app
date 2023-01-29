import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Create, SimpleForm, SelectInput, TextInput, Loading, required, email, PasswordInput } from "react-admin";
import axios from "axios";
import config from "../config";
import Details from "./details";

const providers = [{ id: "GG", name: "Google / Gmail" }];

export const Mailer = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [onGoing, setOnGoing] = useState(false);
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getMailer();
    getGroups();
    getTemplates();
  }, [search]);

  const getMailer = () => {
    axios.get(config.apiUrl + "mailer", { headers: { "x-access-token": localStorage.getItem("token") } }).then((res) => {
      const { data } = res;
      if (data && data.length) {
        setOnGoing(data[0]);
      }
      setLoading(false);
    });
  };

  const getGroups = () => {
    axios.get(config.apiUrl + "groups", { headers: { "x-access-token": localStorage.getItem("token") } }).then((res) => {
      const { data } = res;
      if (data && data.length) setGroups(data);
    });
  };

  const getTemplates = () => {
    axios.get(config.apiUrl + "users/templates", { headers: { "x-access-token": localStorage.getItem("token") } }).then((res) => {
      const { data } = res;
      if (data && data.length) setTemplates(data);
    });
  };

  return loading ? (
    <Loading loadingPrimary="Loading" loadingSecondary="Checking, if you have any on-going mailer process" />
  ) : onGoing ? (
    <Details data={onGoing} />
  ) : (
    <Create redirect="/mailers?onGoing=true" resource="mailer">
      <SimpleForm>
        <SelectInput source="group" validate={[required()]} choices={groups} fullWidth />
        <SelectInput source="template" validate={[required()]} choices={templates} fullWidth />
        <SelectInput source="provider" validate={[required()]} choices={providers} fullWidth />
        <TextInput source="email" validate={[required(), email()]} fullWidth />
        <PasswordInput source="password" validate={[required()]} fullWidth />
        <small>Less secure needs to be turned on for the system to work*</small>
      </SimpleForm>
    </Create>
  );
};

export default Mailer;
