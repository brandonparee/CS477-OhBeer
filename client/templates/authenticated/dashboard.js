Template.dashboard.events({
    'click .card-panel': (e, t) => {
      $(e.currentTarget).parent().toggleClass('m4 m12');

    }
})
