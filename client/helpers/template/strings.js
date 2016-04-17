Template.registerHelper( 'capitalize', ( string ) => {
  if ( string ) {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
  }
});

Template.registerHelper( 'lowercase', ( string ) => {
  if ( string ) {
    return string.toLowerCase();
  }
});

Template.registerHelper( 'parseMarkdown', ( string ) => {
  if ( string && parseMarkdown ) {
    return parseMarkdown( string );
  }
});

Template.registerHelper('prettyPrice', (price) => {
	let str = "$" + (price/100).toString()
  if (str.split('.')[1]){
  	if (str.split('.')[1].length < 2) {
  		str += "0"
  	}
  }else{
    str += ".00"
  }
	return str
})
