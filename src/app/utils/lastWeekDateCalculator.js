/**
 * Returns the date of one week ago from "date"
 * @param {*} date initial date
 * @returns date of one week ago from "date"
 */
function lastWeekDate (date) {
    let today = new Date(date);

    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    let lastWeekDay;
    let lastWeekMonth;
    let lastWeekYear;

    if (day <= 7) {
        if (month == 1) {
            lastWeekMonth = 12;
            lastWeekYear = year-1;
        }
        else {
            lastWeekMonth = month-1;
            lastWeekYear = year;
        }
        
        let daysPreviousMonth = new Date(lastWeekYear, lastWeekMonth, 0).getDate();        
        lastWeekDay = daysPreviousMonth - (6 - day);
    } else {
        lastWeekDay = day-7;
        lastWeekMonth = month;
        lastWeekYear = year;
    }
    
    let oneWeekAgo = lastWeekYear+"-"+((lastWeekMonth)<10?"0"+lastWeekMonth:lastWeekMonth)+"-"+((lastWeekDay-1)<10?"0"+lastWeekDay:lastWeekDay)+"T00:00:00.000";
    
    return oneWeekAgo;
}

module.exports = lastWeekDate;