
// 一个React组件Demo，有一些参数作为输入，这个React组件含有一个jsDoc注释，用来给组件文档生成器作为测试素材

/**
 * 这是一个React组件Demo
 * @displayName Joker
 * @param {string=} title - 标题
 * @param {number} count - 数量
 * @param {boolean} visible - 是否可见
 * @param {array} [list=[123]] - 列表
 * @param {object} obj - 对象
 * @param {function} onClick - 点击事件
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
 * 这是一个React组件Demo
 * @displayName 我的值是匿名函数，你要看到我
 */
const AWGAWGAWAWGAD = function ({ title, count, visible, list, obj, onClick }) {
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
 * 这是一个React组件Demo
 * @displayName 我的值是箭头函数，你要看到我
 */
const DWAGFWADAWD = ({ title, count, visible, list, obj, onClick }) => {
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
 * 这是一个React组件Demo
 * @displayName 开头不是大写字母，不能看到我
 */
const dWAGFWADAWD = ({ title, count, visible, list, obj, onClick }) => {
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
 * 这是一个函数Demo
 * 他在另一个文件里
 * @param {string} title - 标题
 * @param {number} count - 数量
 * @param {boolean} visible - 是否可见
 * @param {array} list - 列表
 * @param {object} obj - 对象
 * @param {function} onClick - 点击事件
 */
function DemoFunction(title, count, visible, list, obj, onClick) {
  return `标题：${title}，数量：${count}，可见性：${visible? '可见' : '不可见'}，列表：${list.join(',')}，对象属性：${obj.name}，点击事件：${onClick}`;
}