start = multiWhiteSpace? "/**" commandEnd singleCommand:singleCommand* multiWhiteSpace? "*/".* {
return singleCommand
}

// 一个标准可解析的注释命令
singleCommand =
commandStart command:(
	param /
    displayName /
    descriptionLine /
    commonjsDocCommand
) commandEnd? { return command }

// 一个纯粹的描述行
descriptionLine = ![@]descriptionLine:nonBreakingCharacters { return { type: "descriptionLine", value: descriptionLine } }

// 一个变量名，要么只表述变量名， 要么带有默认值
variable = commonVariable / variableWithDefaultValue

// 带有-前缀的comment写法
commentWithPrefix = "-"? multiWhiteSpace+ comment:nonBreakingCharacters {
return comment;
}

// 一个Param的评论，要么带有-前缀，要么只是一个非换行文本
comment = comment:(commentWithPrefix / nonBreakingCharacters) { return comment }

// 普通的变量声明只有一个单词
commonVariable = name:word { return { name } }

// 定义defaultValue的规则，考虑到defaultValue可能包含[]，用递归的方式来处理
defaultValue = ( '[' defaultValue ']' / [^\[\]] )* {
return text();
};

// 带有默认值的变量
variableWithDefaultValue
= "["multiWhiteSpace?name:word multiWhiteSpace? "=" multiWhiteSpace? defaultValue:defaultValue multiWhiteSpace?"]"+ {
return {name, defaultValue}
}

// 变量类型
variableType
= "{"multiWhiteSpace?type:word multiWhiteSpace? isRequired:"="?multiWhiteSpace?"}" {
return { type, isRequired: Boolean(isRequired) }
}

// 以下为特殊Tag组成的指令

// 组件展示名称
displayName = "@displayName" multiWhiteSpace+ name:nonBreakingCharacters {
return { type: "displayName", value: { name }}
}

// 组件参数
param = "@param" multiWhiteSpace+ type:variableType multiWhiteSpace+ variable:variable multiWhiteSpace+ comment:comment?{
 return { type: "param", value: { comment ,type, variable }}
}

// 通用
commonjsDocCommand = name:jsDocTag multiWhiteSpace value:nonBreakingCharacters { return { name, value } }


// 以下为组成元素

// jsDoc Tag标签语法，以@开头，后跟一个单词
jsDocTag = "@"tag:word { return tag }

// 注释行开头
commandStart = multiWhiteSpace? "*" multiWhiteSpace+

// 注释行结尾
commandEnd = [\r\n]+

// 非换行任意字符
nonBreakingCharacters = [^\r\n]* { return text();}

// 定义单词规则
word = [a-zA-Z0-9_]+ { return text() }

// 多个空格
multiWhiteSpace = [ ]+ { return text() }