function valueElementForm(nameElement) {
	var newNameElement = '.' + nameElement;
		element = $(newNameElement);
	element.each(function(index, el) {
		var elementInput = $(this).find($(newNameElement + '__input')),
			elementLabel = $(this).find($(newNameElement + '__label')),
			elementValue = index + 1;
		elementInput.attr('id', nameElement + '-' + elementValue);
		elementLabel.attr('id', nameElement + '-' + elementValue);
	});
	
}
valueElementForm('checkbox');