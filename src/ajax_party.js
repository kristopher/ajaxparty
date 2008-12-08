// It's An AJAX PARTY!!
if (!Prototype) {
  throw("ajax_party.js requires including the prototype.js Library.");
}

Ajax.Party = Class.create(Ajax.Request, {
  
  getBaseRequestOptions: function(options) {
    var request_options = {}
    Object.extend(request_options, Object.clone(Ajax.Party.class_default_options));
    if (options) {
      request_options.parameters = Object.extend(Object.clone(request_options.parameters), options.parameters);
      delete options.parameters;
      Object.extend(request_options, options);    
    }
    return request_options
  },
  
  initialize: function($super, url, options) {
    $super(url, this.getBaseRequestOptions(options));
  } 
});

Ajax.Party.Util = {};
Ajax.Party.Util.Methods = {
  Class: {
    class_default_options: {},
    
    create: function(class_name, options, class_default_options) {
      options = (options || {});

      var new_class = this[class_name] = Class.create(this, {
        default_options: options,
        
        initialize: function($super, url, parameters, callback, options) {
          $super(url, this.getRequestOptions(parameters, callback, options));          
        }
      }).addMethods(Ajax.Party.Util.Methods.Instance);

      Object.extend(new_class, Ajax.Party.Util.Methods.Class);
      Object.extend(new_class.class_default_options, class_default_options);
      return new_class;  
    }
  },
  
  Instance: {
    getRequestOptions: function(parameters, callback, options) {
      var request_options = {};
      Object.extend(request_options, Object.clone(this.default_options))
      Object.extend(request_options, Object.clone(this.constructor.class_default_options))    
      request_options.parameters = Object.extend(Object.clone(request_options.parameters), parameters)    
      request_options.onSuccess = callback;
      if (options) {
        Object.extend(request_options.parameters, options.parameters)
        delete options.parameters        
        Object.extend(request_options, options)
      }
      return request_options;
    }
  }
};

Object.extend(Ajax.Party, Ajax.Party.Util.Methods.Class);

Ajax.Party.create('Post');
Ajax.Party.create('Get', { method: 'get'});
Ajax.Party.create('Put', { method: 'put'});
Ajax.Party.create('Delete', { method: 'delete'});
