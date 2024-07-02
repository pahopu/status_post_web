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

const scrollPositions = {
  '/feed': { left: 0, top: 0 },
  '/my-posts': { left: 0, top: 0 }
}

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
  scrollBehavior(to, from, savedPosition) {
    // Handle back/forward navigation
    if (savedPosition) {
      return savedPosition
    }

    // Check if navigating between feed and my-posts
    const fromFeedOrMyPosts = ['/feed', '/my-posts'].includes(from.path)
    const toFeedOrMyPosts = ['/feed', '/my-posts'].includes(to.path)

    // Save the current scroll position
    if (fromFeedOrMyPosts) {
      scrollPositions[from.path] = { left: window.scrollX, top: window.scrollY }
    }

    // Restore scroll position if navigating between feed and my-posts
    if (toFeedOrMyPosts && fromFeedOrMyPosts) {
      return { ...scrollPositions[to.path] }
    }

    // Scroll to top if navigating to feed or my-posts from other routes
    if (toFeedOrMyPosts) {
      scrollPositions['/my-posts'] = { left: 0, top: 0 }
      scrollPositions['/feed'] = { left: 0, top: 0 }
      return { top: 0 }
    }

    return { top: 0 }
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
