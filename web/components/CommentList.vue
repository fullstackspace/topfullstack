<template>
  <v-card flat tile>
    <v-form @submit.prevent="send">
      <v-text-field
        label="说点啥吧"
        required
        append-icon="mdi-send"
        @click:append="send"
        v-model="content"
      ></v-text-field>
    </v-form>
    <v-list two-line>
      <v-list-item v-for="(item, i) in comments" :key="i">
        <v-list-item-avatar color="blue">
          <span class="white--text">{{
            item.user.username[0].toUpperCase()
          }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.content }}</v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ item.user.username }}</span>
            <span>{{ item.createdAt }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
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
      content: null,
      comments: [],
    }
  },
  methods: {
    async send() {
      const { type, object, content } = this
      await this.$axios.$post('comments', {
        type,
        object,
        content,
      })
      this.content = null
      await this.fetch()
    },
    async fetch() {
      const { type, object } = this
      this.comments = await this.$axios.$get('comments', {
        // 方法一:不利于扩展
        // params: {
        //   type,
        //   object,
        // },
        // 方法二:
        params: {
          query: {
            where: {
              type,
              object,
            },
          },
        },
      })
    },
  },
  // 课时切换时,重新获取数据
  watch: {
    object: {
      handler() {
        this.fetch()
      },
      immediate: true, // 立即执行,
    },
  },
}
</script>
