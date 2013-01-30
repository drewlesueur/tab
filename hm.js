    // hash machine
// very simple language
var tab_expression = poor_module("tab_expression")
poor_module("hash_machine", function () {
  
  var hm_eval = function () {
    var code
    var i
    var line
 
    if (is_array(_code)) {
      code = tab_expression(_code)
    } else {
      code = _code
    }
    
 
    var commands = function () {
      set: function (args) {
        var name = args[0]
        world.data[name] = get_word(args[1])
      },
      dict: function (args){
        var name = args[0]
        var len = args.length
        var my_dict = {}
        for (var i = 1; i < len; i += 2 ) {
          var key = args[i]
          var value = get_word(args[i])
          my_dict[key] = value
        }
        world[name] = my_dict
      },
      list: function (args) {
        var name = args[0]
        // use map
        var len = args.length
        var my_list = []
        for (var i = 1; i < len; i++) {
          my_list.push(get_word(args[i]))
        }

      },
      goto: function (args) {
        var code = get_word(args[0])
        var i = get_word(args[1]) - 1
        world.i = i
        world.code = code
      },
      godata: function (args) {
        world.data = get_word(args[0])
      }

    }
//abcdefghijklmnopqrstuvwxyz

    var get_word = function (word) {
      if (word.substr(0, 1) == "'") {
        return word.substr(1)
      } else {
        if (word in world) {
          return world.data[w ord]
        } else {
          return word
        }
      }
    }

    var exec = function (line) {
      fn_name = line[0]
      if (fn_name in commands) {
        var fn = commands[fn_name]
        fn.call(null, line.slice(1))
      }
    }

    var world = {}
    world.code = code
    world.i = 0
    

    while (true) {
      code = world.code
      i = world.i
      if (i == code.length) {
        break
      }
      world.line = code[i]
      line = world.line
      exec(line)
      
      world.i += 1
    }
    return hm_eval  
  }
})
