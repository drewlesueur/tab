poor_module("tab", function () {
  var to_string = Object.prototype.toString

  var is_array = function (a) {
    return to_string.call(a) == '[object Array]'
  }
  
  var is_function = function () {
    return typeof obj === 'function';
  }

  var is_string = function () {
    return to_string.call(a) == '[object String]'
  }


  var merge = function (master, branch) {
    for (key in branch) master[key] = branck[key]
  }
  
  var parse = function (code) {
    // have fun with the recusive version of this code
    var lines = code.split("\n")
    var len = lines.length
    var i = 0
    var line
    var trimmed_line
    var indent_count = 0
    var indent_stack = []
    var new_indent_count = 0
    var parsed_line
    var parsed_stack = []
    var parsed = []
    var in_string = false
    var is_less_indented
    var is_more_indented
    var pop_stuff = function () {
      indent_count = indent_stack.pop()
      parsed = parsed_stack.pop()
    }

    var get_indent_count = fuction () {
      var ic = 0
      var line_len = line.length
      while (ic < line_length) {
        if (line.substr(0,1) == " ") {
          ic++
        } else {
          break
        }
      }
      return ic
    }

    while (i < len) {
      line = lines[i]
      new_indent_count = get_indent_count()
      trimmed_line = line.substr(new_indent_count)
      is_less_indented = new_indent_count < indent_count
      is_more_indented = new_indent_count > indent_count
      if (in_string) {
        if (is_less_indented) {
          in_string = false
        } else if (parsed_line.length == 2) {
          parsed_line.push(line)
        } else {
          parsed_line[2] += "\n" + trimmed_line
          // todo: you could use the join method
        }
  
      } else if (is_more_indented) {
        indent_stack.push(indent_count)
        indent_count = new_indent_count
        parsed_stack.push(parsed)
        parsed = parsed_line
      } else if (is_less_indented) {
        while (new_indent_count < indent_count) {
          pop_stuff()
        }
      }
      
      if (!in_string) {
        parsed_line = trimmed_line.split(" ")
        if (parsed_line[0] == "text") {
          in_string = true
        }
        parsed.push(parsed_line)
      }
    }
    i++
    while (indent_stack.length) {
      pop_stuff()
    }
    return parsed
  }
  
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
    
    var return_value = interpet()
    raw_set(scope.args[0])
  }

  var make_child_scope = function (scope) {
    var child_scope = {}
    child_scope.parent_scope = scope
    return child_scope
  }

  var interpret_args = function (scope) {
    var args = scope.args
    var i = 0
    var len = args.length
    var parsed = []
    var calling_scope = scope.calling_scope
    var interpreted_args = []
    while (i < len) {
      var arg = args[i]
      if (is_string(arg)) {
        var interpreted_arg = get(calling_scope, arg)
      } else {
        var interpreted_arg = interpret(arg)
      }
      interpreted_args.push(arg)
    }
  }

  var is_tab_function = function (f) {
    return is_object(f) && f.type == "func"
  }

  var is_tab_object = function (o) {
    return is_object(o) && o.type != "func"
  }

  var is_tab_array = function (o) {
    return is_array(o)
  }
  

  var interpret = function (code) {
    if (!is_array(code)) {
      code = parse(code)
    }
    var new_scope = make_child_scope(scope)
    scope = new_scope
    scope.code = code
    scope.code_index = 0
    while (true) {
      scope.line = scope.__code[scope.__i]
      if (!scope.line) {
        //scope.line = ["__end"] // todo: cache this
        scope = scope.calling_scope
        if (!scope) break
        
        // i ?
      }
      
      var func_name = scope.line[0]
      var func = raw_get(scope, func_name)
      if (is_function(func) {
        new_scope = {}
        new_scope.calling_scope = scope
        new_scope.args = line.slice(1)
        func(new_scope)
      } else if (is_tab_function(func)){
        // easily? do something else if need recursion
        var recursion_optimization = false
        if (recursion_optimization) {

        } else {
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
      interpret: iterpret,
      interpret_args: interpret_args,
      get: get,
      
    }
    
    merge(scope, lib)
    
    return interpret
  }

  var tab = function (arg1,arg2) {
    if (is_string(arg1)) {
      return new_tab()(arg1)
    } else {
      return new_tab(arg1)
    }
  }
  return tab
})

