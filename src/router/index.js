import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import CourseBudgetCalculatorView from '@/views/CourseBudgetCalculatorView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SubjectView from '@/views/SubjectView.vue'
import CourseView from '@/views/CourseView.vue'
import ViewSubjectTimetableView from '@/views/ViewSubjectTimetableView.vue'
import CourseTimetableView from '@/views/CourseTimetableView.vue'
import OldNewCourseView from '@/views/OldNewCourseView.vue'
import NewCourseView from '@/views/NewCourseView.vue'
import NotFound from '@/components/404.vue'
import TeacherView from '@/views/TeacherView.vue'
import StepOne from '@/components/course/StepOne.vue'
import StepTwo from '@/components/course/StepTwo.vue'
import StepThree from '@/components/course/StepThree.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    meta: { hideForAuth: true },
    component: LoginView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true },
    component: AboutView,
  },
  {
    path: '/new-course',
    name: 'newCourse',
    meta: { requiresAuth: true },
    component: NewCourseView,
  },
  {
    path: '/old-new-course',
    name: 'oldNewCourse',
    meta: { requiresAuth: true },
    component: OldNewCourseView,
    children: [
      {
        path: '',
        name: 'courseStepOne',
        component: StepOne,
      },
      {
        path: 'step-two',
        name: 'courseStepTwo',
        component: StepTwo,
      },
      {
        path: 'step-three',
        name: 'courseStepThree',
        component: StepThree,
      },
    ],
  },
  {
    path: '/teachers',
    name: 'teachers',
    meta: { requiresAuth: true },
    component: TeacherView,
    props: { showNewTeacherDialog: false },
  },
  {
    path: '/teachers/new',
    name: 'newTeacher',
    meta: { requiresAuth: true },
    component: TeacherView,
    props: { showNewTeacherDialog: true },
  },
  {
    path: '/courses',
    name: 'courses',
    meta: { requiresAuth: true },
    component: CourseView,
  },
  {
    path: '/subjects',
    name: 'subjects',
    meta: { requiresAuth: true },
    component: SubjectView,
  },
  {
    path: '/view-subject-timetable/:id',
    name: 'viewSubjectTimetable',
    meta: { requiresAuth: true },
    component: ViewSubjectTimetableView,
    props: (route) => {
      /**
       * This would preserve the other route.params object properties overriding only
       * `id` in case it exists with its integer equivalent, or otherwise with
       * undefined.
       */
      return {
        ...route.params,
        ...{ id: +route.params.id || undefined },
      }
    },
  },
  {
    path: '/view-course-timetable/:id',
    name: 'viewCourseTimetable',
    meta: { requiresAuth: true },
    component: CourseTimetableView,
    props: (route) => {
      /**
       * This would preserve the other route.params object properties overriding only
       * `id` in case it exists with its integer equivalent, or otherwise with
       * undefined.
       */
      return {
        ...route.params,
        ...{ id: +route.params.id || undefined },
      }
    },
  },
  {
    path: '/course-budget-calculator',
    name: 'courseBudgetCalculator',
    meta: { requiresAuth: true },
    component: CourseBudgetCalculatorView,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_API_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const storeAuth = useAuthStore()
  const authUser = storeAuth.loggedInUser
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
  const hideForAuth = to.matched.some((record) => record.meta.hideForAuth)
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }

  if (reqAuth && !authUser) {
    storeAuth.getAuthenticatedUserDetails().then(() => {
      if (!storeAuth.loggedInUser) next(loginQuery)
      else next()
    })
  } else if (!authUser && hideForAuth) {
    storeAuth.getAuthenticatedUserDetails().then(() => {
      if (!storeAuth.loggedInUser) next()
      else return next(from)
    })
  } else {
    next() // make sure to always call next()!
  }
})

export default router
