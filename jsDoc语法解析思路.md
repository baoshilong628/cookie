## 对象

对象是以花括号包裹的键值对的集合，以逗号分隔

```
object = "{" pair:(@keyValuePair ","?)* "}" { return pair }

{}

=>

[]

{name: string}

=> 

[
  {
    key: 'name',
    value: 'string'
  }
]

{user: {name: string, age: number}}

=>

[
  {
    key: 'user',
    value: [
      {
        key: 'name',
        value: 'string'
      },
      {
        key: 'age',
        value: 'number'
      }
    ]
  }
]

```

## 键值对

键值对是以对象下无关字符（objectWhiteSpace）分隔的，以key:value为核心的语法

```text
keyValuePair = objectWhiteSpace? key:word objectWhiteSpace? ":" objectWhiteSpace? value:keyValuePair_valueType objectWhiteSpace? { return { key, value } }
```

## 键值对 值

键值对中的值可以是1. 一般文本 2. 对象