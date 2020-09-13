declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.svg' {
  import Vue, { VueConstructor } from 'vue';
  const content: VueConstructor<Vue>;
  export default content;
}
declare module 'vue/types/vue' {
  interface Vue {
    $dayDate: any
  }
}
declare module 'echarts' {
  import echarts from 'echarts'
  export default echarts
};

