import Time from '@/lib/Time.ts'


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
        const time = Time()
        Record.date = time.FullTime
        Record.day = time.Day
        Record.month = time.Month
        this.RecordList.push(Record)
        this.saveRecord()
    }
}
RecordModel.getRecord()

export default RecordModel