import Time from '@/lib/Time.ts'

type RecordItem = {
    selectedTagId: number
    result: number
    note: string
    type: "-" | "+"
    date: string,
    day: string,
    month: string,
}
type recordModel = {
    RecordList: RecordItem[]
    getRecord: () => void
    saveRecord: () => void
    addRecord: (Record: RecordItem) => void
    CurrentMonthResidue: () => number
    CurrentMonthSpending: () => number
    CurrentMonthIncome: () => number
}
const time = Time()
const RecordModel: recordModel = {
    RecordList: [],
    CurrentMonthResidue() {
        return this.CurrentMonthIncome() - this.CurrentMonthSpending()
    },
    CurrentMonthSpending() {
        const CurrentMonthRecords = this.RecordList.filter(record => record.month === time.Month)
        const Spending = CurrentMonthRecords.filter(record => record.type === '-').reduce((sum, item) => { return sum + item.result }, 0)
        return Spending
    },
    CurrentMonthIncome() {
        const CurrentMonthRecords = this.RecordList.filter(record => record.month === time.Month)
        const Income = CurrentMonthRecords.filter(record => record.type === '+').reduce((sum, item) => { return sum + item.result }, 0)
        return Income
    },
    getRecord() {
        this.RecordList = JSON.parse(window.localStorage.getItem('record') || '[]')
        this.saveRecord()
    },
    saveRecord() {
        window.localStorage.setItem('record', JSON.stringify(this.RecordList))
    },
    addRecord(Record: RecordItem) {

        Record.date = time.FullTime
        Record.day = time.Day
        Record.month = time.Month
        this.RecordList.push(Record)
        this.saveRecord()
    }
}
RecordModel.getRecord()
const hash: { [key: string]: RecordItem[] } = {}
RecordModel.RecordList.forEach((record) => {
    const key = record.date
    if (!(key in hash)) {
        hash[key] = []
    }
    hash[key].push(record)
})
const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0
    if (a[0] > b[0]) return -1
    if (a[0] < b[0]) return 1
    return 0
})


export { RecordModel, array }