poor_module("tab_expression", function () {
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

    var is_valid_line = function () {
      if (line == "") { return false}
      if (indent_count == line.length) { return false }
      return true
    }

    var pop_stuff = function () {
      indent_count = indent_stack.pop()
      parsed = parsed_stack.pop()
    }

    var get_indent_count = function () {
      var ic = 0
      var line_len = line.length
      while (ic < line_len) {
        if (line.substr(ic,1) == " ") {
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
          parsed_line.push(line.substr(2))
        } else {
          parsed_line[2] += "\n" + line.substr(2)
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
        if (is_valid_line()) {
          parsed_line = trimmed_line.split(" ")
          if (parsed_line[0] == "text") {
            in_string = true
          }
          parsed.push(parsed_line)
        }
      }
      indent_count = new_indent_count
      i++
    }
    while (indent_stack.length) {
      pop_stuff()
    }
    return parsed
  }
  return parse
})
