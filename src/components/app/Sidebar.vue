<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      :to="link.url"
      active-class="active"
      :exact="link.exact"

    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>

  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Счета организации', url: '/', exact: true },
      { title: 'Журнал операций', url: '/journal' },
      // { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' },
      { title: 'Банк', url: '/banks' },
      { title: 'Касса', url: '/cash' }
    ]
  })
}
</script>
