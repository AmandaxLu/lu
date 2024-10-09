import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    user: null
  }),
  actions: {
    login(userData) {
      this.isLoggedIn = true
      this.user = userData
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
    },
    updateUser(updatedUserData) {
      this.user = { ...this.user, ...updatedUserData }
    }
  }
})