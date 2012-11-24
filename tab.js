poor_module("tab", function () {
  var parse = function (code){
    var lines = code.split("\n")
    var parsed = []
    var len = lines.length
    var i = 0
    var line, parsed_line, sub_parsed_line, str
    var in_string = false
    while (i < len) {
      line = lines[i]
      
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
        if (parsed_line[0] == "text") {
          in_string = true
        } else {
          in_string = false
        }
        parsed.push(parsed_line)
      }
      i++
    }
    return parsed
  }

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
    },
    def_: function (){
      
      var code = Array.prototype.slice.call(arguments, 1);
    }
  }
  
  return function (code, scope) {
    scope = scope || {}
    merge(scope, lib)
    if (!is_array(code)) code = parse(code)
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
