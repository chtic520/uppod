(function(){
	var latitude = document.getElementById('latitude').value;
	var longitude = document.getElementById('longitude').value;
	var map = new BMap.Map("map");  
	var top_left_navigation = new BMap.NavigationControl();
	var marker;
	map.enableScrollWheelZoom(true);   
	map.addControl(top_left_navigation);

	var point = new BMap.Point(longitude, latitude);
	map.centerAndZoom(point, 17);
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker); 
	var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
	map.addControl(overViewOpen); 

	var opts = {
	  position : point,    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(10, -30)    //设置文本偏移量
	}
	var label = new BMap.Label("深圳市卡孚莱变速箱科技有限公司", opts);  // 创建文本标注对象
		label.setStyle({
			 color : "black",
			 fontSize : "12px",
			 height : "20px",
			 lineHeight : "20px",
			 fontFamily:"微软雅黑",
			 borderColor: "black"
		 });
	map.addOverlay(label); 
})()