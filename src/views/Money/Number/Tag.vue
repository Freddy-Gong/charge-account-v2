<template>
  <div class="Tags">
    <div
      v-for="tag in showTags"
      :key="tag.id"
      class="TagWrapper"
      :class="selectedTagId===tag.id && 'selected'"
      @click="select(tag.id)"
    >
      <Icon :name="tag.name" class="sign" />
      <span>{{tag.name}}</span>
      <Icon
        name="删除"
        :class="'delete' + (manger ? 'Active' : '')"
        @click.native="deleteTag(tag.id)"
      />
    </div>
    <div class="add">
      <Icon name="添加" @click.native="addTag" />
      <span>添加</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TagModul from "@/model/TagModel.ts";
import Icon from "@/components/Icon.vue";

@Component({
  components: { Icon },
})
export default class Tag extends Vue {
  @Prop(String) readonly type!: "-" | "+";
  @Prop(Boolean) readonly manger!: boolean;
  @Prop(Number) readonly selectedTagId: number | undefined;
  get Tags() {
    return TagModul.TagList;
  }
  get showTags() {
    return this.Tags.filter((tag) => tag.category === this.type);
  }
  deleteTag(id: number) {
    console.log(id);
    TagModul.deleteTag(id);
  }
  select(id: number) {
    console.log(id);
    this.$emit("update:selectedTagId", id);
  }
  addTag() {
    TagModul.addTag(this.type);
  }
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
  > .add {
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
  }
}
</style>