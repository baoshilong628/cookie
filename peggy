start = s? "/**" docEnd doc:doc* s? "*/".* {
return doc
}

doc = docStart docObj:(param / displayName /desc) docEnd? {
return docObj
}

docStart = s? "*" s+
docEnd = [\r\n]+

displayName = "@displayName" s+ name:descWord {
return { type: "displayName", value: { name }}
}
desc = ![@]desc:descWord {
return { type: "descLine", value: desc};
}

param
 = "@param" s+ type:type s+ variable:var s+ comment:comment?{
 return { type: "param", value: { comment,type, variable }}
}

var = singleVar / varWithDefaultValue

lc = "-"? s+ comment:descWord {
return comment;
}

comment = c:(lc/ descWord) {
return c;
}
singleVar
 = name:word {
 return {name};
}

descWord = [^\r\n]* { return text();}

// 定义value的规则，考虑到value可能包含[]，用递归的方式来处理
value = ( '[' value ']' / [^\[\]] )* {
return text();
};

varWithDefaultValue
= "["s?name:word s? "=" s? value:value s?"]"+ {
return {name, value}
}


type
= "{"s?type:word s? isRequired:"="?s?"}" {
return { type, isRequired: Boolean(isRequired) }
}

// 定义单词规则
word = [a-zA-Z0-9_]+ {
    return text();
}

typeWord = [a-zA-Z0-9_:\]]+ {
return text();
}

command
 = "@"commandName:word {
 return { name: commandName }
}

// 定义空格规则
s = [ ]+ {
    return text();
}