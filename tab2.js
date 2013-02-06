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
    return list.slice(1  )
  }

  var replace = function (list, old_value, new_value) {
    for (var i = 0; i < list.length; i ++) {
      var item = list[i]
      if (is_array(item)) {
        list[i] = replace(item, old_value, new_value)
      } else if (item == old_value){
        list[i] = new_value
      }
    }
    return list
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
      if (i == 2 ) {
        var fn_name = first(code) 
        if (is_string(fn_name) && fn_name in scope) {
          var system_func = scope[fn_name]
          code = system_func(second(code))
        } else {
          var func = first(code)
          var arg_value = second(code)
          var arg_name = first(func)
          var body = rest(func)
          var new_body = replace(body, arg_name, arg_value)
          var code = new_body 
        }

        
        if (code_stack.length == 0) {
          return val 
          break // too soon? 
        }

       
        if (!is_evalable(code)) {
          var old_code = code
          code = code_stack.pop()
          i = i_stack.pop()
          code[i] = code
          item = code[i]
        } else {
          i = 0
          item = code
        }
      }
      
      if (is_array(item)) {
        code_stack.push(code)
        i_stack.push(i)
        i = 0
        code = item
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
  
 
/*

(add 1 2)

(((fn a) (add a 1)) 5)
 

(f1 a (+ a 1)) 5


add2 n
  added1 add1 n
  add1 added1

add3 n
  added2 add2 n
  add1 added2 n
  
add3 n
  add1 add2.n

add2
  add3 1

add_1_more fnc n
  n2 fnc n
  add1 n2
 
add_1_more add2 1

(add1 (add2 1))


(add2)

add_s
  fn x add1

(add_s 0) 1

add_s.0 1

fn.x.add1.0 1



add_s n

( )
  
add_smthng add2
add_smthng 0 3



(add2 0)



(add2)
(add)





--

()
*/