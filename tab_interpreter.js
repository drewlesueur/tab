poor_module("tab_interpreter", function () {
  var tab_parser = poor_module("tab_parser")
  var is_array = function (a) {
    return a.toString == '[object Array]'
  }
  var is_function = function () {
    return typeof obj === 'function';
  }

  var merge = function (master, branch) {
    for (key in branch) {
      master[key] = branck[key]
    }
  }
  
  var lib = {
    say: function (x) {
      alert(x)
    }
  }
  
  
  return function (code, scope) {
    scope = scope || {}
    merge(scope, lib)
    if (!is_array(code)) code = tab_parser(code)
    var i = 0
    var i_stack = []
    var code_stack = []
    var scope_stack = [] // for later use
    var line
    var eval_args = function (args) {
      //this is the one place where you return directly from a function?
      var ret = []
      
      var args_i = 0
      var args_len = args.length
      while (args_i < args_len) {
        ret.push(scope[arg])
      }
      return ret
      
    }

    while (true) {
      line = code[i]
      if (!line) {
        if (i_stack.length == 0) {
          break
        }
        i = i_stack.pop()
        code = code_stack.pop()
      } else {
        var func_name = line[0]
        var func = scope[func_name]
        if (is_function(func)) {
          var args = eval_args(line.slice(1))
          func.apply(null, args)
        } else {
          i_stack.push(i)
          i = 0
          code_stack.push(code)
          // interesting using nested code instead of flat lines
          code = func
        }
      }
    }
  }
})