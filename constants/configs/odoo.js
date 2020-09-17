import Odoo from "react-native-odoo-promise-based";
// import {HOST, DB, PORT, USERNAME, PASSWORD} from 'react-native-dotenv'

const odoo = new Odoo({
  host: "46.101.249.182",
  port: 8069,
  database: "test_db",
  username: "admin",
  password: "simpsuns#",
  protocol: "http",
});

odoo
  .connect()
  .then((response) => {
    console.log(response);
  })
  .catch((e) => {
    console.log(e);
  });

export default odoo;
