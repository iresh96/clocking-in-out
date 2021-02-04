
module.exports = {
  formatDate: function(date){
    const h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let d = date.getDate()
    let mo = date.getMonth()+1
    const y = date.getFullYear()
    m = checkTime(m)
    s = checkTime(s)
    d = checkTime(d)
    mo = checkTime(mo) 
    const time_string = `${d}/${mo}/${y}, ${h}:${m}:${s}`
    return time_string
  },
  findOverTime: function(timeIn,timeOut) {
    const difference = timeOut.getTime()-timeIn.getTime()
    const difInHousrs = Math.floor(difference/(1000 * 3600))
    const OT = difInHousrs - 8
    if(OT>=0){
      return OT
    }else{
      return 0
    }
   
  },
  ifClockOut:function(timeIn,timeOut) {
    timeIn = formatDate1(timeIn)
    timeOut = formatDate1(timeOut)
    if(timeIn ==timeOut){
      return 0
    }else{
      return timeOut
    }
  }
  
}

formatDate1 = function(date){
  const h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  let d = date.getDate()
  let mo = date.getMonth()+1
  const y = date.getFullYear()
  m = checkTime(m)
  s = checkTime(s)
  d = checkTime(d)
  mo = checkTime(mo) 
  const time_string = `${d}/${mo}/${y}, ${h}:${m}:${s}`
  return time_string
}
function checkTime(i) {
  if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
  return i;
  }