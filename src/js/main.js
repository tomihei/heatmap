$(document).ready(function(){

    var center_location = new google.maps.LatLng(35.681298, 139.766247);

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: center_location,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });
    var heatmap = new google.maps.visualization.HeatmapLayer();
    heatmap.setMap(map);

    $("#file").change(function(e){
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e){
            var heatmapData = new Array();
            var arr = toArray(e.target.result);
            if(arr[arr.length -1][0] == "") arr.pop();
            $(arr).each(function(index,element){
                heatmapData.push(new google.maps.LatLng(parseFloat(element[0]),parseFloat(element[1])));
            });

            setheatMap(heatmapData);
        };
        reader.readAsText(file);
    });
},false);

function toArray(csv){
    var result = new Array();
    var rows = csv.split("\n");
    $(rows).each(function(){
        result.push(this.split(","));
    });
    return result;
}

function setheatMap(heatmapData) {

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: heatmapData[0],
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 10
    });
    heatmap.setMap(map);
}



