import React from "react";
import ListStudent from "../pages/adminRole/listStudent/ListStudent";
import ListTeacher from "../pages/adminRole/listTeacher/ListTeacher";
import ListFieldOfStudy from "../pages/adminRole/listFieldOfStudy/ListFieldOfStudy";
import AssignedInstruction from "../pages/adminRole/assigned-instructions/AssignedInstruction";
import AssignCriticism from "../pages/adminRole/assignedCriticism/AssignCriticism";
import infoStudent from "../pages/studentRole/infoStudent";
import infoStudentProject from "../pages/studentRole/infoStudentProject";
import FormLogin from "../page/Login/FormLogin";

const publicRoutes = [
  { path: "/login", component: FormLogin },
  { path: "/admin", component: ListStudent },
  { path: "/admin/list-student", component: ListStudent },
  { path: "/admin/list-teacher", component: ListTeacher },
  { path: "/admin/list-field-of-study", component: ListFieldOfStudy },
  { path: "/admin/assigned-instructions", component: AssignedInstruction },
  { path: "/admin/assign-criticism", component: AssignCriticism },
  { path: "/student", component: infoStudent },
  { path: "/project", component: infoStudentProject },
];

export default publicRoutes;
