<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }}课程</h3>
    <ele-form v-model="data" :form-desc="fields" :request-fn="submit"></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class CoursesEdit extends Vue {
  @Prop({ type: String }) id!: string
  data = {}
  fields = {
    name: { label: '课程名称', type: 'input' },
    cover: { label: '课程封面图', type: 'input' }
  }

  // 计算属性的写法 -> 属于JS中的语法
  get isNew() {
    return !this.id
  }

  async submit(data: any) {
    // 区分新建/编辑
    const { isNew } = this
    const url = isNew ? `courses` : `courses/${this.id}`
    const method = isNew ? 'post' : 'put'
    await this.$http[method](url, data)
    this.$message.success('提交成功')
    this.data = {}
    this.$router.go(-1)
  }
  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`)
    this.data = res.data
  }

  created() {
    // 编辑时才执行
    !this.isNew && this.fetch()
  }
}
</script>

<style lang="" scoped></style>
