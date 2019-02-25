$(document).ready(function(){
	if(localStorage){
		var productDOM = $(".product-name");
		var time = new Date();
		var record = {};
		var product = {
			imgs: [],
			name: productDOM.data('name'),
			id: productDOM.data('id'),
			category: productDOM.data('category'),
			time: time.getTime()
		};
		$(".product-img").each(function(index, item){
			product.imgs.push($(item).data('src'));
		})

		if(localStorage.record){
			record = JSON.parse(localStorage.record);
		};

		record[product.id] = product;
		localStorage.record = JSON.stringify(record);
	}
})