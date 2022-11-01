function createEmployeeRecord ([firName, famName, title, pay]){
 return {
    firstName: `${firName}`,
    familyName: `${famName}`,
    title: `${title}`,
    payPerHour: pay,
    timeInEvents: [],
    timeOutEvents: []
 }
}
 function createEmployeeRecords (employees){
 return employees.map(employee => createEmployeeRecord(employee))
 }

 function createTimeInEvent(employee, event){
    let [date, hour] = event.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour,10), date
    })
    return employee
 }

 function createTimeOutEvent(employee, event){
    let [date, hour] = event.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour,10), 
        date
    })
    return employee
 }
 

 function hoursWorkedOnDate(employee, date){
const startD = employee.timeInEvents.find(event => event.date === date)
const endD = employee.timeOutEvents.find(event => event.date === date)
const timeWorked = (endD.hour - startD.hour)/100
return timeWorked
 }

 function wagesEarnedOnDate(employee, date){
    const startD = employee.timeInEvents.find(event => event.date === date)
    const endD = employee.timeOutEvents.find(event => event.date === date)
    const workedT = (endD.hour-startD.hour) / 100
   return workedT * employee.payPerHour
}


function allWagesFor(employee){
    let dates = employee.timeInEvents.map((event)=> {
            return event.date
    })
    let reducedDate = dates.reduce((previousValue, currentValue)=> {
            return previousValue + wagesEarnedOnDate(employee, currentValue)

    }, 0) 
    return reducedDate
}


function calculatePayroll(employees){
    return employees.map(employee => allWagesFor(employee)).reduce((previousValue, currentValue)=> previousValue + currentValue, 0)
}