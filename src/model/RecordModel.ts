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
    async getRecord() {
        await axios.get('http://120.77.35.114:3000/vuerecord').then((response) => {
            this.RecordList = response.data.vuerecord
            console.log(this.RecordList, 'axios')
        })
        // this.RecordList = JSON.parse(window.localStorage.getItem('record') || '[]')
        this.saveRecord()
    },
    saveRecord() {
        window.localStorage.setItem('record', JSON.stringify(this.RecordList))
    },
    addRecord(Record: RecordItem) {
        console.log(parseInt(time.Day), parseInt(time.Month))
        if (parseInt(time.Day) > 10 && parseInt(time.Month) > 10) {
            Record.date = time.FullTime
        } else if (parseInt(time.Day) > 10 && parseInt(time.Month) < 10) {
            Record.date = time.FullTimeMonth
        } else if (parseInt(time.Day) < 10 && parseInt(time.Month) < 10) {
            Record.date = time.FullDate
        } else {
            Record.date = time.FullTimeDay
        }
        Record.day = time.Day
        Record.month = time.Month
        this.RecordList.push(Record)
        this.saveRecord()
    }
}
RecordModel.getRecord()
console.log('--------')
async function GetRecordModel() {
    await RecordModel.getRecord()
    console.log(RecordModel.RecordList, 'async')
    return RecordModel
}

export { RecordModel, GetRecordModel, recordModel }