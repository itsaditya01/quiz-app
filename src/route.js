import login from "./components/login";
import signup from "./components/signup";
import studenthome from "./components/studenthome";
import teacherhome from "./components/teacherhome";
import quiz from "./components/quiz";
import results from "./components/results";

export default [
  { path: "/", name: "Login", component: login },
  {
    path: "/signup",
    name: "Signup",
    component: signup
  },
  {
    path: "/home-student",
    name: "SHome",
    component: studenthome
  },
  {
    path: "/home-teacher",
    name: "THome",
    component: teacherhome
  },
  {
    path: "/results",
    name: "Results",
    component: results
  },
  { path: "/quiz/:id", component: quiz }
];
