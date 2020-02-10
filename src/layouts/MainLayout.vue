<template>
  <div>
    <div class="app-main-layout">
      <Navbar @toggle="isShow = !isShow" />
      <Sidebar v-model="isShow" />
      <main class="app-content" :class="{full: !isShow}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to='/record'>
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
export default {
  data: () => ({
    isShow: true
  }),
  components: {
    Navbar, Sidebar
  }
}
</script>
