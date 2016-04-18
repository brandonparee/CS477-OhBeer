Template.registerHelper('session', (key) => {
  return Session.get(key)
})
