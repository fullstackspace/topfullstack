<template>
  <div>
    <h3>课程列表</h3>
    <div class="middle-buttom" style="margin-bottom:20px">
      <el-button size="small" type="primary" @click="$router.push('/courses/create')">新增</el-button>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <el-button
            size="small"
            type="success"
            @click="$router.push(`/courses/edit/${row._id}`)"
          >编辑</el-button>
          <el-button size="small" type="danger" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class CoursesList extends Vue {
  data = {}

  fields = {
    _id: { label: 'ID' },
    name: { label: '课程名称' },
    cover: { label: '课程封面图' }
  }

  // 获取列表
  async fetch() {
    const res = await this.$http.get('courses')
    this.data = res.data
    console.log(this.data)
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
