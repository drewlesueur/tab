poor_module("tab", function () {
  var parse = poor_module("tab_expression")
  var to_string = Object.prototype.toString
  var is_array = function (a) { return to_string.call(a) == '[object Array]' }
  var is_function = function (obj) { return typeof obj === 'function'; }
  var is_string = function (a) { return to_string.call(a) == '[object String]' }
  var merge = function (master, branch) { for (key in branch) master[key] = branch[key] }
  
  
  var lib = function () {
    say: function (scope, msg) {
      console.log(msg)
    }, add: function (args) {
      var sum = 0
      for (var i = 0; i < args.length; i++) {
        sum += args[i]
      }
      return sum
    }
  }
  
 
  var map = function (list, func) {
    var len = list.length
    var ret = []
    for (var i = 0; i < len; i++) {
      var item = list[i]
      ret[i] = func(item, i)
    }
    return ret
  }
  
  var identity = function (x) {
    return x
  }
  
  var copy = function (list) {
    if (is_arry(list)) {
      return map(list, copy)
    } else {
      return list
    }
  }
 
  var first = function (list) {
    return list[0]
  }

  var second = function (list) {
    return list[1]
  }


  var rest = function (list) {
    return list.slice(1   )
  }

  var replace = function (list, old_value, new_value) {
    for (var i = 0; i < list.length; i ++) {
      var item = list[i]
      if (is_array(item)) {
        list[i] = replace(item, old_value, new_value)
      } else if (item == old_value){
        list[i] = new_value
      
    }
    return list
  }


  var evalute = fuction (orig_code, scope) {
     
  }

  var evaluate  = function (orig_code, scope) {
    var code = copy(orig_code)
    scope = scope || {}
    merge(scope, lib)
    var code_stack = []
    var i_stack = []
    var i = 0
    while (true) {
      //todo  tail call optimization
      var item = code[i]
      if (i == 1 ) {
        var fn_name = first(code)
        
        var val = null 
        if (is_string(fn_name) && fn_name in scope) {
          var system_func = scope[fn_name]
          val = system_func(second(code))
         // val rev sytem_func scond code 
          
            
        } else {
          var func = first(code)
          var arg_value = second(code)

          var arg_name = first(func)
          var body = rest(func)
          
          var new_body = replace(body, arg_name, arg_value)
          
        }

        
        if (code_stack.length == 0) {
          break // too soon? 
        }
        code = code_stack.pop()
        
        i = i_stack.pop()
        item = code[i]
      }
      
      if (is_array(item)) {
        code_stack.push(code)
        i_stack.push(i)
        i = 0
      }
       
      i += 1
    }
  }
})


 

// after macroing

run code given_index
  index if is nothing given_index
    0
    given_index
  line code index
  
 


(add 1 2)

(((fn a) (add a 1)) 5)
 

(f1 a (+ a 1)) 5
