<template>
  <div>
    <Header :manger.sync="manger" />
    <Type :type.sync="recordItem.type" />
    <Tag
      :type="recordItem.type"
      :manger="manger"
      :selectedTagId.sync="recordItem.selectedTagId"
    />
    <NumberPad
      :result.sync="recordItem.result"
      :note.sync="recordItem.note"
      @submit="save"
      :back="back"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./Number/Header.vue";
import Type from "./Number/Type.vue";
import NumberPad from "./Number/NumberPad.vue";
import Tag from "./Number/Tag.vue";
import { RecordModel } from "@/model/RecordModel.ts";
type RecordItem = {
  selectedTagId: number;
  result: number;
  note: string;
  type: "-" | "+";
  date: string;
  day: string;
  month: string;
};
@Component({
  components: { NumberPad, Type, Header, Tag },
})
export default class Number extends Vue {
  manger: Boolean = false;
  back: Boolean = true;
  recordItem: RecordItem = {
    type: "-",
    selectedTagId: 0,
    result: 0,
    note: "",
    date: "",
    day: "",
    month: "",
  };
  save() {
    if (this.recordItem.result === 0) {
      window.alert("请输入金额");
    } else if (this.recordItem.selectedTagId === 0) {
      this.back = false;
      window.alert("请选择标签");
    } else {
      this.back = true;
      RecordModel.addRecord(this.recordItem);
      window.alert("保存成功");
    }
    this.recordItem = {
      type: "-",
      selectedTagId: 0,
      result: 0,
      note: "",
      date: "",
      day: "",
      month: "",
    };
  }
}
</script>

<style scoped lang='scss'>
</style>