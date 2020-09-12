<template>
  <div class="Tags">
    <div v-for="tag in Tags" :key="tag.id" class="TagWrapper">
      <Icon :name="tag.name" class="sign" />
      <span>{{tag.name}}</span>
    </div>
    <Icon name="删除" class="sign" />
    <span>删除</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TagModul from "@/model/TagModel.ts";
import Icon from "@/components/Icon.vue";

@Component({
  components: { Icon },
})
export default class Tag extends Vue {
  Tags = TagModul.TagList;
}
</script>

<style scoped lang='scss'>
.Tags {
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  > .selected {
    > .sign {
      border: 1px solid black;
    }
  }
  > .TagWrapper {
    width: 20%;
    height: 50%;
    padding: 5px 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    > .icon {
      border-radius: 50px;
      padding: 10px;
      height: 3.5em;
      width: 3.5em;
    }
    > .delete {
      display: none;
    }
    > .deleteActive {
      display: block;
      position: absolute;
      top: -12px;
      right: -4px;
      width: 2em;
    }
    > span {
      padding: 5px 0px;
    }
  }
}
</style>