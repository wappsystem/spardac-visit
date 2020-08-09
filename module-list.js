(function () {
    //-------------------------------------------------------------------------------------
    var modules = {
        "appointment-data": { url: "$H/m/appointment-data.html", Table: "demo-spardac-appointment", form_module: "appointment-form", participant_id:{field1:"Date",field2:"Email"} },
        "appointment-form": { url: "$H/m/appointment-form.html", Table: "demo-spardac-appointment",lookup:"demo-spardac-local-researcher",lookup2:"demo-spardac-appointment-type" },
        "calendar-appointment-week":    { url: "$H/m/calendar-appointment-week.html", Table: "demo-spardac-appointment","appointment":"appointment-form"},
        "calendar-appointment-month":   { url: "$H/m/calendar-appointment-month.html", Table: "demo-spardac-appointment","appointment":"appointment-form"},
        "calendar-appointment-day":     { url: "$H/m/calendar-appointment-day.html", Table: "demo-spardac-appointment", Table2: "demo-spardac-appointment-type","appointment":"appointment-form","researcher":"demo-spardac-local-researcher" },
        "calendar-appointment-waiting-list":    { url: "$H/m/calendar-appointment-waiting-list.html", Table: "demo-spardac-appointment","appointment":"appointment-form","researcher":"demo-spardac-local-researcher" },
        "researcher-data":  { url: "$H/m/researcher-data.html", Table: "demo-spardac-local-researcher", form_module: "researcher-form" },
        "researcher-form":  { url: "$H/m/researcher-form.html", Table: "demo-spardac-local-researcher" },
        "appointment-type-data":    { url: "$H/m/appointment-type-data.html", Table: "demo-spardac-appointment-type", form_module: "appointment-type-form" },
        "appointment-type-form":    { url: "$H/m/appointment-type-form.html", Table: "demo-spardac-appointment-type", lookup:"demo-spardac-equipment" },
        "equipment-data":   { url: "$H/m/equipment-data.html", Table: "demo-spardac-equipment", form_module: "equipment-form" },
        "equipment-form":   { url: "$H/m/equipment-form.html", Table: "demo-spardac-equipment" },
        "send-email":       { url:"$H/m/send-email-form.html", Table:"demo-spardac-appointment", task_name:"Send Email"},
        "check-equipment":  { url: "$H/m/equipment-day.html", Table: "demo-spardac-appointment", Table2: "demo-spardac-appointment-type", "appointment":"appointment-form" },
        "help":   { url: "$H/m/help.html" },
    }
    for (p in modules) {
        $vm.module_list[p] = modules[p];
        $vm.module_list[p].url = $vm.module_list[p].url.replace('$H', $vm.hosting_path);
    }
    //-------------------------------------------------------------------------------------
})();
