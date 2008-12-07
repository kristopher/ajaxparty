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

Ajax.Party.Get = Class.create(Ajax.Party, {  

  default_options: {  
    method: 'get',
    parameters: {},
    onSuccess: Prototype.emptyFunction,
    onFailure: Prototype.emptyFunction
  },
      
  initialize: function($super, url, parameters, callback, options) {
    this.defaultOptions = Object.clone(Ajax.Party.Post.defaultOptions);
    $super(url, this.getRequestOptions(parameters, callback, options));    
  } 
});

Ajax.Party.Get.defaultOptions = {
  parameters: {},
  onSuccess: Prototype.emptyFunction,
  onFailure: Prototype.emptyFunction
}

Ajax.Party.Post = Class.create(Ajax.Party, {  

  default_options: {  
    method: 'post',
    parameters: {},
    onSuccess: Prototype.emptyFunction,
    onFailure: Prototype.emptyFunction
  },
      
  initialize: function($super, url, parameters, callback, options) {
    this.defaultOptions = Ajax.Party.Post.defaultOptions;
    $super(url, this.getRequestOptions(parameters, callback, options));    
  } 
});

Ajax.Party.Post.defaultOptions = {
  parameters: {},
  onSuccess: Prototype.emptyFunction,
  onFailure: Prototype.emptyFunction
}

Ajax.Party.Put = Class.create(Ajax.Party, {

  default_options: {  
    method: 'put',
    parameters: {},
    onSuccess: Prototype.emptyFunction,
    onFailure: Prototype.emptyFunction
  },
  
  initialize: function($super, url, parameters, callback, options) {
    this.defaultOptions = Ajax.Party.Put.defaultOptions;
    $super(url, this.getRequestOptions(parameters, callback, options));    
  } 
  
});

Ajax.Party.Put.defaultOptions = {
  parameters: {},
  onSuccess: Prototype.emptyFunction,
  onFailure: Prototype.emptyFunction
}

Ajax.Party.Delete = Class.create(Ajax.Party, {

  default_options: {  
    method: 'delete',
    parameters: {},
    onSuccess: Prototype.emptyFunction,
    onFailure: Prototype.emptyFunction
  },

  initialize: function($super, url, parameters, callback, options) {
    this.defaultOptions = Ajax.Party.Delete.defaultOptions;
    $super(url, this.getRequestOptions(parameters, callback, options));    
  } 
      
});

Ajax.Party.Delete.defaultOptions = {
  parameters: {},
  onSuccess: Prototype.emptyFunction,
  onFailure: Prototype.emptyFunction
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

Ajax.Party.Get.addMethods(Ajax.Party.Util.Methods)
Ajax.Party.Post.addMethods(Ajax.Party.Util.Methods)
Ajax.Party.Put.addMethods(Ajax.Party.Util.Methods)
Ajax.Party.Delete.addMethods(Ajax.Party.Util.Methods)

window.Get = function(url, parameters, callback, options) {
  new Ajax.Party.Get(url, parameters, callback, options);
}

window.Post = function(url, parameters, callback, options) {
  new Ajax.Party.Post(url, parameters, callback, options);
}

window.Put = function(url, parameters, callback, options) {
  new Ajax.Party.Post(url, parameters, callback, options);
}

window.Delete = function(url, parameters, callback, options) {
  new Ajax.Party.Post(url, parameters, callback, options);
}

