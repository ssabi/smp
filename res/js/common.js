$(document).ready(function(){
	//상단 메뉴 아이콘
	var $topMenu = $("#top_menu");
	$topMenu.on({
		"click" : function(e){
			e.preventDefault();
			//console.log("clicked!!");

			
		}
	});

	//단말기 선택
	var $tbl = $("#rst_list");
	if($tbl.length > 0){
		var list = "#rst_list tbody tr";
		$(list).each(function(idx){
			$(this).bind({
				"click" : function(){
					var $this = $(this);
					$tbl.addClass("ing");
					$this.siblings().find(".chk input").attr("checked", false);
					//$tbl.find(".chk input").attr("checked", false);
					$(list).not($this).removeClass("checked");

					if($this.find(".chk input").prop("checked")){
						$this.find(".chk input").attr("checked", false);
						$this.removeClass("checked");
						$tbl.removeClass("ing");
					}else{
						$this.find(".chk input").attr("checked", true);
						$this.addClass("checked");
					}
				}
			});
		});
	}

	//번호검색
	var $tbl02 = $("#rst_list02");
	if($tbl02.length > 0){
		var list = "#rst_list02 tbody td";
		$(list).each(function(idx){
			$(this).bind({
				"click" : function(){
					var $this = $(this);
					$tbl02.addClass("ing");
					$(list).not($this).find(".chk input").attr("checked", false);
					//$tbl02.find(".chk input").attr("checked", false);
					$(list).not($this).removeClass("checked");

					if($this.find(".chk input").prop("checked")){
						$this.find(".chk input").attr("checked", false);
						$this.removeClass("checked");
						$tbl02.removeClass("ing");
					}else{
						$this.find(".chk input").attr("checked", true);
						$this.addClass("checked");
					}
				}
			});
		});
	}

	//Selectbox
	var $sel = $(".select");
	if($sel.length > 0){
		$sel.selectOrDie({
			size:6
		});
	}

	//Calendar
	ui_calendar();
});

//Layer Popup
var modal = function(option){
	//console.log(option)
	var opt = $.extend({
		id : null,
		pageUrl : null,
		customClass : "",
		callback : function(rst){
			console.log('This was logged in the callback: ' + rst);
		}
	}, option);

	var modal_bg = "<div class='modal_bg' data-model='"+opt.id+"' id='"+opt.id+"'></div>";
	var modal_wrap = "<div class='modal_wrap'></div>";
	var modal_inner = "<div class='modal_inner'></div>";
	var $body = $("body"), $modal = $('<div class="modal '+opt.customClass+'"></div>');
	var $closeBtn = $("<a href='#' class='modal_close' data-modal-close='"+opt.id+"'></a>");
	var $cont = $("<div class='load_content'></div>");
	$cont.load(opt.pageUrl);

	//var modalInner = $(modal_bg).append($(modal_wrap).append($(modal_inner).append($modal.append($closeBtn).append($cont))));
	var modalInner = $(modal_bg).append($(modal_wrap).append($(modal_inner).append($cont)));
	$body.append(modalInner);
	modalInner.fadeIn(200);
	$body.addClass("ovf");

	//Close
	/*
	$("body").on("click", "[data-modal-close]", function(e){
		e.preventDefault();
		var id = $(this).data("modal-close");

		$("[data-model='"+id+"']").fadeOut(150, function(){
			$('body').removeClass("modal_open");
			$(this).remove();
		});
	});
	*/
	$("body").on("click", ".modal_close", function(e){
		e.preventDefault();

		$(this).closest(".modal_bg").fadeOut(150, function(){
			$('body').removeClass("ovf");
			$(this).remove();
		});
	});

	$(document).on('mousedown touchstart focusin', function(e){
		if($(e.target).closest(".modal").length === 0){
			$(e.target).closest(".modal_bg").fadeOut(150, function(){
				$('body').removeClass("ovf");
				$(this).remove();
			});
		}
	});
};

//Layer Popup - Container Full Screen
var modal_full = function(option){
	//console.log(option)
	var opt = $.extend({
		id : null,
		pageUrl : null,
		customClass : "",
		callback : function(rst){
			console.log('This was logged in the callback: ' + rst);
		}
	}, option);

	var modal_bg = "<div class='modal_bg02' data-model='"+opt.id+"' id='"+opt.id+"'></div>";
	var $body = $("body");
	var $closeBtn = $("<a href='#' class='modal_close' data-modal-close='"+opt.id+"'></a>");
	var $cont = $("<div class='load_content'></div>");
	$cont.load(opt.pageUrl);

	var modalInner = $(modal_bg).append($cont);
	$body.append(modalInner);
	modalInner.fadeIn(200);
	$body.addClass("ovf");

	//Close
	/*
	$("body").on("click", "[data-modal-close]", function(e){
		e.preventDefault();
		var id = $(this).data("modal-close");

		$("[data-model='"+id+"']").fadeOut(150, function(){
			$('body').removeClass("ovf");
			$(this).remove();
		});
	});
	*/
	$("body").on("click", ".modal_close", function(e){
		e.preventDefault();

		$(this).closest(".modal_bg02").fadeOut(150, function(){
			$('body').removeClass("ovf");
			$(this).remove();
		});
	});

	$(document).on('mousedown touchstart focusin', function(e){
		if($(e.target).closest(".full_modal").length === 0){
			$(e.target).closest(".modal_bg02").fadeOut(150, function(){
				$('body').removeClass("ovf");
				$(this).remove();
			});
		}
	});
};

//MaxLength Check
var maxLengthCheck = function(object){
	if(object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}
};

//Calendar
var ui_calendar = function(){
	var $date = $(".datepicker");
	//var $date = $(".calendar");

	if($date.length > 0){
		$date.datepicker({
			format: 'yyyy.mm.dd',
			language: "kr",
			keyboardNavigation: false,
			forceParse: false,
			autoclose: true
		});
	}
};