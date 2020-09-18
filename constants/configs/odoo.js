import Odoo from "react-native-odoo-promise-based";

class OdooConfig {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.odoo = new Odoo({
      host: "46.101.249.182",
      port: 8069,
      database: "test_db",
      username: this.email,
      password: this.password,
      protocol: "http",
    });
  }
}

export default OdooConfig;

//email : admin
// password : simpsuns#
