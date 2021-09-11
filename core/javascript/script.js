const minute = 60 * 1000;
// retrieve previous textarea input 
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};

// find current date to display on header 
$("#currentDay").text(dayjs().format("dddd, MMMM Do"));

// select text areas from each hour row
$(".time-block").each(function() {
    var hour = $(this)
        .find(".hour")
        .text()
        .trim();

    if (savedEvents[hour]) {
        $(this).find("textarea").val(savedEvents[hour]);
    }
});

// adjust time block classes based on current vs scheduled task times
var setTimeBlockColor = function(timeBlockEl) {
    // get time from task element
    var hour = $(timeBlockEl)
        .find(".hour")
        .text()
        .trim();

    // 
    var time = dayjs(hour, "H A")

    var textEl = $(timeBlockEl)
        .find("textarea");

    // remove any old classes from hour textarea elements
    $(textEl).removeClass("past present future");

    // find current time 
    var currentHour = dayjs().hour();

    // apply new class based on time determined by currentHour var
    if (time.hour() === currentHour) {
        $(textEl).addClass("present")
    } else if (time.hour() > currentHour) {
        $(textEl).addClass("future")
    } else {
        $(textEl).addClass("past");
    }
};

// save input from textareas when user clicks save button
$('.saveBtn').click(function() {
    var timeBlockEl = $(this).parent(".time-block");
    var hour = $(timeBlockEl)
        .find(".hour")
        .text()
        .trim();
    var eventText = $(timeBlockEl).find("textarea").val();
    savedEvents[hour] = eventText;
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
})

// check status of each time block every minute
setInterval(function() {
    $(".time-block").each(function() {
        setTimeBlockColor($(this));
    });
}, minute);

$(".time-block").each(function() {
    setTimeBlockColor($(this));
});