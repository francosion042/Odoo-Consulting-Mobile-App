import Odoo from "react-native-odoo-promise-based";

const odoo = new Odoo({
  host: "46.101.249.182",
  port: 8069,
  database: "test_db",
  username: "admin",
  password: "simpsuns#",
  protocol: "http",
});

export default odoo;
