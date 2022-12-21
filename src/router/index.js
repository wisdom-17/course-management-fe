import { useAuthStore } from '@/stores/auth'
import { useCourseStore } from '@/stores/course'
import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import CourseCalendarsView from '@/views/CourseCalendarsView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SubjectView from '@/views/SubjectView.vue'
import NewCourseView from '@/views/NewCourseView.vue'
import NotFound from '@/components/404.vue'
import TeacherView from '@/views/TeacherView.vue'
import StepOne from '@/components/courseCalendar/StepOne.vue'
import StepTwo from '@/components/courseCalendar/StepTwo.vue'
import StepThree from '@/components/courseCalendar/StepThree.vue'

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
    path: '/course-calendars',
    name: 'courseCalendars',
    meta: { requiresAuth: true },
    component: CourseCalendarsView,
  },
  {
    path: '/new-course-calendar',
    name: 'newCourse',
    meta: { requiresAuth: true },
    component: NewCourseView,
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
  },
  {
    path: '/subjects',
    name: 'subjects',
    meta: { requiresAuth: true },
    component: SubjectView,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_API_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const storeAuth = useAuthStore()
  const storeCourse = useCourseStore()
  const authUser = storeAuth.loggedInUser
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
  const hideForAuth = to.matched.some((record) => record.meta.hideForAuth)
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }

  if (reqAuth && !authUser) {
    storeAuth.getAuthenticatedUserDetails().then(() => {
      if (!storeAuth.loggedInUser) next(loginQuery)
      else if (
        ['courseStepTwo', 'courseStepThree'].includes(to.name) &&
        !storeCourse.multiStepForm.id
      ) {
        return next(from)
      } else next()
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
