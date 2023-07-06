const dayjs = require('dayjs')
dayjs().format()
function getHeaderDate() {
  var currentHeaderDate = dayjs().format('dddd, MMMM Do');
  document.getElementById("currentDay").textContent = currentHeaderDate;
}

function saveReminders() {
  localStorage.setItem("myDay", JSON.stringify(myDay));
}

function displayReminders() {
  myDay.forEach(function (_thisHour) {
    $("#" + _thisHour.id).val(_thisHour.reminder);
  });
}

function init() {
  var storedDay = JSON.parse(localStorage.getItem("myDay"));

  if (storedDay) {
    myDay = storedDay;
  }

  saveReminders();
  displayReminders();
}

// Loads header date
getHeaderDate();

// Creates the visuals for the scheduler body
myDay.forEach(function (thisHour) {
  // Creates timeblocks row
  var hourRow = $("<form>").attr({
    "class": "row",
  });
  $(".container").append(hourRow);

  // Creates time field
  var hourField = $("<div>")
    .text(thisHour.hour + thisHour.meridiem)
    .attr({
      "class": "col-md-2 hour",
    });

  // Creates scheduler data
  var hourPlan = $("<div>")
    .attr({
      "class": "col-md-9 description p-0",
    });
  var planData = $("<textarea>");
  hourPlan.append(planData);
  planData.attr("id", thisHour.id);
  
  // Add the past, present, or future class to each time block based on the current hour
  if (dayjs().isAfter(dayjs().format("HH"), "hour")) {
    planData.attr("class", "past");
  } else if (dayjs().isSame(dayjs().format("HH"), "hour")) {
    planData.attr("class", "present");
  } else if (dayjs().isBefore(dayjs().format("HH"), "hour")) {
    planData.attr("class", "future");
  }

  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  // You can use the id attribute of each time-block to access the saved data from the myDay array.
  
  // ...

  var saveButton = $("<i class='far fa-save fa-lg'></i>");
  var savePlan = $("<button>").attr({
    "class": "col-md-1 saveBtn",
  });
  savePlan.append(saveButton);
  hourRow.append(hourField, hourPlan, savePlan);
});

// Loads any existing localStorage data after components are created
init();

// Saves data to be used in localStorage
$(".saveBtn").on("click", function (event) {
  event.preventDefault();
  var saveIndex = $(this).siblings(".description").children(".future").attr("id");
  myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
  console.log(saveIndex);
  saveReminders();
  displayReminders();
});