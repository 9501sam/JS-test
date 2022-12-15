'use strict';
const util = require('util');

const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
];

// 1. Count Employees Number by Factory
//    => [ {name: 'BR1', count: 4}, ... ]
function countEmployeesNumberByFactory(factories) {
    return factories.map(function (factory) {
        return {
            name: factory.name,
            count: factory.employees.length,
        }
    });
}

// 2. Count Factories Number by Employee
//    => [ {employee: 'John', count: 2}, ... ]
function countFactoriesNumberByEmploee(factories) {
    let employeeToCount = new Map();

    factories.forEach(function (factory){
        factory.employees.forEach(function (employee) {
            if (!employeeToCount.has(employee)) {
                employeeToCount.set(employee, 1);
            } else {
                employeeToCount.set(employee, employeeToCount.get(employee) + 1);
            }
        });
    });
    
    let result = [];
    employeeToCount.forEach(function (val, key) {
        result.push({employee: key, count: val});
    });
    return result;
}

// 3. Order employees list by alphabetical order
//    =>  { name: "BR2", employees: ["Jessie", "John", "Karen"] }
function orderEmployeesBy(factories, comparator) {
    return factories.map(function (factory) {
        return {
            name: factory.name,
            employees: factory.employees.sort(comparator),
        }
    });
}

///*** 4. 5. 6. ***///
const employeeType = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];
const employees = [
    {id: 1, name: "Alice", type: 2},
    {id: 2, name: "Bob", type: 3},
    {id: 3, name: "John", type: 2},
    {id: 4, name: "Karen", type: 1},
    {id: 5, name: "Miles", type: 3},
    {id: 6, name: "Henry", type: 1}
];
const tasks = [
    {id: 1, title: "task01", duration: 60},
    {id: 2, title: "task02", duration: 120},
    {id: 3, title: "task03", duration: 180},
    {id: 4, title: "task04", duration: 360},
    {id: 5, title: "task05", duration: 30},
    {id: 6, title: "task06", duration: 220},
    {id: 7, title: "task07", duration: 640},
    {id: 8, title: "task08", duration: 250},
    {id: 9, title: "task09", duration: 119},
    {id: 10, title: "task10", duration: 560},
    {id: 11, title: "task11", duration: 340},
    {id: 12, title: "task12", duration: 45},
    {id: 13, title: "task13", duration: 86},
    {id: 14, title: "task14", duration: 480},
    {id: 15, title: "task15", duration: 900}
];

function hoursToSeconds(hours) {
    return 60 * 60 * hours;
}

function minutesToSeconds(minutes) {
    return 60 * minutes;
}

function stringToSeconds(timeString) {
    let timeStrings = timeString.split(':');
    let hours = parseInt(timeStrings['0']);
    let minutes = parseInt(timeStrings['1']);
    let seconds = parseInt(timeStrings['2']);
    return hoursToSeconds(hours) + minutesToSeconds(minutes) + seconds;
}

function secondsToHours(seconds) {
    return (seconds / 60) / 60;
}

function getDurationInSecond(beginStr, endStr) {
    let begin = stringToSeconds(beginStr);
    let end = stringToSeconds(endStr);
    if (end < begin)
        end += 24 * 60 * 60;
    return end - begin;
}

function getType(type) {
    let index = type - 1;
    return employeeType[index];
}

function typeToDurationInSeconds(employeeType, type) {
    let index = type - 1;
    let employee = employeeType[index];
    return getDurationInSecond(employee.work_begin, employee.work_end);
}

// 4. Count total hours worked in 1 day ? // => 39
function totalHoursInOneDay(employeeType, employees) {
    let totalSeconds = 0;
    employees.forEach(function (employee) {
        totalSeconds += typeToDurationInSeconds(employeeType, employee.type);
    });
    return secondsToHours(totalSeconds);
}

// 5. Make a function that take as parameters dayTime and return number of employee working
//    howManyEmployeeByTime(time) => int
function howManyEmployeeByTime(time) {
    let timeInSec = stringToSeconds(time);
    let arr = employees.filter(function (employee) {
        let beginInSec = stringToSeconds(getType(employee.type).work_begin);
        let endInSec = stringToSeconds(getType(employee.type).work_end);
        let mid = timeInSec;
        if (endInSec < beginInSec) {
            endInSec += 24 * 60 * 60;
        }
        return beginInSec <= mid && mid <= endInSec;
    });
    return arr.length;
}

// 6. How many days of work needed to done all tasks ? 
//    => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
function howManyDaysForTasks(employeeType, employees, tasks) {
    let sumInMin = 0;
    tasks.forEach(function (task) {
        sumInMin += task.duration;
    });
    let sumInSec = minutesToSeconds(sumInMin);
    let hoursPerDay = totalHoursInOneDay(employeeType, employees);
    let secondsPerDay = 60 * 60 * hoursPerDay;
    return sumInSec / secondsPerDay;
}

function main() {
    let comparator = function (str1, str2) {
        return str1.localeCompare(str2);
    };
    let ans1 = countEmployeesNumberByFactory(factories);
    let ans2 = countFactoriesNumberByEmploee(factories);
    let ans3 = orderEmployeesBy(factories, comparator);
    let ans4 = totalHoursInOneDay(employeeType, employees);
    let ans5 = howManyEmployeeByTime("13:20:10");
    let ans6 = howManyDaysForTasks(employeeType, employees, tasks);

    console.log("\n=== 1 ===\n");
    console.log(util.inspect(ans1, {depth: null}));
    console.log("\n=== 2 ===\n");
    console.log(util.inspect(ans2, {depth: null}));
    console.log("\n=== 3 ===\n");
    console.log(util.inspect(ans3, {depth: null}));
    console.log("\n=== 4 ===\n");
    console.log(util.inspect(ans4, {depth: null}));
    console.log("\n=== 5 ===\n");
    console.log(util.inspect(ans5, {depth: null}));
    console.log("\n=== 6 ===\n");
    console.log(util.inspect(ans6, {depth: null}));
}

main();
