<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text"
          id="name"
          v-model="title"
          :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">Название</label>
          <span
          v-if="$v.title.$dirty && !$v.title.required"
          class="helper-text invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input id="limit"
          type="number"
          v-model="limit"
          :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">Лимит</label>
          <span
          v-if="$v.limit.$dirty && !$v.limit.minValue"
          class="helper-text invalid">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current (categoryId) {
      const { title, limit } = this.categories.find(c => c.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена!')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  created () {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
