tepoor_module("tab", function () {
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
  
  var raw_get = function (scope, raw) {
    // todo: maybe some clever caching
    while (scope) {
      if (name in scope) return scope[name]
      scope = scope.__parent_scope
    }
    return null
  }

  var get = function (scope) {
    var name = scope.args[1]
    return raw_get(scope, name)
  }

  var make_child_scope = function (scope) {
    var child_scope = {}
    child_scope.__parent_scope = scope
    return child_scope
  }

  var interpret_args = function (scope) {
    var args = scope.args
    var i = 0
    var len = args.length
    var parsed = []
    while (i < len) {
      var arg = args[i]
      if (is_string(arg)) {
        
      }
    }
  }

  var interpret = function (scope, code) {
    if (!is_array(code)) {
      code = parse(code)
    }
    scope.code = code
    scope.code_index = 0
    while (true) {
      scope.line = scope.__code[scope.__i]
      if (!scope.line) {
        //scope.line = ["__end"] // todo: cache this
        scope = scope.calling_scope
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
      } else {
        // its an object or array
      }
    }
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


  /*

  var parse = function (code){
    var lines = code.split("\n")
     , parsed = [], len = lines.length
     , i = 0, line = null
     , parsed_line = null, sub_parsed_line = null, str = null
     , in_string = false
     , ic = 0 // indention count
    while (i < len) {
      line = lines[i]
      if (
t
  
      if (line.substr(0, 2) == "  ") {
        line = line.substr(2)
        if (in_string) {
          if (parsed_line.length == 2) {
            parsed_line.push(line)
          } else {
            parsed_line[2] += "\n" + line
            // todo: you could use the join method
          }
        } else {
          sub_parsed_line = line.split(" ")
          parsed_line.push(sub_parsed_line)
        }
      } else if (line != "") {
        parsed_line = line.split(" ")
        in_string = parsed_line[0] == "text") {
        parsed.push(parsed_line)
      }
      i++
    }
    return parsed
  }, to_string = Object.prototype.toString
   , is_array = function (a) {
    return to_string.call(a) == '[object Array]'
  }, is_function = function () {
    return typeof obj === 'function';
  }, merge = function (master, branch) {
    for (key in branch) master[key] = branck[key]
  }, set_scope: function () {
    
  }, lib = {
    say: function (x) {
      alert(x)
    }, def_: function (){
      
      var code = Array.prototype.slice.call(arguments, 1);
    }, __end: function () {
      // you could call __end or check lengths
      scope.__i = scope.__i_stack.pop()
      scope.__code = scope.__code_stack.pop()
      if (!scope.__i) return break_signal
    }, __call: function (scope, line) {
      var args
      var func_name = line[0]
      var func = scope[func_name]
      
      scope.__args = scope.__args

      if (is_function(func)) {
        ret = func.call(null, scope)
      } else {
        // conditionally do this if not tail call or explicitly stated
        if (false) {
          
        } else {
          scope.__i_stack.push(scope.__i)
          scope.__code_stack.push(scope.__code)
          scope.__i = 0
          scope.__code = func
        }
   
      }

      args = line.slice(0)
      scope.__i += 1
    }, __i: 0
     , __i_stack: []
     , __code_stack: []
     , __eval_args: function (scope, args) {
      //this is the one place where you return directly from a function?
      var ret = [], args_i = 0, args_len = args.length
      while (args_i < args_len) {
        ret.push(scope[arg])
      }
      return ret
    }, __set_scope: function () {
    }, __get_scope: function () {
    }
  }, end_line = ["__end"]
   , break_signal = "xyzzy"
   , current_scope = null
   , scope = {}
   
  return function (code, _scope) {
    _scope = _scope || {}
    scope = _scope
    scope.__code = code
    current_scope = scope
    merge(scope, lib)
    if (!is_array(code)) scope.__code = parse(code)
    var line

    while (true) {
      // maybe throw line on scope an just call 
      line = scope.__code[scope.__i]
      if (!line) line = end_line
      ret = scope.__call(scope, line) 
      if (ret == break_signal) break
    }
  }
})

*/