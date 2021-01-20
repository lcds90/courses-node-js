var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");
class User {
  async findAll() {
    try {
      var result = await knex
        .select(["id", "name", "email", "role "])
        .table("users");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    try {
      var result = await knex
        .select(["id", "name", "email", "role "])
        .where({ id: id })
        .table("users");
      if (result.length) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async findByEmail(email) {
    try {
      var result = await knex
        .select(["id", "name", "password", "email", "role"])
        .where({ email: email })
        .table("users");
      if (result.length) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async findEmail(email) {
    try {
      var result = await knex.select("*").from("users").where({ email: email });
      //   console.log(result);
      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async delete(id) {
    var user = await this.findById(id);
    if (user != undefined) {
      try {
        await knex.delete().where({ id: id }).table("users");
        return { status: true };
      } catch (error) {
        return { status: false, err: err };
      }
    } else {
      return { status: false, err: "Usuario inexistente" };
    }
  }

  async new(email, name, password) {
    try {
      var hash = await bcrypt.hash(password, 10);
      await knex
        .insert({
          email,
          password: hash,
          name,
          role: 0,
        })
        .table("users");
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, email, name, role) {
    var user = await this.findById(id);
    if (user != undefined) {
      var editUser = {};
      if (email != undefined) {
        if (email != user.email) {
          var result = await this.findEmail(email);
          if (!result) {
            editUser.email = email;
          } else {
            return { status: false, err: "Email ja cadastrado" };
          }
        }
      }
      if (name != undefined) {
        editUser.name = name;
      }

      if (role != undefined) {
        editUser.role = role;
      }
      try {
        await knex.update(editUser).where({ id: id }).table("users");
        return { status: true };
      } catch (error) {
        return { status: false, err: error };
      }
    } else {
      return { status: false, err: "Usuario inexistente" };
    }
  }

  async updatePassword(newPassword, id, token) {
    var hash = await bcrypt.hash(newPassword, 10);
    await knex.update({ password: hash }).where({ id: id }).table("users");
    await PasswordToken.setUsed(token);
  }
}

module.exports = new User();
