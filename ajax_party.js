// It's An AJAX PARTY!!
Ajax.Party = Class.create(Ajax.Request, {
  
  getBaseRequestOptions: function(options) {
    var request_options = {}
    Object.extend(request_options, Object.clone(Ajax.Party.Base.defaultOptions));
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

Ajax.Party.Base = {};
Ajax.Party.Base.defaultOptions = {
  parameters: {},
  onSuccess: Prototype.emptyFunction,
  onFailure: Prototype.emptyFunction  
},

Ajax.Party.create = function(class_name, options, class_default_options) {
  var default_options = {
    method: 'post',
    parameters: {},
    onSuccess: Prototype.emptyFunction,
    onFailure: Prototype.emptyFunction      
  }
  
  this[class_name] = Class.create(this, {
    default_options: Object.extend(default_options, options),
    
    initialize: function($super, url, parameters, callback, options) {
      this.defaultOptions = Object.clone(this.constructor.defaultOptions);
      $super(url, this.getRequestOptions(parameters, callback, options));          
    }
  });
  
  this[class_name].addMethods(Ajax.Party.Util.Methods);  
  this[class_name].defaultOptions = (class_default_options || {});
  this[class_name].create = this.create;
}

Ajax.Party.Util = {};
Ajax.Party.Util.Methods = {
  getRequestOptions: function(parameters, callback, options) {
    var request_options = new Object();
    Object.extend(request_options, Object.clone(this.default_options))
    Object.extend(request_options, this.defaultOptions)    
    request_options.parameters = Object.extend(Object.clone(request_options.parameters), parameters)    
    request_options.onSuccess = callback;
    if (options) {
      Object.extend(request_options.parameters, options.parameters)
      delete options.parameters        
      Object.extend(request_options, options)
    }
    return request_options;
  }
  
};

Ajax.Party.create('Post');
Ajax.Party.create('Get', { method: 'get'});
Ajax.Party.create('Put', { method: 'put'});
Ajax.Party.create('Delete', { method: 'delete'});




