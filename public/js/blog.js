$(document).ready(function(){
	$(".blog-content").each(function(){
		var $this = $(this);
		$this.html(sliceBlog($this.text()))
	})

	function sliceBlog(text){
		var sliceText = text.split(' ').slice(0, 95).join(' ') + " [...]";
		return sliceText
	}
})