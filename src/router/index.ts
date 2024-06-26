import { createRouter, createWebHistory } from 'vue-router'

const PostsList = () => import('../pages/posts/PostsList.vue')
const PostDetail = () => import('../pages/posts/PostDetail.vue')
const MyPosts = () => import('../pages/posts/MyPosts.vue')
const UserLogin = () => import('../pages/auth/UserLogin.vue')
const UserSingup = () => import('../pages/auth/UserSignup.vue')
const MyProfile = () => import('../pages/user/MyProfile.vue')
const OtherProfile = () => import('../pages/user/OtherProfile.vue')
const NotFound = () => import('../pages/NotFound.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/feed' },
    { path: '/feed', component: PostsList },
    { path: '/feed/:id', component: PostDetail, props: true },
    { path: '/myposts', component: MyPosts },
    { path: '/login', component: UserLogin },
    { path: '/signup', component: UserSingup },
    { path: '/myprofile', component: MyProfile },
    { path: '/profile/:id', component: OtherProfile, props: true },
    { path: '/:notFound(.*)', component: NotFound }
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
