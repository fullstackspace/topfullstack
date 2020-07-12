<template>
  <div>
    {{ option }}
    <avue-crud
      v-if="option.column"
      :page="page"
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string
  data: any = {}
  option: any = {}
  page: any = {
    total: 1,
  }
  query: any = {}

  async fetchOptions() {
    const res = await this.$http.get(`${this.resource}/option`)
    this.option = res.data
  }
  // 获取列表
  async fetch() {
    const { query } = this
    const res: any = await this.$http.get(`${this.resource}`, {
      params: {
        query,
      },
    })
    this.data = res.data
    this.page.total = res.data.total
  }

  // 分页
  changePage({ currentPage, pageSize }: any) {
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }

  // 表格排序
  changeSort({ prop, order }: any) {
    if (!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]: order === 'descending' ? -1 : 1,
      }
    }
    this.fetch()
  }

  // 搜索
  search(where: any, done: any) {
    const { option } = this
    const { column } = option
    for (let key in where) {
      const isRegex = column.find(({ prop }: any) => prop === key)
      isRegex && isRegex.regex && (where[key] = { $regex: where[key] })
    }
    this.query.where = where
    this.fetch()
    done()
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
