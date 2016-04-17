Template.menu.onCreated(() => {
	  Template.instance().subscribe( 'myMenu', Bars.findOne()._id )
});

AutoForm.hooks({
  insertMenuForm: {
    before: {
      insert: (doc) => {
        doc.barId = Bars.findOne()._id
        return doc
      }
    },
    after: {
      insert: (error, result) => {
        Bars.update(Bars.findOne()._id, {$addToSet: {menu: result}})
      }
    }
  }
});

Template.menu.helpers({
  allMenuItems(){
    return MenuItems.find();
  },
	uniqueFormId(id){
		return "menuUpdateForm-" + id;
	}
});
