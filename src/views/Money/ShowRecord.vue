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
              <Icon :name="tag.name" />
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
              <Icon :name="tag.name" />
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
import { array } from "@/model/RecordModel.ts";
import TagModule from "@/model/TagModel.ts";
import Icon from "@/components/Icon.vue";

@Component({
  components: { Icon },
})
export default class ShowRecord extends Vue {
  get recordList() {
    return array;
  }
  tags = TagModule.TagList;
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
</style>