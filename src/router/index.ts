import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const PostsList = () => import('../pages/posts/PostsList.vue')
const PostDetail = () => import('../pages/posts/PostDetail.vue')
const MyPosts = () => import('../pages/posts/MyPosts.vue')
const UserLogin = () => import('../pages/auth/UserLogin.vue')
const UserSingup = () => import('../pages/auth/UserSignup.vue')
const MyProfile = () => import('../pages/user/MyProfile.vue')
const OtherProfile = () => import('../pages/user/OtherProfile.vue')
const ChangePassword = () => import('../pages/user/ChangePassword.vue')
const NotFound = () => import('../pages/NotFound.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/feed' },
    { path: '/feed', component: PostsList, meta: { requiresAuth: true } },
    { path: '/feed/:id', component: PostDetail, props: true, meta: { requiresAuth: true } },
    { path: '/my-posts', component: MyPosts, meta: { requiresAuth: true } },
    { path: '/log-in', component: UserLogin, meta: { requiresUnauth: true } },
    { path: '/sign-up', component: UserSingup, meta: { requiresUnauth: true } },
    { path: '/my-profile', component: MyProfile, meta: { requiresAuth: true } },
    { path: '/change-password', component: ChangePassword, meta: { requiresAuth: true } },
    { path: '/profile/:id', component: OtherProfile, props: true, meta: { requiresAuth: true } },
    { path: '/:notFound(.*)', component: NotFound, meta: { requiresAuth: true } }
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/log-in')
  } else if (to.meta.requiresUnauth && authStore.isAuthenticated) {
    next('/feed')
  } else {
    next()
  }
})

export default router
