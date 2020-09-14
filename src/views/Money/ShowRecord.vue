<template>
  <div class="RecordWrapper">
    <div v-for="record in recordList" :key="record[0]" class="title">
      <span class="day">{{record[1][0].day +'号'}}</span>
      <span class="line" />
      <span>
        {{record[1].reduce((sum, item) => {
        return sum + parseFloat(item.type + item.result.toString())
        }, 0)}}
      </span>
      <div v-for="r in record[1]" :key="r.result">
        <div v-if="r.type === '-' && tags">
          <span v-for="tag in tags" :key="tag.id">
            <span v-if="tag.id === r.selectedTagId" class="record">
              <span>{{r.note}}</span>
              <span>{{tag.name}}</span>
              <Icon v-if="IconName.indexOf(tag.name)>=0" :name="tag.name" class="sign" />
              <div v-if="!(IconName.indexOf(tag.name)>=0)" class="default sign">{{tag.name[0]}}</div>
              <span>{{parseFloat(r.type + r.result.toString())}}</span>
              <span></span>
            </span>
          </span>
        </div>
        <div v-if="r.type === '+' && tags">
          <span v-for="tag in tags" :key="tag.id">
            <span v-if="tag.id === r.selectedTagId" class="record">
              <span></span>
              <span>{{parseFloat(r.type + r.result.toString())}}</span>
              <Icon v-if="IconName.indexOf(tag.name)>=0" :name="tag.name" class="sign" />
              <div v-if="!(IconName.indexOf(tag.name)>=0)" class="default sign">{{tag.name[0]}}</div>
              <span>{{tag.name}}</span>
              <span>{{r.note}}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RecordModel } from "@/model/RecordModel.ts";
import TagModule from "@/model/TagModel.ts";
import Icon from "@/components/Icon.vue";

@Component({
  components: { Icon },
})
export default class ShowRecord extends Vue {
  IconName = [
    "编辑",
    "餐饮",
    "工资",
    "购物",
    "红包",
    "奖金",
    "交通",
    "教育",
    "其他",
    "医疗",
    "娱乐",
  ];
  get recordList() {
    const hash: { [key: string]: RecordItem[] } = {};
    RecordModel.RecordList.forEach((record) => {
      const key = record.date;
      if (!(key in hash)) {
        hash[key] = [];
      }
      hash[key].push(record);
    });
    const array = Object.entries(hash).sort((a, b) => {
      if (a[0] === b[0]) return 0;
      if (a[0] > b[0]) return -1;
      if (a[0] < b[0]) return 1;
      return 0;
    });
    return array;
  }
  get tags() {
    return TagModule.TagList;
  }
}
</script>

<style scoped lang='scss'>
.RecordWrapper {
  position: absolute;
  width: 100%;
  overflow: scroll;
  > .title {
    > span {
      &.line {
        border-radius: 10px;
        background: black;
        margin: 0 15px;
        border: 1px solid black;
      }
    }
    > div {
      > div {
        margin: 10px 0;
      }
    }
  }
}
.record {
  display: flex;
  justify-content: center;
  align-items: center;
  > .icon {
    width: 3em;
    height: 3em;
  }
  > span {
    display: block;
    margin: 0 8px;
    width: 3em;
  }
}
.default {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
}
</style>