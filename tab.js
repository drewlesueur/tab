poor_module("tab", function () {
  var parse = poor_module("tab_expression")
  var to_string = Object.prototype.toString
  var is_array = function (a) { return to_string.call(a) == '[object Array]' }
  var is_function = function (obj) { return typeof obj === 'function'; }
  var is_string = function (a) { return to_string.call(a) == '[object String]' }
  var merge = function (master, branch) { for (key in branch) master[key] = branch[key] }
  
  var raw_get = function (scope, name) {
    // todo: maybe some clever caching
    while (scope) {
      if (name in scope) return scope[name]
      scope = scope.parent_scope
    }
    return name
  }

  var get = function (scope) {
    var name = scope.args[1]
    return raw_get(scope, name)
  }

  var raw_set
  var set = function (scope) {
    var args = scope.args
    var sub_expr = args.slice()
    var return_value = interpet()
    raw_set(args[0])
  }

  var make_child_scope = function (scope) {
    var child_scope = {}
    child_scope.scope = child_scope
    child_scope.parent_scope = scope
    return child_scope
  }

  var interpret_args = function (scope) {
    var args = scope.args
    return raw_interpret(args)
  }

  var raw_interpret_args = function (args) {
    var i = 0
    var len = args.length
    var parsed = []
    var calling_scope = scope.calling_scope
    var interpreted_args = []
    while (i < len) {
      var arg = args[i]
      if (is_string(arg)) {
        //TODO; the interpret method should be able to do this?
        var interpreted_arg = get(calling_scope, arg)
      } else {
        var interpreted_arg = interpret(arg)
      }
      interpreted_args.push(arg)
    }
  }

  var is_tab_function = function (f) { return is_object(f) && f.type == "func" }
  var is_tab_object = function (o) { return is_object(o) && o.type != "func" }
  var is_tab_array = function (o) { return is_array(o) }

  var interpret = function (scope) {
    //todo: maybe some of these checks can be moved into another function
    if (!scope.i) { scope.i = 0}
    if (is_array(scope)) {
      scope = {code: scope, i: 0, parent_scope: lib}
    }
    if (!is_array(scope.code)) {
      scope.code = parse(scope.code)
    }
    // i think this code is good but it belongs somewhere else
    //var new_scope = make_child_scope(scope)
    //scope = new_scope
    //scope.code = code
    //scope.code_index = 0
    while (true) {
      scope.line = scope.code[scope.code_index ]
      if (!scope.line) {
        if (scope.goto_stack.length) {
          var goto_info = scope.goto_stack.pop()
          scope.i = goto_info[0]
          scope.code = goto_info[1]
        }
        scope = scope.calling_scope
        if (!scope) break
        // i?
      }
      
      var func_name = scope.line[0]
      var func = raw_get(scope, func_name)
      if (is_function(func)) {
        new_scope = {}
        new_scope.calling_scope = scope
        new_scope.args = line.slice(1)
        func(new_scope)
      } else if (is_tab_function(func)){
        // easily? do something else if need recursion
        var recursion_optimization = false
        if (recursion_optimization) {

        } else {
          // all scopes?! think about this
          new_scope = make_child_scope(func.scope)
          new_scope.calling_scope = scope
          new_scope.args = line.slice(0)
          new_scope.code_index = 0
          new_scope.code = func.code
          scope = new_scope
        }
      } else if (is_tab_object(func)){
        return func[line[1]]
      } else {
        // its an object or array
      }
    }
    scope = scope.parent_scope
  }

  var new_tab = function (scope) {
    scope = scope || {}

    var lib = {
      scope: scope,
      parent_scope: null,
      interpret: interpret,
      interpret_args: interpret_args,
      get: get,
      say: function (scope) { console.log.apply(console, scope.args)}
    }
    
    merge(scope, lib)
    return interpret
  }

  var tab = function (arg1) {
    if (is_string(arg1)) {
      return new_tab()(arg1)
    } else {
      return new_tab(arg1)
    }
  }
  return tab
})

