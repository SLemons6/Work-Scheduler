const minute = 60 * 1000;
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};

$("#currentDay").text(dayjs().format("dddd, MMMM Do"));

$(".time-block").each(function() {
    var hour = $(this)
        .find(".hour")
        .text()
        .trim();

    if (savedEvents[hour]) {
        $(this).find("textarea").val(savedEvents[hour]);
    }
});

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

    // remove any old classes from element
    $(textEl).removeClass("past present future");

    var currentHour = dayjs().hour();

    // apply new class if task is near/over due date
    if (time.hour() === currentHour) {
        $(textEl).addClass("present")
    } else if (time.hour() > currentHour) {
        $(textEl).addClass("future")
    } else {
        $(textEl).addClass("past");
    }
};

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





setInterval(function() {
    $(".time-block").each(function() {
        setTimeBlockColor($(this));
    });
}, minute);

$(".time-block").each(function() {
    setTimeBlockColor($(this));
});