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
        <a class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </a>
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
