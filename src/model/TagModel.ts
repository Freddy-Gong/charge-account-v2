import createID from '@/lib/createId.ts'
type Tag = {
    id: number
    name: string
    category: '-' | '+'
}
type tagModel = {
    TagList: Tag[]
    getTag: () => Tag[]
    save: () => void
    deleteTag: (id: number) => Tag[]
    addTag: (type: '-' | '+') => Tag[]
}

const TagModel: tagModel = {
    TagList: [],
    getTag() {
        this.TagList = JSON.parse(window.localStorage.getItem('tags') || '[]')
        if (this.TagList.length === 0) {
            this.TagList = [{ id: createID(), category: '-', name: '餐饮' },
            { id: createID(), category: '-', name: '交通' }, { id: createID(), category: '-', name: '医疗' }, { id: createID(), category: '-', name: '教育' }, { id: createID(), category: '-', name: '娱乐' }, { id: createID(), category: '-', name: '购物' }, { id: createID(), category: '-', name: '其他' }, { id: createID(), category: '+', name: '工资' }, { id: createID(), category: '+', name: '奖金' }, { id: createID(), category: '+', name: '红包' },
            { id: createID(), category: '+', name: '其他' }]
        }
        this.save()
        return this.TagList
    },
    save() {
        window.localStorage.setItem('tags', JSON.stringify(this.TagList))
    },
    deleteTag(id: number) {
        this.TagList = this.TagList.filter(tag => tag.id !== id)
        this.save()
        return this.TagList
    },
    addTag(type: '-' | '+') {
        const name = window.prompt('新标签的名字')
        if (name && !this.TagList.find(tag => tag.name === name)) {
            this.TagList.splice(-2, 0, { id: createID(), name: name, category: type })
        } else {
            window.alert('标签名重复')
        }
        this.save()
        return this.TagList
    }
}
TagModel.getTag()

export default TagModel