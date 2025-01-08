
// 一个React组件Demo，有一些参数作为输入，这个React组件含有一个jsDoc注释，用来给组件文档生成器作为测试素材

/**
 * 这是一个组件说明注释示例
 *
 * 上面空一行应该要支持
 * 支持markdown语法
 * 1. ABC
 * 2. abc
 * + 123
 * + 45679
 * > 123
 * > > 123
 * * 1123
 * ## 123
 * **123**aaaaa
 * - 123
 * - 123
 * ```json
 * { "name": "Bob"}
 * ```
 * ***
 *
 * @param {string} title - 标题
 * @param {number} count - 数量
 * @param {boolean} visible - 是否可见
 * @param {array} list - 列表
 * @param {object} obj - 对象
 * @param onClick 这个变量没有类型声明
 * @displayName DemoComponent（来自DisplayName）
 */
const DemoComponent = ({ title, count, visible, list, obj, onClick }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>数量：{count}</p>
      <p>可见性：{visible ? '可见' : '不可见'}</p>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>对象属性：{obj.name}</p>
      <button onClick={onClick}>点击</button>
    </div>
  );
};

/**
 * 这是一个函数Demo, 你好
 * @displayName 函数leading注释, 但是这个函数返回的不是一个JSX类型
 */
function DemoFunction(title, count, visible, list, obj, onClick) {
    return `标题：${title}，数量：${count}，可见性：${visible? '可见' : '不可见'}，列表：${list.join(',')}，对象属性：${obj.name}，点击事件：${onClick}`;
}

/**
 * 这是一个函数Demo, 你好
 * @displayName 这个变量值不是箭头函数或匿名函数，你不应该看到我
 */
const ADFGWAGwa = 123;


/**
 * 这是一个函数Demo, 你好
 * @displayName 函数leading注释, 但是这个函数名称开头不是大写，不应该看到我
 */
function demoFunction(title, count, visible, list, obj, onClick) {
    return `标题：${title}，数量：${count}，可见性：${visible? '可见' : '不可见'}，列表：${list.join(',')}，对象属性：${obj.name}，点击事件：${onClick}`;
}

/**
 * 这是一个函数组件
 * @displayName 函数leading注释，这个返回的是JSX
 * @param {string} title - 标题
 * @param {number} count - 数量
 * @param {boolean} visible - 是否可见
 * @param {array} list - 列表
 * @param {object} obj - 对象
 * @param onClick 这个变量没有类型声明
 */
function FunComp(title, count, visible, list, obj, onClick) {
    return <div/>;
}