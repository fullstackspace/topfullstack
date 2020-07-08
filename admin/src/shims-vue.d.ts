declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import Vue from 'vue'
import { AxiosInstance } from 'axios'
declare module 'vue/types/vue' {
  // 声明为vue补充的东西
  interface Vue {
    // 解决$http报红问题。并且支持语法提示
    $http: AxiosInstance
  }
}