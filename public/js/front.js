$(document).ready(function(){
	if(localStorage && localStorage.record){
		var recordObj = JSON.parse(localStorage.record);
		var recordTime = [];
		var recordList = [];
		var recordHTML = "";

		console.log(recordObj);

		Object.keys(recordObj).map(function(item){
			recordTime.push(recordObj[item].time);
		})

		recordTime = recordTime.sort(function(a, b){return a - b;}).reverse();
		
		recordTime.map(function(t){
			Object.keys(recordObj).map(function(item){
				if(recordObj[item].time == t){
					recordList.push(recordObj[item]);
				}
			})
		})

		recordList.map(function(item){
			var picHTML = "";
			
			item.imgs.map(function(pic, index){
				switch(index){
					case 0:
						picHTML += "<a href='/shop/product/detail/" + item.id + "'>" +
						"<img src='" + pic + "'>" +
						"</a>";
						break;
					case 1:
						picHTML += "<a href='/shop/product/detail/" + item.id + "'>" +
						"<img class='pic-hover' src='" + pic + "'>" +
						"</a>";
						break;
					default:
						break;
				};
			});

			recordHTML += "<div class='col-3'>" +
			"<div class='product-box'>" +
			"<div class='product-pic'>" + picHTML + "</div>" +
			"<div class='product-category overflow-ellipsis' title='" + item.category + "'>" +
			item.category +
			"</div>" +
			"<div class='product-name overflow-ellipsis' title='" + item.name + "'>" +
			"<a href='/shop/" + item.id + "'>" + item.name + "</a>" + 
			"</div>" +
			"</div>" +
			"</div>"
		});

		$(".browse-record-container").removeClass('hide');
		$(".browse-record").append(recordHTML);
	}
})