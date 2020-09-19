import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles/projectsStyles";

export default function Projects() {
  const list = [
    {
      name: "Project Name Project Name Project Name Project Name",
      customer: "Vice President",
    },
    {
      name: "Project Name",
      customer: "Vice Chairman",
    },
  ];

  return (
    <View>
      {list.map((l, i) => (
        <TouchableOpacity key={i}>
          <ListItem bottomDivider>
            <Ionicons name="ios-briefcase" size={40} color="#7c7bad" />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>Client: {l.customer}</ListItem.Subtitle>
              <ListItem.Subtitle>8 Tasks</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// const [project, setProject] = useState();

// const params = {
//   fields: ["name"],
//   limit: 5,
//   offset: 0,
// };

// odoo
//   .search_read("project.project", params)
//   .then((response) => {
//     // setProject(response);
//     console.log(response);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
