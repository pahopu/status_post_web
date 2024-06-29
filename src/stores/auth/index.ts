import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

import getPayloadFromJWT from '../../utils/decode/decode'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

let timer

const firebaseConfig = {
  apiKey: 'AIzaSyBKlvdooPIwcxH7PKsctgA-Wu9Ylb9yvbs',
  authDomain: 'caramel-brook-425503-g2.firebaseapp.com',
  projectId: 'caramel-brook-425503-g2',
  storageBucket: 'caramel-brook-425503-g2.appspot.com',
  messagingSenderId: '526066011739',
  appId: '1:526066011739:web:f76266eccfaf80fb5af97e'
}

const app = firebase.initializeApp(firebaseConfig)
const authorization = firebase.auth(app)

export const useAuthStore = defineStore('auth', () => {
  const auth = reactive({
    userId: null,
    token: null,
    didAutoLogout: false
  })

  const userId = computed(() => auth.userId)
  const token = computed(() => auth.token)
  const isAuthenticated = computed(() => !!auth.token)

  const setUser = (userId, token) => {
    auth.userId = userId
    auth.token = token
  }

  const setAutoLogout = () => {
    auth.didAutoLogout = true
  }

  const login = async (email, password) => {
    const response = await authorization.signInWithEmailAndPassword(email, password)
    const user = response.user

    const token = await user.getIdToken()
    const expirationDate = new Date(getPayloadFromJWT(token).exp * 1000)
    const expiresIn = expirationDate.getTime() - new Date().getTime()

    localStorage.setItem('token', token)
    localStorage.setItem('userId', user.uid)
    localStorage.setItem('tokenExpiration', expirationDate.toISOString())

    timer = setTimeout(autoLogout, expiresIn)

    setUser(user.uid, token)
  }

  const tryLogin = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = new Date(tokenExpiration).getTime() - new Date().getTime()
    console.log(expiresIn)

    timer = setTimeout(autoLogout, expiresIn)

    setUser(userId, token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    setUser(null, null)
  }

  const autoLogout = () => {
    logout()
    setAutoLogout()
  }

  return {
    userId,
    token,
    isAuthenticated,
    login,
    tryLogin,
    logout,
    autoLogout
  }
})
