import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OdooConfig } from "../../../constants/configs";
import { AuthContext, ProjectsContext, TasksContext } from "../../contexts";
import { LoadingScreen } from "../../commons";

export default function Projects({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const { addProjects, projects } = useContext(ProjectsContext);
  const { addTasks } = useContext(TasksContext);

  useEffect(() => {
    const Odoo = new OdooConfig(user.email, user.password);

    Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          const params = {
            fields: ["name", "partner_id", "task_count"],
          };

          Odoo.odoo
            .search_read("project.project", params)
            .then((response) => {
              addProjects(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
          setIsLoading(false);
          //////////////////////////////////////////////
          // get all tasks and add them to  the tasks context. this will make it easier to navigate between projects
          const params2 = {
            // domain: [["project_id", "=", project_id]],
            fields: [
              "name",
              "project_id",
              "user_id",
              "stage_id",
              "date_deadline",
            ],
          };

          Odoo.odoo
            .search_read("project.task", params2)
            .then((response) => {
              addTasks(response.data);
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
          ///////////////////////////////////////////////////
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  ///////////////////////////////////////////////////////////////////////
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <ScrollView>
        {projects.map((p, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.navigate("projectTasks", { project_id: p.id })
            }>
            <ListItem bottomDivider>
              <Ionicons name="ios-briefcase" size={40} color="#7c7bad" />
              <ListItem.Content>
                <ListItem.Title>{p.name}</ListItem.Title>
                <ListItem.Subtitle>
                  Client: {p.partner_id ? p.partner_id[1] : "Annonymous"}
                </ListItem.Subtitle>
                <ListItem.Subtitle>{p.task_count} Tasks</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
