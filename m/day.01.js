//---------------------------------------------
var m=$vm.module_list['__MODULE__'];
if(m.prefix==undefined) m.prefix="";
m.change_status=0;
m.ref=0
var autoselect=""
//---------------------------------------------
$('#new__ID').on('click',function(){ var date=$('#date__ID').val(); $vm.load_module(m.appointment,'',{day:date,goback:1})	})
$('#previous__ID').on('click',function(){   clear_page(); m.ref--;	m.set_ref();	m.request_and_render();	})
$('#this__ID').on('click',    function(){	clear_page(); m.ref=0;  m.set_ref();	m.request_and_render();	})
$('#next__ID').on('click',    function(){	clear_page(); m.ref++;	m.set_ref();	m.request_and_render();	})
$('#refresh__ID').on('click', function(){	clear_page(); m.request_and_render();	})
//---------------------------------------------
$('#date__ID').on('change',function(){
    m.ref=$vm.date_day_diff($vm.date_today(),$vm.date_yyyymmdd_parse($('#date__ID').val()));
    clear_page();
    m.request_and_render();
});
//---------------------------------------------
m.set_ref=function(){
    var d=$vm.date_to_yyyymmdd($vm.date_add_days($vm.date_today(),m.ref));
    $('#date__ID').val(d);
}
m.set_ref();
//---------------------------------------------
m.request_and_render=function(){};
//---------------------------------------------
var autocomplete_req = { cmd: "find", field: '.Data.Name', table: m.researcher, options: {}, skip: 0, limit: 10 }
var autocomplete_callback = function (item) {
    $('#Researcher_search__ID').val(item.label);
}
var autocomplete_list = function (records) {
    var items = [];
    var obj = {};
    for (var i = 0; i < records.length; i++) {
        obj = {};
        obj.label = records[i].Data["Name"];
        obj.UID = records[i].UID;
        items.push(obj);
    }
    return items;
}
var wait1 = function () {
    $vm.autocomplete($('#Researcher_search__ID'), autocomplete_req, autocomplete_list, autocomplete_callback);
}
var I = 0; var loop_1 = setInterval(function () {
    if ($vm['jquery-ui-min-js'] != undefined) { clearInterval(loop_1); wait1(); }
    I++; if (I > 50) { clearInterval(loop_1); alert("jquery-ui.min.js is not installed."); }
}, 100);
//-------------------------------------
