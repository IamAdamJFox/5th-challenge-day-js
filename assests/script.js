// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements



// in the html.
$(function () {
  $('.saveBtn').on('click', function () {
    const $this = $(this);
    const val = $this.siblings('textarea').eq(0).val();
    const id = $this.parent().attr('id');

    localStorage.setItem(id, val);

    console.log(val);
  });
  // need fucntion to pull from local
  $('.time-block').each(function () {
    const $this = $(this);
    const id = $this.attr('id');
    const val = localStorage.getItem(id)

    $this.children('textarea').eq(0).val(val)
  });
  //to add current day
  const currentDay = $('#currentDay');
  const time = dayjs();
  currentDay.text(time.format('dddd, MMMM D'));

  const today = dayjs();
  const currentHour = parseInt(today.format("H"))



$(".time-block").each(function () {
  const timeBlock = $(this);
  const hour = timeBlock.attr("id").split("-").pop();
  console.log(hour);
  
  let currentHour = dayjs().hour();

  if(hour > currentHour) {
    timeBlock.addClass("future");
  }

  if(hour < currentHour){
    timeBlock.addClass('past')
  }
  else{
    timeBlock.addClass('present')
  }
});
  

});
