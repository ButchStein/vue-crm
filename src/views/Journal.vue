<template>
  <div>
    <div class="page-title">
      <h3>Журнал операций</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <JournalTable />
    </section>
  </div>
</template>
<script>
import JournalTable from '@/components/JournalTable'
export default {
  name: 'journal',
  components: {
    JournalTable
  }
}
</script>
