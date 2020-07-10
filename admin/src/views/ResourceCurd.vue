<template>
  <div>
    {{data.data}}
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      v-model="obj"
      @row-save="create"
      @row-del="remove"
      @row-update="update"
      :table-loading="loading"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class CoursesList extends Vue {
  @Prop(String) resource!: string
  data = {}
  obj = {}
  option = {}
  loading = true

  async fetchOptions() {
    const res = await this.$http.get(`${this.resource}/options`)
    console.log(res)
    this.option = res.data
  }
  // 获取列表
  async fetch() {
    const res = await this.$http.get(`${this.resource}`)
    this.data = res.data
    this.loading = false
    console.log(this.data)
  }

  // row, done, loading
  async create(row: object, done: any) {
    await this.$http.post(`${this.resource}`, row)
    this.$message.success('新增成功')
    this.fetch()
    done()
  }

  // row, index, done, loading
  async update(row: any, index: number, done: any) {
    const data = JSON.parse(JSON.stringify(row))
    // 以$开头的字段在mongoose中都有一定的意义
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`, data)
    this.$message.success('修改成功')
    this.fetch()
    done()
  }
  // 删除
  async remove(row: any) {
    try {
      await this.$confirm('是否确认删除？')
    } catch (e) {
      return
    }
    await this.$http.delete(`${this.resource}/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  // created生命周期
  created() {
    this.fetchOptions()
    this.fetch()
  }
}
</script>

<style lang="" scoped></style>
