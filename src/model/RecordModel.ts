type RecordItem = {
    tagId: number,
    type: '-' | '+',
    account: number,
    note: string,
    date: string,
    day: string,
    month: string,
    creatAt: string,
}

type recordModel = {
    RecordList: RecordItem[]
    getRecord: () => void
    saveRecord: () => void
    addRecord: (Record: RecordItem) => void
}

const RecordModel: recordModel = {
    RecordList: [],
    getRecord() {
        this.RecordList = JSON.parse(window.localStorage.getItem('record') || '[]')
        this.saveRecord()
    },
    saveRecord() {
        window.localStorage.setItem('record', JSON.stringify(this.RecordList))
    },
    addRecord(Record: RecordItem) {
        this.RecordList.push(Record)
        this.saveRecord()
    }
}
RecordModel.getRecord()

export default RecordModel