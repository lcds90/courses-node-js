import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Users from "../views/Users.vue";
import Edit from "../views/Edit.vue"

function adminAuth(to, from, next){
  if (localStorage.getItem("token") != undefined) {
    let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log(req);
    axios
      .post("http://localhost:8686/validate",{}, req)
      .then((res) => {
        console.log(res);
        next();
      })
      .catch((err) => {
        console.log(err.response);
        next("/"); // sem permissão de adm
      });
  } else {
    next("/login");
  }
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    beforeEnter: adminAuth
  },
  {
    path: "/users/edit/:id",
    name: "UserEdit",
    component: Edit,
    beforeEnter: adminAuth
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
