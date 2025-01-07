module.exports = // @generated by Peggy 4.2.0.
//
// https://peggyjs.org/
(function() {
  "use strict";

function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = (this.location.source && (typeof this.location.source.offset === "function"))
      ? this.location.source.offset(s)
      : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, ' ');
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = (last - s.column) || 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + offset_s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
          + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { start: peg$parsestart };
  var peg$startRuleFunction = peg$parsestart;

  var peg$c0 = "/**";
  var peg$c1 = "*/";
  var peg$c2 = "*";
  var peg$c3 = "@displayName";
  var peg$c4 = "@param";
  var peg$c5 = "-";
  var peg$c6 = "[";
  var peg$c7 = "]";
  var peg$c8 = "=";
  var peg$c9 = "{";
  var peg$c10 = "}";
  var peg$c11 = "@";

  var peg$r0 = /^[\r\n]/;
  var peg$r1 = /^[@]/;
  var peg$r2 = /^[^\r\n]/;
  var peg$r3 = /^[^[\]]/;
  var peg$r4 = /^[a-zA-Z0-9_]/;
  var peg$r5 = /^[a-zA-Z0-9_:\]]/;
  var peg$r6 = /^[ ]/;

  var peg$e0 = peg$literalExpectation("/**", false);
  var peg$e1 = peg$literalExpectation("*/", false);
  var peg$e2 = peg$anyExpectation();
  var peg$e3 = peg$literalExpectation("*", false);
  var peg$e4 = peg$classExpectation(["\r", "\n"], false, false);
  var peg$e5 = peg$literalExpectation("@displayName", false);
  var peg$e6 = peg$classExpectation(["@"], false, false);
  var peg$e7 = peg$literalExpectation("@param", false);
  var peg$e8 = peg$literalExpectation("-", false);
  var peg$e9 = peg$classExpectation(["\r", "\n"], true, false);
  var peg$e10 = peg$literalExpectation("[", false);
  var peg$e11 = peg$literalExpectation("]", false);
  var peg$e12 = peg$classExpectation(["[", "]"], true, false);
  var peg$e13 = peg$literalExpectation("=", false);
  var peg$e14 = peg$literalExpectation("{", false);
  var peg$e15 = peg$literalExpectation("}", false);
  var peg$e16 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false);
  var peg$e17 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_", ":", "]"], false, false);
  var peg$e18 = peg$literalExpectation("@", false);
  var peg$e19 = peg$classExpectation([" "], false, false);

  var peg$f0 = function(doc) {
return doc
};
  var peg$f1 = function(docObj) {
return docObj
};
  var peg$f2 = function(name) {
return { type: "displayName", value: { name }}
};
  var peg$f3 = function(desc) {
return { type: "descLine", value: desc};
};
  var peg$f4 = function(type, variable, comment) {
 return { type: "param", value: { comment,type, variable }}
};
  var peg$f5 = function(comment) {
return comment;
};
  var peg$f6 = function(c) {
return c;
};
  var peg$f7 = function(name) {
 return {name};
};
  var peg$f8 = function() { return text();};
  var peg$f9 = function() {
return text();
};
  var peg$f10 = function(name, value) {
return {name, value}
};
  var peg$f11 = function(type, isRequired) {
return { type, isRequired: Boolean(isRequired) }
};
  var peg$f12 = function() {
    return text();
};
  var peg$f13 = function() {
return text();
};
  var peg$f14 = function(commandName) {
 return { name: commandName }
};
  var peg$f15 = function() {
    return text();
};
  var peg$currPos = options.peg$currPos | 0;
  var peg$savedPos = peg$currPos;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = peg$currPos;
  var peg$maxFailExpected = options.peg$maxFailExpected || [];
  var peg$silentFails = options.peg$silentFails | 0;

  var peg$result;

  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {}
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsestart() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$parses();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (input.substr(peg$currPos, 3) === peg$c0) {
      s2 = peg$c0;
      peg$currPos += 3;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e0); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsedocEnd();
      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$parsedoc();
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$parsedoc();
        }
        s5 = peg$parses();
        if (s5 === peg$FAILED) {
          s5 = null;
        }
        if (input.substr(peg$currPos, 2) === peg$c1) {
          s6 = peg$c1;
          peg$currPos += 2;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e1); }
        }
        if (s6 !== peg$FAILED) {
          s7 = [];
          if (input.length > peg$currPos) {
            s8 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s8 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e2); }
          }
          while (s8 !== peg$FAILED) {
            s7.push(s8);
            if (input.length > peg$currPos) {
              s8 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e2); }
            }
          }
          peg$savedPos = s0;
          s0 = peg$f0(s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedoc() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsedocStart();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseparam();
      if (s2 === peg$FAILED) {
        s2 = peg$parsedisplayName();
        if (s2 === peg$FAILED) {
          s2 = peg$parsedesc();
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsedocEnd();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f1(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedocStart() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parses();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (input.charCodeAt(peg$currPos) === 42) {
      s2 = peg$c2;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e3); }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parses();
      if (s4 !== peg$FAILED) {
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parses();
        }
      } else {
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        s1 = [s1, s2, s3];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedocEnd() {
    var s0, s1;

    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r0.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e4); }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = input.charAt(peg$currPos);
        if (peg$r0.test(s1)) {
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedisplayName() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 12) === peg$c3) {
      s1 = peg$c3;
      peg$currPos += 12;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e5); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parses();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parses();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsedescWord();
        peg$savedPos = s0;
        s0 = peg$f2(s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedesc() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;
    s2 = input.charAt(peg$currPos);
    if (peg$r1.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e6); }
    }
    peg$silentFails--;
    if (s2 === peg$FAILED) {
      s1 = undefined;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsedescWord();
      peg$savedPos = s0;
      s0 = peg$f3(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseparam() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 6) === peg$c4) {
      s1 = peg$c4;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e7); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parses();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parses();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsetype();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parses();
          if (s5 !== peg$FAILED) {
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parses();
            }
          } else {
            s4 = peg$FAILED;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsevar();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parses();
              if (s7 !== peg$FAILED) {
                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parses();
                }
              } else {
                s6 = peg$FAILED;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsecomment();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                peg$savedPos = s0;
                s0 = peg$f4(s3, s5, s7);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsevar() {
    var s0;

    s0 = peg$parsesingleVar();
    if (s0 === peg$FAILED) {
      s0 = peg$parsevarWithDefaultValue();
    }

    return s0;
  }

  function peg$parselc() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 45) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e8); }
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    s2 = [];
    s3 = peg$parses();
    if (s3 !== peg$FAILED) {
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parses();
      }
    } else {
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsedescWord();
      peg$savedPos = s0;
      s0 = peg$f5(s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecomment() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parselc();
    if (s1 === peg$FAILED) {
      s1 = peg$parsedescWord();
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f6(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsesingleVar() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseword();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f7(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsedescWord() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r2.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e9); }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = input.charAt(peg$currPos);
      if (peg$r2.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e9); }
      }
    }
    peg$savedPos = s0;
    s1 = peg$f8();
    s0 = s1;

    return s0;
  }

  function peg$parsevalue() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 91) {
      s3 = peg$c6;
      peg$currPos++;
    } else {
      s3 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
    if (s3 !== peg$FAILED) {
      s4 = peg$parsevalue();
      if (input.charCodeAt(peg$currPos) === 93) {
        s5 = peg$c7;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e11); }
      }
      if (s5 !== peg$FAILED) {
        s3 = [s3, s4, s5];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 === peg$FAILED) {
      s2 = input.charAt(peg$currPos);
      if (peg$r3.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e12); }
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s3 = peg$c6;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e10); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parsevalue();
        if (input.charCodeAt(peg$currPos) === 93) {
          s5 = peg$c7;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e11); }
        }
        if (s5 !== peg$FAILED) {
          s3 = [s3, s4, s5];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = input.charAt(peg$currPos);
        if (peg$r3.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e12); }
        }
      }
    }
    peg$savedPos = s0;
    s1 = peg$f9();
    s0 = s1;

    return s0;
  }

  function peg$parsevarWithDefaultValue() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 91) {
      s1 = peg$c6;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parses();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = peg$parseword();
      if (s3 !== peg$FAILED) {
        s4 = peg$parses();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (input.charCodeAt(peg$currPos) === 61) {
          s5 = peg$c8;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e13); }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parses();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          s7 = peg$parsevalue();
          s8 = peg$parses();
          if (s8 === peg$FAILED) {
            s8 = null;
          }
          s9 = [];
          if (input.charCodeAt(peg$currPos) === 93) {
            s10 = peg$c7;
            peg$currPos++;
          } else {
            s10 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e11); }
          }
          if (s10 !== peg$FAILED) {
            while (s10 !== peg$FAILED) {
              s9.push(s10);
              if (input.charCodeAt(peg$currPos) === 93) {
                s10 = peg$c7;
                peg$currPos++;
              } else {
                s10 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e11); }
              }
            }
          } else {
            s9 = peg$FAILED;
          }
          if (s9 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f10(s3, s7);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsetype() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c9;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e14); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parses();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = peg$parseword();
      if (s3 !== peg$FAILED) {
        s4 = peg$parses();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (input.charCodeAt(peg$currPos) === 61) {
          s5 = peg$c8;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e13); }
        }
        if (s5 === peg$FAILED) {
          s5 = null;
        }
        s6 = peg$parses();
        if (s6 === peg$FAILED) {
          s6 = null;
        }
        if (input.charCodeAt(peg$currPos) === 125) {
          s7 = peg$c10;
          peg$currPos++;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e15); }
        }
        if (s7 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f11(s3, s5);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseword() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r4.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e16); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = input.charAt(peg$currPos);
        if (peg$r4.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e16); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f12();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsetypeWord() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r5.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e17); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = input.charAt(peg$currPos);
        if (peg$r5.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e17); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f13();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsecommand() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 64) {
      s1 = peg$c11;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e18); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseword();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f14(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parses() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r6.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e19); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = input.charAt(peg$currPos);
        if (peg$r6.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e19); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f15();
    }
    s0 = s1;

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (options.peg$library) {
    return /** @type {any} */ ({
      peg$result,
      peg$currPos,
      peg$FAILED,
      peg$maxFailExpected,
      peg$maxFailPos
    });
  }
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

  return {
    StartRules: ["start"],
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
})()
;