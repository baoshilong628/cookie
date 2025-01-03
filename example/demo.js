
// 一个React组件Demo，有一些参数作为输入，这个React组件含有一个jsDoc注释，用来给组件文档生成器作为测试素材

/**
 * 这是一个React组件Demo
 * @param {string} title - 标题
 * @param {number} count - 数量
 * @param {boolean} visible - 是否可见
 * @param {array} list - 列表
 * @param {object} obj - 对象
 * @param {function} onClick - 点击事件
 * @returns {Element} - 组件
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


// 另一个Demo是一个用function定义的函数，这个函数含有一个jsDoc注释，用来给组件文档生成器作为测试素材
/**
 * 这是一个函数Demo, 你好
 * @param {string} title - 标题
 * @param {number} count - 数量
 * @param {boolean} visible - 是否可见
 * @param {array} list - 列表
 * @param {object} obj - 对象
 * @param {function} onClick - 点击事件
 * @returns {string} - 字符串
 */
function DemoFunction(title, count, visible, list, obj, onClick) {
  return `标题：${title}，数量：${count}，可见性：${visible? '可见' : '不可见'}，列表：${list.join(',')}，对象属性：${obj.name}，点击事件：${onClick}`;
}