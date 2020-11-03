const Time = () => {
    const date = new Date()
    const Year = date.getFullYear().toString()
    const Month = (date.getMonth() + 1).toString()
    const Day = date.getDate().toString()
    const DayNumber = date.getDate()
    const MonthNumber = date.getMonth() + 1
    const YearNumber = date.getFullYear()
    const FullTime = Year + '-' + Month + '-' + Day
    const FullTimeDay = Year + '-' + Month + '-0' + Day
    const FullTimeMonth = Year + '-0' + Month + '-' + Day
    const FullDate = Year + '-0' + Month + '-0' + Day
    //其实取createAt的前10个字符串就可以了。。。
    const YearAndMonth = Year + '-' + Month
    const MonthAndDay = parseInt(Day) > 10 ? Month + '-' + Day : Month + '-0' + Day
    return { Year, Month, MonthNumber, Day, DayNumber, FullTime, YearAndMonth, MonthAndDay, YearNumber, FullDate, FullTimeDay, FullTimeMonth }
}
export default Time