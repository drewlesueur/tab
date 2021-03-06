poor_module("hash_machine", function () {
  var to_string = Object.prototype.toString
  var is_array = function (a) { return to_string.call(a) == '[object Array]' }
  var is_function = function (obj) { return typeof obj === 'function'; }
  var is_string = function (a) { return to_string.call(a) == '[object String]' }
  var tab_expression = poor_module("tab_expression")

  var macro_expand = function (code) {
    return code 
  }

  var is_numeric = function (numb) {
    var first_letter = numb[0];
    return first_letter.search(/\d/) == 0
  }

  var commands = {
    say: function (arg) {console.log(arg[1]); return arg[1]},
    alert: function (arg) {alert(arg[1])},
    goto:function (args) {return },
    ret_val: function (args) {return ret_val}
  }

  var line = [];
  var i = 0;
  var scope = {};
  var ret_val
  var eval_line = function () {
    var my_func = line[0];
    var my_real_func = commands[my_func];
    if (my_real_func) {
      ret_val =  my_real_func(line);
    } else if (is_numeric(my_func)) {
      i = my_func
    } else {
      i = scope[my_func]
    }
    i += 1
  }
  var evaluate = function (raw_code, scope) {
    scope = scope || {}
    if (is_array(raw_code)) {
      code = raw_code
    } else {
      code = tab_expression(raw_code)
    }
    var code = macro_expand(code) 
    i = 0;
    while (true) {
      if (i == code.length) {break}
      line = code[0]
      eval_line();
    }
    return ret_val
  } 
  return evaluate;
})
