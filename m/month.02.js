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
      var d = $vm.first_day_of_current_month();
      d.setMonth(d.getMonth() + m.ref);
      var s = (d.getMonth() + 1) + '/' + d.getFullYear();
      $('#month_year__ID').text(s);

      var d = new Date();
      var y = d.getFullYear()
      var mm = d.getMonth() + m.ref;
      var d0 = new Date(y, mm, 1, 0, 0, 0, 0);
      var e = d0.getDay(); if (e === 0) e = 7;
      e = e - 1; //0,1,...6 --- Monday....Sunday
      var x = $vm.date_add_days(d0, -e - 1); m.first_day = x;
      var y = $vm.date_add_days(d0, -e + 41 + 1); m.last_day = y;
}
m.set_ref();
//---------------------------------------------
m.get_cell_div = function (d) {
      var R = undefined;
      $('#calendar__ID u').each(function () {
            var ddd = $(this).data('d');
            if (ddd !== undefined) {
                  var sd = $vm.date_to_yyyymmdd(ddd)
                  if (sd === d) {
                        R = $(this).parent().next().next();
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
      var d = new Date();
      var y = d.getFullYear()
      var mm = d.getMonth() + m.ref;    //_ref is a number from toolbar
      var d0 = new Date(y, mm, 1, 0, 0, 0, 0);
      var m0 = d0.getMonth();
      var e = d0.getDay(); if (e === 0) e = 7;
      e = e - 1; //0,1,...6 --- Monday....Sunday
      var n = d0.getDate()
      var id = new Date().getTime();
      for (var i = 0; i < 6; i++) {
            var row = "<div class=row__ID>";
            for (var j = 0; j < 7; j++) {
                  var idd = 'A' + id + '_' + i + '_' + j
                  var idb = 'B' + id + '_' + i + '_' + j
                  var d = $vm.date_add_days(d0, -e + 7 * i + j)
                  var N = d.getDate();
                  var lcolor = "";
                  var col_class = 'col__ID';
                  if ((i == 0 && N > 20) || ((i == 5 || i == 4) && N < 15)) { lcolor = "color:#999"; col_class = "'col__ID not_this_month'"; }
                  var N = "<u id=" + idd + " style=cursor:pointer>" + N + "</u>";
                  var weekday = "<span class=weekday>&nbsp;</span>";
                  if (d.getDate() == new Date().getDate() && d.getMonth() == new Date().getMonth()) {
                        row += "<div class=" + col_class + " ><div class=day__ID style='" + lcolor + ";background-color:lightcoral'>" + N + "</div>" + weekday + "&nbsp;<div class=event_container><div style='color:black;padding:3px;' class='item__ID' ><div id="+idb+" style='padding:3px; background-color:#fefefe;border-radius:3px;' > <i class='fas fa-plus'></i></div></div></div></div>";            
                  }
                  else{ 
                        row += "<div class=" + col_class + " ><div class=day__ID style='" + lcolor + "'>" + N + "</div>" + weekday + "&nbsp;<div class=event_container><div style='color:black;padding:3px;' class='item__ID' ><div id="+idb+" style='padding:3px; background-color:#fefefe;border-radius:3px;' > <i class='fas fa-plus'></i></div></div></div></div>";
                  }
            }
            row += "</div>";
            $('#body__ID').append(row);
            for (var j = 0; j < 7; j++) {
                  var d = $vm.date_add_days(d0, -e + 7 * i + j)
                  var idd = 'A' + id + '_' + i + '_' + j
                  var idb = 'B' + id + '_' + i + '_' + j
                  $('#' + idd).data('d', d);
                  $('#' + idb).data('d', d);
                  $('#' + idd).on('click', function () {
                        m.on_day_click_fun($vm.date_to_yyyymmdd($(this).data('d')));
                  })
                  $('#' + idb).on('click', function () {
                        m.on_day_click_fun_appointment($vm.date_to_yyyymmdd($(this).data('d')))
                  })
            }
      }
}
//-----------------------------------
m.on_day_click_fun = function () { }
m.request_and_render = function () { };
//---------------------------------------------