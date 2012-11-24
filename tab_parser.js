poor_module("tab_parser",function () {
  return function (code){
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
})


/*
  text message
    my name is drew
  
  list

  
*/