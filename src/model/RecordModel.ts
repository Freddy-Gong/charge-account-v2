import Time from '@/lib/Time.ts'
import axios from 'axios'

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
    saveRecord: (Record: RecordItem) => void
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
    async getRecord() {
        await axios.get('http://120.77.35.114:3000/vuerecord').then((response) => {
            this.RecordList = response.data.vuerecord
        })
        // this.RecordList = JSON.parse(window.localStorage.getItem('record') || '[]')
    },
    saveRecord(Record: RecordItem) {
        axios.post('http://120.77.35.114:3000/vuerecord', { ...Record })
        // window.localStorage.setItem('record', JSON.stringify(this.RecordList))
    },
    addRecord(Record: RecordItem) {
        if (parseInt(time.Day) > 10 && parseInt(time.Month) > 10) {
            Record.date = time.FullTime
        } else if (parseInt(time.Day) > 10 && parseInt(time.Month) < 10) {
            Record.date = time.FullTime
        } else if (parseInt(time.Day) < 10 && parseInt(time.Month) < 10) {
            Record.date = time.FullDate
        } else {
            Record.date = time.FullTimeDay
        }

        Record.day = time.Day
        Record.month = time.Month
        this.RecordList.push(Record)
        this.saveRecord(Record)
    }
}
async function GetRecordModel() {
    await RecordModel.getRecord()
    return RecordModel
}

export { RecordModel, GetRecordModel }