<template>
  <v-btn icon :color="status ? 'pink' : null" @click="toggle">
    <v-icon>mdi-heart</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      status: false,
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    async getStatus() {
      const { type, object } = this
      const { status } = await this.$axios.$get('actions/status', {
        params: {
          type,
          object,
          name: 'like',
        },
      })
      this.status = status
    },
    async toggle() {
      const { type, object } = this
      const { status } = await this.$axios.$post('actions/toggle', {
        type,
        object,
        name: 'like',
      })
      this.status = status
    },
  },
}
</script>
