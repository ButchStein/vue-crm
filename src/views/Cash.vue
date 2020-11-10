<template>
  <div>
    <div class="header-wrapper">
      <div class="page-title">
        <h3>Операции с наличными</h3>
      </div>
      <div class="page-title">
        <h3>{{getScore}}: Остаток в кассе</h3>
      </div>
    </div>

    <!-- <div class="history-chart">
      <canvas></canvas>
    </div>-->
    <section class="mb-3">
      <RecordCreate @created="addNewRecord"/>
    </section>
    <section>
      <table>
        <thead class="sub-header">
          <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Наименование платежа</th>
            <th>Тип</th>
            <th>Категория</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="o of operations" :key="o.id">
            <td></td>
            <td>{{o.date}}</td>
            <td>{{o.amount}}</td>
            <td>{{o.description}}</td>
            <td>
              <span class="white-text badge green" v-if="o.typeOperation ==='income'">Приход</span>
              <span class="white-text badge red" v-else>Расход</span>
            </td>
            <td>{{o.category}}</td>
            <td>
              <button class="btn-small btn">
                <i class="material-icons">open_in_new</i>
              </button>
              <button class="btn-small btn ml-1 red">
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<script>
import RecordCreate from '@/components/RecordCreate'
export default {
  data: () => ({
    operations: [],
    loading: true
  }),
  components: {
    RecordCreate
  },
  computed: {
    getScore () {
      return this.$store.getters.info.cashScore
    }
  },
  async mounted () {
    this.operations = await this.$store.dispatch('fetchCashRecords')
    this.operations = await this.operations.reverse(self)
    this.loading = false
  },
  methods: {
    async addNewRecord () {
      this.operations = await this.$store.dispatch('fetchCashRecords')
      this.operations = await this.operations.reverse(self)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
}
.mb-3 {
  margin-bottom: 3rem;
}
.ml-1 {
  margin-left: 1rem;
}
.sub-header {
  background-color:#ffa726;
}
</style>
