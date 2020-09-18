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

    <section>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Наименование платежа</th>
            <th>Тип</th>
            <th>Категория</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="o of operations" :key="o.id">
            <td>1</td>
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
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="mt-5">
      <RecordCreate />
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
    this.loading = false
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
}
.mt-5 {
  margin-top: 5rem;
}
</style>
