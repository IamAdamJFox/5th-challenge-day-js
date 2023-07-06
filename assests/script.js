$(function () {
  // save button function to save text
  $('.saveBtn').on('click', function () {
    const $this = $(this);
    const val = $this.siblings('textarea').eq(0).val();
    const id = $this.parent().attr('id');

    localStorage.setItem(id, val);

    console.log(val);
  });
  //this function pulls saved item from local storage
  $('.time-block').each(function () {
    const $this = $(this);
    const id = $this.attr('id');
    const val = localStorage.getItem(id)

    $this.children('textarea').eq(0).val(val)
  });
//sets current day for the header in html
  const currentDay = $('#currentDay');
  const time = dayjs();
  currentDay.text(time.format('dddd, MMMM D'));

//sets dayjs and hour
  const today = dayjs();
  const currentHour = parseInt(today.format("H"))



$(".time-block").each(function () {
  const timeBlock = $(this);
  const hour = timeBlock.attr("id").split("-").pop();
  console.log(hour);
  
  let currentHour = dayjs().hour();
//if statements set ccs classes for present, past, and future
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
