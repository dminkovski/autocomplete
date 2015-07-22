angular.module('input-autocomplete',[])
.controller('autocompleteController',function($scope)
{
	
})
.directive('autocomplete',function()
{
	var link = function($scope,element,attr)
		{
			$scope.menu = element.find('ul');
			$scope.input = element.find('input');
			$scope.timer = null;
			$scope.delay = 500;
			$scope.url = attr.url;
			$scope.id = attr.id;
			$scope.href = null;

			//Key Pressed -> Navigate in Autocomplete List or Perform search after Delay
			$scope.keyPressed = function(event)
			{
				if(event.which == 40) $scope.navigate('down');
				else if(event.which == 38) $scope.navigate('up');
				else if(event.which == 13)
				{
					$scope.selectElement();
				}
				else if(event.which != 13 && event.which != 9)
				{
					window.clearTimeout($scope.timer);
					$scope.timer = window.setTimeout(function(){$scope.getList()}, $scope.delay);
					
				}

			}		
			//Navigate inside the Autocomplete List		
			$scope.navigate = function(direction)
			{
				var menu = $scope.menu;
				var selectedLi = menu.find('li.hover');

				if(selectedLi.length <= 0) //No LI selected
				{
					if(direction == 'down') selectedLi = menu.find('li:first');
					else if(direction == 'up') selectedLi = menu.find('li:last');
				}
				else //LI selected
				{
					if(direction == 'down') 
						{
							if(selectedLi.index() == menu.find('li').length - 1) selectedLi = menu.find('li:first');
							else selectedLi = selectedLi.next('li');
						}
					else if(direction == 'up') 
						{
							if(selectedLi.index() == 0) selectedLi = menu.find('li:last');
							else selectedLi = selectedLi.prev('li');
						}
				}
				if(selectedLi != null)
				{
					menu.find('li.hover').removeClass('hover');
					selectedLi.addClass('hover');
					if(selectedLi.position().top >= selectedLi.parent().height() || selectedLi.position().top <= 0)
					{
						menu.animate({scrollTop:selectedLi.position().top+selectedLi.parent().scrollTop()},0);
					}		
				}
			}
			$scope.selectElement = function()
				{
					var li = $scope.menu.find('li.hover');

					if(li.length > 0)
					{	
						var value = li.find('a').attr('value');
						var text = li.find('a').text();

						$scope.input.val(text).attr('value',value).blur();
						$scope.menu.removeClass('open');
					}
					if($scope.href != null)
					{
						var url = $scope.href.url;
						var result = $scope.results[li.attr('index')];
						for(var prop in result)
						{
							if(url.indexOf('['+prop+']') >= 0)
							{
								url = url.replace('['+prop+']',result[prop]);
							}
						}
						if(!result.hasOwnProperty('query')) url = url.replace('[query]',result.value);
						window.location.href = url;
					}

			}
			$scope.callback = function(response)
			{
				var icon = element.find('.fa');
				if(icon.length > 0) icon.attr('class',icon.attr('old-class'));

				$scope.results = response.data;
				$scope.menu.addClass('open');
				$scope.$apply();
			}	
			$scope.getList = function()
				{
					var menu = $scope.menu;
					var input = $scope.input;
					var icon = element.find('.fa');
					menu.removeClass('open');

					var url =  '/'+$scope.url;
					var query = input.val();

					if(query.length > 0 && query != '')
					{
						var data = JSON.stringify({'query':query});
						if(icon.length > 0) 
						{
							icon.attr('old-class',icon.attr('class'));
							icon.attr('class','fa fa-circle-o-notch fa-spin');
						}
						$.ajax({url:url,type:"POST",data:data,contentType:'application/json'}).done(function(response)
						{
							$scope.callback(response);
						}).fail(function(response)
						{
							$scope.callback(response.responseJSON);
						});
					}
					
				}
			$scope.initializeUI = function()
			{
				if(attr.href != "" && attr.href.length > 0) $scope.href = JSON.parse(attr.href);
				$scope.input.on('keyup', $scope.keyPressed);

				$(document).on('blur','#'+$scope.id,function()
				{
					$(this).find('ul').removeClass('open');	
				});
				$(document).on('mousedown','#'+$scope.id+' ul li a',function()
				{
					var dropdown = $(this).closest('.'+$scope.listClass);
					dropdown.find('li.hover').removeClass('hover');
					$(this).parent().addClass('hover');
					$scope.selectElement();
				});
				$(document).on('mouseover','#'+$scope.id+' ul',function(event)
				{
					$(this).find('li.hover').removeClass('hover');	
				});
			}
			$scope.initializeUI();
		};
	return{
		restrict: 'E',
		transclude: true,
		templateUrl: '/public/partials/autocomplete.html',
		scope : {
			'id': ' = id',
			'url' : '= url',
			'link' : '=href'
		},
		link : link	
	};
});


