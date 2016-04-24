Template.menu.onCreated(() => {
	  Template.instance().subscribe( 'myMenu', Bars.findOne()._id )
});

AutoForm.hooks({
  insertMenuForm: {
    before: {
      insert: (doc) => {
        doc.barId = Bars.findOne()._id
				price_str = doc.price.toString()
				split = price_str.split('.')
				if (!split[1]) {
					doc.price = doc.price*100
				}else {
					let dollars = parseInt(split[0])*100
					let cents = parseInt(split[1].slice(0,2))
					if (split[1].length <2) {
						cents = parseInt(split[1].slice(0,1))*10
					}
					doc.price = dollars + cents
				}
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
Template.menu.events({
	"click .deleteItem": (event) => {
		MenuItems.remove({"_id": event.target.id})
	}
})

Template.menu.helpers({
  allMenuItems(){
    return MenuItems.find();
  },
	uniqueFormId(id){
		return "menuUpdateForm-" + id;
	}
});
