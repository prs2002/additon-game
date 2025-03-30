import { createRouter, createWebHistory } from 'vue-router';
import { auth, db, doc, getDoc } from './firebase';
import Login from './components/Login.vue';
import StudentDashboard from './components/StudentDashboard.vue';
import TeacherDashboard from './components/TeacherDashboard.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/student-dashboard', component: StudentDashboard, meta: { requiresAuth: true, role: 'student' } },
  { path: '/teacher-dashboard', component: TeacherDashboard, meta: { requiresAuth: true, role: 'teacher' } },
];

const router = createRouter({ history: createWebHistory(), routes, });

router.beforeEach(async (to, from, next) => {
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) {
    next('/');
  } else if (user) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() && userSnap.data().role !== to.meta.role) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;