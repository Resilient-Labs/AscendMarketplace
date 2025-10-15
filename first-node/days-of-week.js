const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

module.exports = {
    weekdays,
   getWeekday
};

module.exports.getWeekday(dayNo) =  function(dayNo) {
if (dayNo < 0 || dayNo > 6 ) dayNo = 0;
return weekdays [dayNo];
};