
// Get Today and format

export const getToday = () => {

    let parseTime = (val) => {
        if (val < 10) {
            return '0' + val
        } else {
            return val
        }
    }

    const today = new Date()
    let day = parseTime(today.getDate())
    let month = parseTime(today.getMonth() + 1)
    let year = parseTime(today.getFullYear())
    let hours = parseTime(today.getHours())
    let minutes = parseTime(today.getMinutes())

    let parsedDate = [year, month, day].join('-')
    let parsedTime = [hours, minutes].join(':')
    let parsedDateTime = [parsedDate, parsedTime].join(' ')

    return parsedDateTime
}

// Date formatting for Chart
export const parseDate = (data) => {
    let array = []
    data.forEach(row => {
        console.log(row)
        let newRow = {
            date: new Date(row.datetime),
            open: +row.open,
            high: +row.high,
            low: +row.low,
            close: +row.close,
            volume: +row.volume
        }
        array.push(newRow)
    })
    return array.reverse()
};