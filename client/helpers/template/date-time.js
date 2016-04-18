Template.registerHelper( 'formatDateTime', ( timestamp ) => {
  if ( timestamp ) {
    return new Date(timestamp).toDateString()
  }
});

Template.registerHelper( 'formatDateTimeLocal', ( timestamp, timezone, format ) => {
  if ( timestamp && timezone && format ) {
    return moment( timestamp ).tz( timezone ).format( format );
  }
});

Template.registerHelper( 'today', () => {
  return Date()
})
