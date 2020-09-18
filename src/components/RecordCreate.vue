<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading"/>
    <!-- <p class="center" v-else-if="!operations.length">Операций пока нет.</p> -->
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="c of categories"
            :key="c.id"
            :value="c.title"
            :class="{invalid: $v.category.$dirty && !$v.category.required}">{{c.title}}</option>
        </select>
        <label>Выберите категорию</label>
        <span v-if="$v.category.$dirty && !$v.category.required" class="helper-text invalid">Необходимо выбрать категорию</span>
      </div>
      <div>
        <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="typeOperation" />
          <span>Приход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="typeOperation" />
          <span>Расход</span>
        </label>
      </p>
      </div>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" :class="{invalid: $v.amount.dirty && !$v.amount.minValue}"/>
        <label for="amount">Сумма</label>
        <span v-if="$v.amount.$dirty && !$v.amount.minValue" class="helper-text invalid">Минимальное значение {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model="description" :class="{invalid: $v.description.dirty && !$v.description.required}"/>
        <label for="description">Конкретизация</label>
        <span v-if="$v.description.$dirty && !$v.description.required" class="helper-text invalid">Это поле обязательно к заполнению</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Добавить операцию
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import M from 'materialize-css'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'operation',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    operation: null,
    typeOperation: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
    category: { required }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateOperation () {
      if (this.typeOperation === 'income') {
        return true
      }
      return this.info.billing >= this.amount
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.operations = await this.$store.dispatch('fetchCashRecords')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    if (this.operations.length) {
      this.operation = this.operations[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateOperation) {
        try {
          const operation = await this.$store.dispatch('createCashOperation', {
            operationId: this.operation,
            amount: this.amount,
            description: this.description,
            typeOperation: this.typeOperation,
            category: this.category,
            date: new Date().toLocaleString()
          })
          const cashScore = this.typeOperation === 'income'
            ? this.info.cashScore + this.amount
            : this.info.cashScore - this.amount
          await this.$store.dispatch('updateInfo', { cashScore })
          this.$message('Операция успешно создана!')
          this.$emit('created', operation)
          this.$v.$reset()
          this.amount = 1
          this.description = ''
          this.category = null
        } catch (e) {}
      } else {
        this.$message(`Не хватает средств для операции (${this.amount - this.info.cashScore}) р`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
