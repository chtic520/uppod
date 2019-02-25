(function(){
	var map = new BMap.Map("allmap");  
	var top_left_navigation = new BMap.NavigationControl();
	var marker;        
	map.centerAndZoom("深圳",12);
	map.enableScrollWheelZoom(true);   
	map.addControl(top_left_navigation);      
	//单击获取点击的经纬度
	map.addEventListener("click",function(e){
		deletePoint(map)
		var _input = document.getElementById("position");
		_input.value = e.point.lng + "," + e.point.lat;
		var marker = new BMap.Marker(e.point);  // 创建标注
		map.addOverlay(marker); 
	});
})()

function deletePoint(map){
	var allOverlay = map.getOverlays();
	if (allOverlay.length > 0) {
		for(var i = 0; i < allOverlay.length; i++){
			map.removeOverlay(allOverlay[i]);
		}
	}
}