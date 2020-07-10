<template>
  <div>
    {{data.data}}
    <avue-crud
      :data="data.data"
      :option="option"
      v-model="obj"
      @row-save="create"
      @row-del="remove"
      @row-update="update"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class CoursesList extends Vue {
  data = {}
  obj = {}
  option = {
    title: '课程列表',
    column: [
      {
        label: '课程名称',
        prop: 'name'
      },
      {
        label: '课程封面图',
        prop: 'cover'
      }
    ]
  }

  // 获取列表
  async fetch() {
    const res = await this.$http.get('courses')
    this.data = res.data
    console.log(this.data)
  }

  // row, done, loading
  async create(row: object, done: any) {
    await this.$http.post('courses', row)
    this.$message.success('新增成功')
    this.fetch()
    done()
  }

  // row, index, done, loading
  async update(row: any, index: number, done: any) {
    const data = JSON.parse(JSON.stringify(row))
    // 以$开头的字段在mongoose中都有一定的意义
    delete data.$index
    await this.$http.put(`courses/${row._id}`, data)
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
    await this.$http.delete(`courses/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  // created生命周期
  created() {
    this.fetch()
  }
}
</script>

<style lang="" scoped></style>
