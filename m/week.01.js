//---------------------------------------------
var m = $vm.module_list['__MODULE__'];
if (m.prefix == undefined) m.prefix = "";
m.change_status = 0;
m.ref = 0
//---------------------------------------------
$('#previous__ID').on('click', function () { m.ref--; m.set_ref(); m.request_and_render(); })
$('#this__ID').on('click', function () { m.ref = 0; m.set_ref(); m.request_and_render(); })
$('#next__ID').on('click', function () { m.ref++; m.set_ref(); m.request_and_render(); })
$('#refresh__ID').on('click', function () { m.request_and_render(); })
//---------------------------------------------
m.set_ref = function () {
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";      
      var d = $vm.first_day_of_current_week();
      m.first_day = $vm.date_add_days(d, 7 * m.ref);
      m.last_day = $vm.date_add_days(d, 7 * m.ref + 6);
      var s = "" + $vm.yyyymmdd_to_ddmmyyyy($vm.date_to_yyyymmdd(m.first_day)) + " - " + $vm.yyyymmdd_to_ddmmyyyy($vm.date_to_yyyymmdd(m.last_day));
      $('#period__ID').text(s);
      var header=""
      var colour='';
      for(var i=0;i<7;i++){
            var dates=$vm.date_add_days(d, 7 * m.ref+i);
            if (dates.getDate() == new Date().getDate() && dates.getMonth() == new Date().getMonth()) colour="style='background-color:lightcoral'";
            else colour=''
            header+="<div class='col_header__ID' "+colour+" id=week_header_select__ID"+i+" >"+weekday[dates.getDay()]+" "+$vm.yyyymmdd_to_ddmmyyyy($vm.date_to_yyyymmdd(dates))+"</div>";
      }
      $('#day_header__ID').html(header);
      $('#week_header_select__ID0').on('click',function(){to_week_day(0);});
      $('#week_header_select__ID1').on('click',function(){to_week_day(1);});
      $('#week_header_select__ID2').on('click',function(){to_week_day(2);});
      $('#week_header_select__ID3').on('click',function(){to_week_day(3);});
      $('#week_header_select__ID4').on('click',function(){to_week_day(4);});
      $('#week_header_select__ID5').on('click',function(){to_week_day(5);});
      $('#week_header_select__ID6').on('click',function(){to_week_day(6);});
      var to_week_day=function(wd){
            var dates=$vm.date_add_days(m.first_day, wd);
            $vm.load_module("calendar-appointment-day",'',{fromweek:$vm.date_to_yyyymmdd(dates)});
      }
}
m.set_ref();
//---------------------------------------------
m.get_cell_div = function (d) {
      var R = undefined;
      $('#calendar__ID i').each(function () {
            var ddd = $(this).parent().data('d');
            if (ddd !== undefined) {
                  var sd = $vm.date_to_yyyymmdd(ddd)
                  if (sd === d) {
                        R = $(this).parent().parent();
                        return false;
                  }
            }
      })
      if (R !== undefined) return $(R);
      return R;
}
//-----------------------------------
m.calendar_render = function (html) {
      $('#body__ID').html('');
      var id = new Date().getTime();
      for (var i = 0; i < 1; i++) {
            var row = "<div class=row__ID>";
            for (var j = 0; j < 7; j++) {
                  var idd = 'A' + id + '_' + i + '_' + j
                  var d = $vm.date_add_days(m.first_day, j)
                  row += "<div class=col__ID><div class=event_container__ID><div style='color:black;padding:3px;'  ><div class='item__ID' id="+idd+" style='background-color:#fafafa;' > <i class='fas fa-plus'></i> </div></div></div></div>";
            }
            row += "</div>";
            $('#body__ID').append(row);
            for (var j = 0; j < 7; j++) {
                  var d = $vm.date_add_days(m.first_day, j);
                  var idd = 'A' + id + '_' + i + '_' + j
                  $('#' + idd).data('d', d);
                  $('#' + idd).on('click', function () {
                        var date = $vm.date_to_yyyymmdd($(this).data('d'))
                        m.on_day_click_fun(date);
                  })
            }
      }
}
//-----------------------------------
m.on_day_click_fun = function () { }
m.request_and_render = function () { };
//---------------------------------------------
