import React from "react";
import ListStudent from "../pages/adminRole/listStudent/ListStudent";
import ListTeacher from "../pages/adminRole/listTeacher/ListTeacher";
import ListFieldOfStudy from "../pages/adminRole/listFieldOfStudy/ListFieldOfStudy";
import AssignedInstruction from "../pages/adminRole/assigned-instructions/AssignedInstruction";
import AssignCriticism from "../pages/adminRole/assignedCriticism/AssignCriticism";
import infoStudent from "../pages/studentRole/infoStudent";
import infoTeacher from "../pages/teacherRole/infoTeacher/infoTeacher";
import listProject from "../pages/teacherRole/listProject/listProject";
import infoProject from "../pages/teacherRole/infoProject/infoProject";
import listReviewProject from "../pages/teacherRole/listReviewProject/listReviewProject";
import FormLogin from "../logInPage/Login/FormLogin";
import InfoStudentProject from "../pages/studentRole/infoStudentProject";
import InfoStudent from "../pages/studentRole/infoStudent";
import UpdatePassword from "../logInPage/UpdatePassword/UpdatePassword";
import ForgetPassword from "../logInPage/ForgetPassword/ForgetPassword";

const Login = { path: "/login", component: FormLogin };
const updatePassword = { path: "/updatePassword", component: UpdatePassword };
const forgetPassword = { path: "/forgetPassword", component: ForgetPassword };

const PublicRoutes = [
  { path: "/admin", component: ListStudent },
  { path: "/admin/student", component: infoStudent },
  { path: "/admin/list-student", component: ListStudent },
  { path: "/admin/list-teacher", component: ListTeacher },
  { path: "/admin/list-field-of-study", component: ListFieldOfStudy },
  { path: "/admin/assigned-instructions", component: AssignedInstruction },
  { path: "/admin/assign-criticism", component: AssignCriticism },

  { path: "/student", component: InfoStudent },
  { path: "/project", component: InfoStudentProject },

  { path: "/teacher/info-teacher", component: infoTeacher },
  { path: "/teacher/list-project", component: listProject },
  { path: "/teacher/info-project/:id", component: infoProject },
  { path: "/teacher/list-review-project", component: listReviewProject },
];

export { PublicRoutes, Login, updatePassword, forgetPassword };
