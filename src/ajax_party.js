// It's An AJAX PARTY!!
if (!Prototype) {
  throw("ajax_party.js requires including the prototype.js Library.");
}

Ajax.Party = Class.create(Ajax.Request, {
  initialize: function($super, url, parameters, callback, options) {
    $super(url, this.getRequestOptions(options));
  } 
});

Ajax.Party.Util = {};
Ajax.Party.Util.Methods = {
  Class: {
    class_default_options: {},
    
    create: function(class_name, default_instance_options, class_default_options) {      
      var new_class = this[class_name] = Class.create(this, {
        initialize: function($super, url, parameters, callback, options) {
          var request_options = this.getRequestOptions(options, parameters, callback);
          this.setKlassForSuperCall()
          $super(url, null, null, request_options);          
        }
      });

      new_class.addMethods(Ajax.Party.Util.Methods.Instance);
      new_class.addMethods({
        default_options: default_instance_options || {},
        klass: this[class_name], 
        superclass: this    
      });      
      Object.extend(new_class, Ajax.Party.Util.Methods.Class);
      new_class.class_default_options = (class_default_options || {});
      return new_class;  
    }
  },
  
  Instance: {
    getRequestOptions: function(options, parameters, callback) {
      var request_options = {};
      request_options = this.mergeOptions(request_options, this.default_options);
      request_options = this.mergeOptions(request_options, this.klass.class_default_options);
      request_options = this.mergeOptions(request_options, { parameters: (parameters || {}) })
      if (callback && !request_options.onSuccess) {
        request_options.onSuccess = callback;
      }
      request_options = this.mergeOptions(request_options, options);      
      return request_options;
    },    

    perpareOptionsForMerge: function(object) {
      // TODO see if all this cloning necessary
      if (object) {
        object = Object.clone(object)
        if (object.parameters) {
          if (Object.isFunction(object.parameters)) {
            object.parameters = object.parameters();
          }      
          object.parameters = Object.clone(object.parameters);
        }
        return object; 
      } else {
        return {};
      }
    },
    
    mergeOptions: function(destination, source) {
      // TODO see if all this cloning necessary
      destination = this.perpareOptionsForMerge(destination);
      source = this.perpareOptionsForMerge(source);
      if (source.parameters) {
        if (destination.parameters) {
          destination.parameters = Object.extend(Object.clone(destination.parameters), Object.clone(source.parameters));      
        } else {
          destination.parameters = Object.clone(source.parameters);
        }
        delete source.parameters;
      }
      return Object.extend(destination, source)
    },
    
    setKlassForSuperCall: function() {
      //TODO
      this.klass = this.superclass;
      this.superclass = this.klass.superclass;
    }    
  }
};

Ajax.Party.addMethods(Ajax.Party.Util.Methods.Instance);
Object.extend(Ajax.Party, Ajax.Party.Util.Methods.Class);

Ajax.Party.create('Post');
Ajax.Party.create('Get', { method: 'get'});
Ajax.Party.create('Put', { method: 'put'});
Ajax.Party.create('Delete', { method: 'delete'});
