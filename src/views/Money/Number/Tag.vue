<template>
  <div class="Tags">
    <div
      v-for="tag in showTags"
      :key="tag.id"
      class="TagWrapper"
      :class="selectedTagId === tag.id && 'selected'"
      @click="select(tag.id)"
    >
      <Icon
        v-if="IconName.indexOf(tag.name) >= 0"
        :name="tag.name"
        class="sign"
      />
      <div v-if="!(IconName.indexOf(tag.name) >= 0)" class="default sign">
        {{ tag.name[0] }}
      </div>
      <span>{{ tag.name }}</span>
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
import TagModel from "@/model/TagModel.ts";

TagModel.getTag();
@Component({
  components: { Icon },
})
export default class Tag extends Vue {
  @Prop(String) readonly type!: "-" | "+";
  @Prop(Boolean) readonly manger!: boolean;
  @Prop(Number) readonly selectedTagId: number | undefined;

  Tags = TagModul.TagList;

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
  get showTags() {
    return this.Tags.filter((tag) => tag.category === this.type);
  }
  deleteTag(id: number) {
    console.log(1);
    TagModul.deleteTag(id);
    this.Tags = TagModul.TagList;
  }
  select(id: number) {
    this.$emit("update:selectedTagId", id);
  }
  addTag() {
    TagModul.addTag(this.type);
    this.Tags = TagModul.TagList;
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
      padding: 10px 0;
      height: 3.5em;
      width: 3.5em;
    }
    > .default {
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3.5em;
      width: 3.5em;
      font-size: 16px;
    }
    > .delete {
      display: none;
    }
    > .deleteActive {
      display: block;
      position: absolute;
      top: -12px;
      right: -4px;
      width: 1em;
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