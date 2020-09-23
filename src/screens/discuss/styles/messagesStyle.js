import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  avatar: {
    borderRadius: 20,
    width: 30,
    height: 30,
  },
  author: {
    fontSize: 12,
  },
  date: {
    fontSize: 8,
  },
  subject: {
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee",
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 15,
    flex: 1,
  },
  send: {
    alignSelf: "center",
    color: "lightseagreen",
    fontSize: 16,
    fontWeight: "bold",
    padding: 12,
    borderLeftWidth: 1,
    borderLeftColor: "#b9bcbe",
  },
});

export default styles;
