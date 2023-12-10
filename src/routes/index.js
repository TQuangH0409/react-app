import React from 'react'
import ListStudent from '../pages/adminRole/listStudent/ListStudent'
import ListTeacher from '../pages/adminRole/listTeacher/ListTeacher'
import ListFieldOfStudy from '../pages/adminRole/listFieldOfStudy/ListFieldOfStudy'
import AssignedInstruction from '../pages/adminRole/assigned-instructions/AssignedInstruction'
import AssignCriticism from '../pages/adminRole/assignedCriticism/AssignCriticism'
import infoStudent from '../pages/studentRole/infoStudent'

const publicRoutes = [
  {path: '/admin', component: ListStudent},
  {path: '/admin/list-student', component: ListStudent},
  {path: '/admin/list-teacher', component: ListTeacher},
  {path: '/admin/list-field-of-study', component: ListFieldOfStudy},
  {path: '/admin/assigned-instructions', component: AssignedInstruction},
  {path: '/admin/assign-criticism', component: AssignCriticism}
  {path: '/student/info', component: infoStudent}

]

export default publicRoutes