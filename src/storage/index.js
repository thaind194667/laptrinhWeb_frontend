import axios from "axios";

const attendanceUrl = ""
const IO_url = "http://localhost:3001/attendance/sendCheckInOut.php"

let employeeID = "2"
let type ="none"
let fullName = "none";

let badwords = ['cut', 'dit', 'lon', 'chim', 'cu', 'cac', 'dmm', 'ngu']

let inTime = {h: 0, m: 0, s: 0}, outTime = {h: 0, m: 0, s: 0};


function setEmployeeId(id) {
  employeeID = id;
}

function setType(t) {
  type = t;
}

function setIn(h, m) {
    inTime = {
        hour: h,
        minute: m
    }
}

function setOut (h, m) {
    outTime = {
        hour: h,
        minute: m
    }
}

function getCurrentTime() {
    return new Date(2023, 3, 20, 7, 58, 13);
}

function formatDate() {
    let now = getCurrentTime();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();

    return year + "-" + (month > 10 ? month : "0" + month) + "-" + (day > 10 ? day : "0" + day);
}

function formatTime(type) {
    var now = getCurrentTime();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var realTime;
    if(type === "hms")
      realTime = hour + ":" + (minute < 10 ? ('0' + minute) : minute) + ":" + (second < 10 ? ('0' + second) : second);
    if(type === "hm")  
      realTime = hour + ":" + (minute < 10 ? ('0' + minute) : minute)
    return realTime;
  };

function addAttendance(id, workType) {
    // var now = getCurrentTime();
    // var hour = now.getHours();
    // var minute = now.getMinutes();
    // var second = now.getSeconds();

    let data = {
      inTime : formatTime("hms"),
      id: id,
      type: workType === "overtime" ? 1 : 0,
      command: 'checkin'
    }

    axios.post(IO_url, data)
    .then(res => {
      if(res.respone === "404")
        alert("Some shit happened!");
    })
    .catch(error => console.log(error))



    // if()

}

function updateAttendance(id) {

  let data = {
    outTime : formatTime("hms"),
    id: id,
    // type: workType === "overtime" ? 1 : 0,
    command: 'checkout'
  }

  axios.post(IO_url, data)
  .then(res => {
    if(res.respone === "404")
      alert("Some shit happened!");
  })
  .catch(error => console.log(error))

}

function getAttendanceToday(id) {

}

export { formatDate, formatTime, getCurrentTime, badwords}

export { addAttendance, updateAttendance, getAttendanceToday }