import ListStudent from '../pages/adminRole/listStudent/ListStudent'
import ListTeacher from '../pages/adminRole/listTeacher/ListTeacher'
import ListFieldOfStudy from '../pages/adminRole/listFieldOfStudy/ListFieldOfStudy'
import AssignedInstruction from '../pages/adminRole/assigned-instructions/AssignedInstruction'
import AssignCriticism from '../pages/adminRole/assignedCriticism/AssignCriticism'
import infoStudent from '../pages/studentRole/infoStudent'
import infoTeacher from '../pages/teacherRole/infoTeacher/infoTeacher'
import listProject from '../pages/teacherRole/listProject/listProject'
import infoProject from '../pages/teacherRole/infoProject/infoProject'
import listReviewProject from '../pages/teacherRole/listReviewProject/listReviewProject'
import listAssignment from '../pages/teacherRole/listAssignment/listAssignment'

const publicRoutes = [
  {path: '/admin', component: ListStudent},
  {path: '/admin/student' , component: infoStudent},
  {path: '/admin/list-student', component: ListStudent},
  {path: '/admin/list-teacher', component: ListTeacher},
  {path: '/admin/list-field-of-study', component: ListFieldOfStudy},
  {path: '/admin/assigned-instructions', component: AssignedInstruction},
  {path: '/admin/assign-criticism', component: AssignCriticism},

  {path: '/teacher' , component: infoTeacher},
  {path: '/list-project', component: listProject},
  {path: '/info-project', component: infoProject},
  {path: '/list-review-project', component: listReviewProject},
  {path: '/list-assignment', component: listAssignment},
  

]

export default publicRoutes