<template>
  <div>
    Welcome {{ username }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['username'])
  }
}
</script>

<style lang="less" scoped>

</style>
