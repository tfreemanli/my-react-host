# 什么是框架 
针对一些JavaScript的高级程序设计产生了JavaScript库，这些库常被称为 JavaScript框架。例如JQuery等。

```HTML
<script src="https://cdn.staticfile.org/jquery/1.8.3/jquery.min.js">
</script>
<script>
function myFunction(){
    $("#h01").attr("style","color:red").html("Hello jQuery");
}
$(document).ready(myFunction);
</script>
```
随着Javascript发展，对JS的改造比JQuery更彻底了，出现了诸如React、Vue等的框架。

# React简述
React的运作机制简单说：
* 在浏览器端，在一个近乎空白的HTML上用JavaScript画出所有的DOM，这个过程称为渲染（Render）  

* 在服务器端，用Node.js安装/管理/运行React的各种组成模块，包括Http服务、Sass服务、JSX编译器等

React 可以使用JSX语法，JSX语法在浏览器编译成JS之后再运行渲染。所以React多被称为前端渲染。


```HTML
//在HTML里面使用，引入react 3个主要的js。
//React-dom是虚拟dom
//babel是JSX编译器
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
//注意 type=babel，是为了使用JSX语法
//myReactCode goes here
</script>
```

```Javascript
//在.js中，JSX编译器/渲染器在虚拟DOM里实现
import React from "react";
import ReactDOM from "react-dom";


//myReactApp goes here
const myReactApp = <p>JSX的HTML标签作为变量给React渲染</p>; //纯JSX
const myElement = React.creatElement('h1', {}, 'donot use JSX');  //React元素

const ComponentApp = () => {     //组件
    return <p>函数形态的组件，返回HTML标签</p>
}

const container = document.getElementById("whateverLikeRoot");
const root = ReactDOM.createRoot(container);
root.render(myReactApp);
//root.render(myElement);
//root.render(<ComponentApp />);
```

<span style="color:#E47"> 浏览器里看到的页面是 React 在浏览器端的内存里“画”出来的结果，`ReactDOM.createRoot()` 就是在内存中创建一个模拟的 HTML DOM。每当DOM的内容改变时，React 就重新“画”一次。从MVC模式看，浏览器的画面是内存虚拟环境里各个JS“对象”的 “**V**”，内存里还有对象本身 “**M**” 以及控制逻辑 “**C**”。   
React 模拟 HTML DOM，所以语法尽量地接近HTML，虽然有些语法和HTML有差别，例如 HTML的 `<input class='xxx'>` 改为了 `<input className='xxx'>`，HTML的 `onclick=func()` 改成了 `onClick=func()` </span>

# 1. React的准备：ES6 中的常用语法
ECMAscript6 发布于2016，是JavaScript最新标准版本。React经常使用的ES6语法知识点包括：
* Classes
* Arrow Functions
* Variables (let, const, var)
* Array Methods like .map()
* Destructuring
* Modules
* Ternary Operator
* Spread Operator


    ## 1.1. Class 类
    谨记JavaScript最大的一个特点——  <font style= color:orange>“函数就是值，值就是函数”</font>

    JS的Class语法有点像Java，几点注意的如下：
    * 构造函数直接用 `constructor(){}` 命名
    * 用 this.var 来访问成员变量
    * getter 和 setter 体现了“函数即值，值即函数”的思想

    ```javascript
    class Animal {
        name="Bobby"; 	//公有成员变量，通过this.name访问
        url;			//公有成员变量
        #age = 5;		//私有成员变量

        constructor(n, u) {
            super(n,u);
            //this.name = n;
            this.url = u;
        }

        get age(){return this.#age;} //公有方法 getter

        eat(){	//公有方法
            console.log(this.name + " is eating." + this.url);
            this.#sleep();
            return;
        }

        #sleep(){	//私有方法
            console.log(this.name + " is sleepin Zzz..." );
        }
    }

    var anml = new Animal("BBear", "Woww...");
    console.log(anml.name + " " + anml.age);
    anml.eat();
    ```

    ## 1.2. Arrow Functions
    接近于Lambda语法
    ```Javascript
    const fn = (para) => { 
        //todo
    };
    ```
    普通的函数定义方式中this是指函数的caller，但箭头函数的this没有绑定，是指函数的定义者。
    
    ## 1.3. Variables (let, const, var)

    参考JavaScript学习笔记
    貌似W3school的示例中大都使用const。
    const就是常量，定义时即刻赋值，之后不得再更改。但常量对象的属性、数据等可以更改。
    var和let都是变量。

    （1）let

    和const有点像，比var更严格。
    如果在父域用let定义了一个变量名，那么：
    1）在相同的作用域内，（无论用var或let）不能重新定义这个变量名；  
    2）在子域内，能且只能用let重新定义该变量名，这样这两个名字一样的变量其实完全没关系的,只是名字一样而已；子域内如果用var重新定义该变量名则运行时出错。
    * 换言之，let定义一个变量名，该变量名对其父域相当于是透明的，对子域是锁定不能用var的。

    （2）var

    最宽松的作用域，不被作用域限制，即能被父域和子域内重定义及访问。  
    *注意：子域var定义的变量，父域也可以直接访问。*  
    只有var可以先赋值再声明。

    （3）函数  

    以上所说的子域是指<span style="color:orange">循环语句和代码块</span>等，<span style="color:red">但不包括函数。Javascript就利用函数的这个封闭性来实现变量的 private，在JavaScript学习函数的闭包中学习。</span>  
    函数内定义的是局部变量，作用域只在函数范围。  
    函数内不声明而直接赋值的变量，<span style="color:orange">当函数运行过一次之后</span>，就当作是全局变量。  
    函数能访问全局变量，除非函数使用相同的变量名重新声明该变量或以相同命名为参数。

    ## 1.4. Array Methods like .map()
    ES6有许多让人“偷懒”的数组的函数，其中React常用的一个是`Array.map(fnCallBack)` ，这个函数把数组里的元素按顺序执行callBack 函数，运行结果也以Array形式返回。
    ```javascript
    const myArray = ['apple', 'banana', 'orange'];
    const myList = myArray.map((item) => <p>{item}</p>)
    ```

    ## 1.5. Destructuring 解构
    数据集Collection的解构Destructuring是指直接取出集合中的数据，又是一种“偷懒”的遍历数据集的方法。当然，你需要事先清楚Array或对象里数据的位置：
    ```javascript
     //数组的解构
     const = [36,24,36]
     const [var1, ,var2] = myArray; 
     //取出myArray里的第一和第三个对象，并赋值与var1和var2

     //对象的解构
     const myBoss = {
        name : 'Peter Pan',
        age : 45,
        income : {
            paye: 10,
            share: 23,
            estate: 50
        },
        eyeColor : 'Brown'
     }

     financialReport(myBoss); 
     //以myBoss做参数传递时，应用对象的解构。
    
     //直接采用对象里面的属性名进行对象的解构
     //有点像Java里的接口“Interface”
     function financialReport({name, income:{share, estate}}){
        const totalIncome = share + estate;
        const msg = name + "'s share and estate income is totally $" + totalIncome;
        //const msg = "Peter Pan's income is totally $";
     }
    ```
    解构的好处：
    * 上面的 `.map()` 一样，让程序员少写循环。
    * 减少浪费，提高运行性能。

    ## 1.6. Spread Operator
    “展开”操作符（...）可以把数组/对象的整体或部分展开复制到另一个数组/对象中。 
    > ...array //意为“展开array”

    展开操作符多与解构一起使用。
    ```java
    const arr1 = [1,2,3,4,5]
    const arr2 = [6,7]
    const arr1 = [...arr1, ...arr2]; //
    const [var1, var2, ...rest] = arr1; //rest = [3,4,5,6,7]
    ```

    如果对对象使用展开操作符并合并，同名的成员变量会以最后一个的值取代。
    ```java
    const obj1 = {
        name: "Peter";
        color: "blue";
    }
    const obj2 = {
        age: 23;
        color: "red";
    }
    const {color} = {...obj1, ...obj2}; //color = red
    ```

    ## 1.7. Modules
    把Javascript写在一个.js文件里，这个文件就理解为一个Module。
    模块Module依赖于import和export。  
    import有点像JAVA，就是js在文件顶部 import 其他Module并使用里面的数据。  
    export就是从模块文件中输出一个或多个函数或值。（“函数即值，值即函数”）  
    export又分为“命名输出”和“默认输出”：export的函数名和文件名一样，就是默认输出；不同名则是命名输出。
    ```Javascript
        const myModule = ()=>{
            //do logic or create DOM
            const name = "Peter";
            const age = 35;
            const eyeColor = "Brown";
            return;
        };
        export name;
        export {age, eyeColor}; 
        //这样对象输出的话，在外也直接解构 import {age} from...
        export default myModule;
    ```

    ## 1.8. Ternary Operator
    三元运算符，即 if then 的简版
    > (boolean)? {then} : {otherwise};


# 2. React的准备：JSX 常用语法
JSX = JavaScript XML，是XML语法。   
React支持JSX，无论是直接渲染JSX还是渲染组件Component，都可以用JSX编译成HTML。使React的语句更简洁，在本文最开始的React简介中就有过简单的例子。
JSX编译时可以把HTML标签转变成React的Element和DOM，从而无需自己写 `React.creatElement()` 和 `.appendChild()`  


JSX中使用的HTML标签不算的字符串，而是直接当作“值”。  
“值”里也可以使用“ { } ”写表达式。

```javascript
const imJSX = <p>I am {5+5} years old</p>;
const imJS = "<p>I am " + firstname + " " + lastname +".</p>";
```

JSX的HTML标签如果太多行，可以用 ( ) 包起来。  
HTML标签只能有一个最上级元素，可以是` <div> <span> <p>` ，甚至是空标签 `<></>` 。  
HTML标签必须是封闭的。  
因为关键字 class 在JS中有冲突，所以JSX里的 class 改为了 className
```javascript
const wrapIt = (  //wrap as many lines as it's
    <>   
        <p>Line1</p>
        <p>Line2</p>
    </>
); //only one top-level tag

const closeIt = <input type="text" />; //must close tag

const alterClass = <h1 className="myStyle">Hello World</h1>; //use className instead of class for CSS

```
    
React的JSX语法里不支持 if 语句，如果需要 if 判断可以
- 放在 JSX 语法之外完成复杂的if判定，或者
- 简单的判定可在表达式内使用 {?:} 三元操作符。  

详见章节 3.4

# 3. Components（组件）的概念  
了解了JSX语法之后，就来看看JSX的具体应用————组件Component。  
组件就像一个独立的返回JSX(HTML)的函数，目的是代码重用和独立，例如网页页面中include的页头，导航栏，页脚等等。  
React组件有两种实现方式：Class 和 Function，旧React多用Class类型的组件，新版React引入了Hook后建议使用Function类型的组件。  

- Class组件
    * 必须继承于 React.Component
    * 必须实现 render() 方法，并返回HTML
```javascript
class Title extends React.Component{
    render(){
        return <h1>This is the Title.</h1>;
    }
}
```
- Function组件
```javascript
function Artical(){ //大写字母开头，表示这是一个对象
    return <p>This is the Artical body</p>;
}
```
如果把Component比作Function，那组件的 Props 就像是函数的 Arguments。
> Example
>
> ```javascript
> function Artical(props){ //props 是参数集对象 
>     return <p>This is a {props.color} Artical body</p>;
> }
> 
> const rt = ReactDOM.createRoot(document.getElementById('root'));
> rt.render(<Artical color='Blue'>);
> ```
> 


组件可以嵌套，即一个组件中包含多个组件。  
例如页头包含导航栏和登录状态栏。
```javascript
function Nav(){
    return <p>This is Navigator</p>;
}

function PageTop(){
    return (
        <>
            <p>Here is LOGO</p>
            <Nav />
            <p>Here goes Login</p>
        </>
    );
}

//...
root.render(<PageTop />);
```

组件Component可以以模块Module方式写在 `.js` 文件里，文件名要大写字母开头。
使用时import这个模块里的Component即可。
```javascript
// PageTop.js
function PageTop(){
    return <p>PageTop</p>
}
export default PageTop;

//index.js
import PageTop from './PageTop.js';
//...
root.render(<PageTop />);
```

## 3.1 Class Component 类组件
React 16 虽然不会去掉Class Component，但建议使用Function Component。
Class组件的简单实现在前例已经提过，这里继续其他要点。

* 3.1.1 构造函数  
和JAVA不同，构造函数直接名为 `constructor()`；  
构造函数是初始化组件属性的地方，组件属性应该保存在名为 `state` 的对象中；  
构造函数里运行 `super()` ，调用父类的构造函数；
```javascript
class Title extends React.Component{
    constructor(){
        super();
        this.state = {author : "Peter"};
    }
    render(){
        return <h1>This is the Title by {state.author}.</h1>;
    }
}
```
* 3.1.2 Props  
除了state，也可以用props处理组件属性；
Class Component的props传入构造函数，Function Component的props从函数名传入。  
```javascript
class Title extends React.Component{
    constructor(props){ //构造函数以props接受Argument
        super(props);
        this.state = {author : props.author};   //把props保存到state
    }
    render(){
        return <h1>This is the Title by {this.props.author}.</h1>;      //直接使用props的参数
    }
}

//...
root.render(<Title author="Peter" />); //调用组件时传Argument给组件
```

* 3.1.3 state 对象  
如上例可见，Class组件的构造函数可以指定 `state` 对象；  
state 对象的访问和Function组件的Hook一样，[state, setState] = useState();  
读 `state`对象需要用 this.state.prop 语句；  
写 `state`对象需要用 this.setState(objProps);  
一定要通过setState()写state，这样可以触发React重渲染页面；

* 3.1.4 组件的生命周期  
每个组件的生命周期都有三个阶段：加载（Mounting），更新（Updating），卸载（Unmounting）  
在每个阶段 React都会按一个特定顺序调用组件中的函数（除非组件没定义该函数），具体如下：  
    * **加载期**  
    `constructor()`  
        //构造函数是最早被调用的，作用是初始化对象及属性  
          
        `getDerivedStateFromProps()`  
        //在render()之前被调用，可以在渲染前用props重置state，以防state在构造函数被修改  
        
        `render()`  
        //正式渲染，这是组件必要的函数，返回 JSX/HTML 给DOM 
        
        `componentDidMount()`   
        //渲染之后被调用，如果配合“修改state可以触发re-render”的特性，这里可以造成一个死循环的状态。要多加小心。  
    * **更新期**  
    `getDerivedStateFromProps()`  
    //组件更新时被React第一个被调用的函数，作用和加载期时一样，可以用props重置state

        `shouldComponentUpdate()`  
        //返回一个boolean给React，React凭此决定是否重渲染  

        `render()`  
        //一个组件一定要有一个render()，同上

        `getSnapshotBeforeUpdate(prevProps, prevState)`  
        //可以得到React调用时输入的重渲染前的props/state的快照，这个函数必须和componentDidUpdate()一起出现，否则会出错

        `componentDidUpdate()`  
        //如果配合“修改state可以触发re-render”的特性，这里有可能造成一个死循环的状态，要多加小心。  

    * **卸载期**  
    `componentWillUnmount()`  
    //React在卸载组件时只调用这一个组件内的预设函数  
    //但组件只能被上级组件(容器)卸载

## 3.2 React组件的 Props
如在 3.1.2 介绍过，React组件的Props就像函数的参数，可以让组件在构造时接受render输入的参数，render通过标签的Attribution传参数。
Props的类型可以是：字符串，变量，对象。
* 字符串  
```javascript
//组件
function Car(props){
    return <p>I am a {props.brand}!</p>;
}
//调用
root.render(<Car brand="Mazda">);
```

* 变量
```javascript
//组件
function Car(props){
    return <p>I am a {props.brand}!</p>;
}
//调用
const var = "Mazda";
root.render(<Car brand={ var }>);
```

* 对象 
```javascript
//组件
function Car(props){
    return <p>a { props.price} {props.info.brand} </p>;
}
//调用
const obj = {brand:"Mazda", year:2018, color:"red"};
root.render(<Car info={ obj } price="$12K">);
```

## 3.3 React组件的 Events
如同HTML DOM的事件， React的虚拟DOM也可以对用户事件执行动作Actions。React有和HTML一样的事件：click/change/mouseover等等。  

* 添加事件  
React 事件的语法采用驼峰命名法:
采用 onClick={ fn } 代替 onclick="fn()"  
**注意**：`onClick={fn}` 是可以的，但如果是 `onClick={fn()}` 那么 `fn()` 则会在加载组件时自动运行。正确的写法如下：

```javascript
//此例演示了onClick事件如何传递参数和事件
function Football(props) {  //接收组件参数
  const shoot = (myColor, ev) => {  //Listener 接收内部运行参数和用户事件
    //Listener 调用参数
    alert("Great Shot!" + props.color + myColor + ev.type);
  }

  const var1 = "yellow";

  return (
    //根据Listener的设计，输入内部参数和用户事件
    <button onClick={ (evt)=> shoot(var1, evt) }>Take the shot!</button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football color='red' />); //输入组件参数
```

## 3.4 React 的条件语句  
如 2.JSX常用语法 中提到，JSX没有if条件语句，所以当需要作条件判定时，可以：
* 在 React的逻辑中完成条件判断；
* 在 JSX 中使用 && 及 || （与非）操作符；
* 在 JSX 中使用 (?:) 三元操作符。
```javascript
// React 
function Goal(props) {
  const isGoal = props.isGoal;
  if (isGoal) {
    return <A />;
  }
  return <B />;
}

// JSX 的 && 逻辑与
function Goal(props) {
  const isGoal = props.isGoal;
  return (
    <p>
        {isGoal && <h1>Goal!</h1>}
    </p>
  );
}

// JSX 的三元操作符
function Goal(props) {
  const isGoal = props.isGoal;
  return (
    <p>
        {isGoal ? <h1>Goal!</h1> : <h1>Nearly there!</h1>}
    </p>
  );
}
```

# 4. React 实现 Web 页面常用组件
以下介绍React如何实现Web常见/常用的组件

## 4.1 Lists 列表
Web页面中经常使用大大小小的列表。
在章节1. ES6常用语句中介绍过 `.map()` ，作用是对数据集中item执行一个callBack函数。
```javascript
function Artical(props){
    return <li>{ props.title }</li>;
}

function Container(){
    const articals = ["title1", "t2", "t3"];
    return (
        <>
          <h1>Title List</h1>
          <ul>
            { articals.map( (i)=> <Artical title={ i } /> ) }
          </ul>
        </>
    );
}
```

以上代码可以运行，但React会警告此列表缺少 “Key”。 React使用Key可以只渲染特定Key值的item，减少不必要的渲染量。
数组列表可以使用索引作为Key，对象列表可以在对象中自定义Key项。
```javascript
function Artical(props){
    //return <li key={props.key}>{ props.title }</li>;
    // key不一定需要在item处指定
    return <li>{ props.title }</li>;
}

function Container(){
    const articals = [
        {id:1,title:"t1"},
        {id:2,title:"t2"},
        {id:3,title:"t3"}
    ];
    return (
        <>
          <h1>Title List</h1>
          <ul>{ 
            articals.map( (obj)=> <Artical  key={ obj.id }  title={ obj.title }  /> ) 
            //key 应该在数组的上下文中指定，所以简单的List写法如下也可以：
            //articals.map( (obj)=> <li key={ obj.id }>{ obj.title }</li> ) 
            }            
          </ul>
        </>
    );
}
```

## 4.2 Forms 表单
### * 处理Form数据  

“处理Form数据”是指 Form数据输入、变更或提交时如何处理。  
HTML由DOM处理Form数据，而React是由Component处理Form数据。  
当由React Component处理数据时，所有数据都存储在 `state` 组件中。  
控制数据变更是靠在标签的 `onChange` 属性添加事件处理器。  
React 使用 `useState` 挂钩来追踪所有的输入值。  
```javascript
import {useState} from 'react';
import ReactDOM from 'react-dom/client';

function MyForm(){
    const [name, setName] = useState(""); 
    //初始化一个名为name的属性，以及一个名为setName()的set方法
    //不再用HTML Form来提交input的数据，而是直接控制输入框，把输入框的内容写进state的name属性。
    return (
        <form>
            <input type="text" name="username" value={name} onChange={
                (e) => setName(e.target.value)
            } />
        </form>
    );
    
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyForm />);
```

### * 提交表单 Submitting Forms
有了输入后就可以提交表单了，React利用Form 的 onSubmit 事件来控制提交。
React可以停止了表单的HTML默认提交动作，然后再处理数据。
```javascript
function MyForm(){
    const [name, setName] = useState("");
    const handleSubmit = (evt)=> {
        evt.preventDefault();
        //do my stuff.
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="input" name="usename" onChange={(e)=>setName(e.target.value)} />
            <input type="submit"> OK </input>
        </form>
    );

}
```

### * 输入多项数据
上面的例子只有一个输入项name，那多个输入项如何处理呢？
为每一个输入项配一个state吗？不是，而是配一个对象就可以了，利用对象的展开操作可以用变更的输入值自动替换对象中已有的属性值。
```javascript
function MyForm(){
    const [inputs, setInputs] = useState({});//初始化一个空的对象
    const handleSubmit = (evt)=> {
        evt.preventDefault();
        //do my stuff.
    }

    const handleInputs = (evt) => {
        setInputs((prevValues)=> {...prevValues, [evt.target.name] : evt.target.value});
        //这里有几个知识点：1. 传递一个箭头函数给setInputs()的作用是什么；
        // 2. 箭头函数后面部分的花括号是函数返回的对象，而非函数体，写法清晰一点：
        //  （values) => {return {...values, [name]:value}}
        // 所以最后是得到一个对象传给setInputs()的；
        // 3. 最后往对象添加属性时，[name]的意思是把 name 作为变量使用，而不是修改一个名为 name 的属性。
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="input" name="username" value={inputs.username || ""} onChange={ handleInputs } />
            <input type="input" name="age" value={inputs.age || ""} onChange={ handleInputs } />
            <input type="submit" value="OK" />
        </form>
    );

}
```

再复杂一点的应用可以有父组件和子组件之间state的相互影响

### * 表单组件概述
诸如 `<input>` `<textarea>` `<select><option>`这样的表单组件不同于其他组件，因为他们可以通过用户交互发生变化。

```HTML
<input type=input value={input} onChange={setInput} />
<input type=checkbox checked={input=='checked'} onChange={setInput} />
<input type=radio checked={input=='man'} onChange={handleGender} name=gender value=man />
<textarea value={input} onChange={setInput} />
```

几个重要的属性：
* value，用于`<input>`和`<textarea>`，事件用onChange
* checked，用于 type= checkbox 或者 type= radio 的 `<input>`
* selected，用于`<option>`组件。

设置了value的 <input\> 是一个 **受限组件**，即input 始终保持 value 属性的值。如果想state更新为输入值，就得使用 onChange，并且以 value={state.value} 的方式赋值。  

不设置value的话则是一个 **不受限组件**，渲染出来的元素直接反应用户输入，用户输入不会直接引起state改变，同时以onChange监听。
不受控的 <input\> 可以设置 defaultValue 属性，设置一个非空的初始值。<input defaultValue="Hello" \/>

*受控组件* 简单来说就是它的值由React进行管理，而 *非受控组件* 的值则由原生DOM管理。

### * Textarea 组件
React的Textarea和HTML的有点不同：
> HTML : tag之间显示内容  
> ```HTML
> <textarea> Content </textarea>
> ```
> 

> React : value 属性赋值  
> ```HTML
> <textarea value={txtarea} onChange={setTxtarea} />
> ```

### * Select 组件
无论是下拉菜单或选择框，React和HTML都有所不同：  
> HTML : tag之间显示内容  
> ```HTML
> <select>
>   <option> item1 </option>
>   <option selected> item2 </option>    
> </select>
> ```
> HTML 使用 selected来设置预选项

> React : value 属性赋值  
> ```HTML
> <select value={value} onChange={setSelect}>
>   <option> item1 </option>
>   <option> item2 </option>    
> </select>
> ```
> React 使用 select 标签内的value属性 

对 \<textarea> 和 \<select> 这样改变后，React就可以用相同方式处理所有输入组件了。

## 4.3 Router 页面路由（地址映射）
页面路由即页面间切换
React 是单页面应用，本身不包括页面路由功能，自行用npm安装React Router是比较流行的解决方案，在不刷新整个网页的情况下在不同视图之间切换。
React Router可以“向App快速添加视图和数据流，同时保持页面与URL间的同步”。

## 4.4 Memo 备注
## 4.5 CSS
## 4.6 Sass

# 5. React 的 Hooks（挂钩）
## 5.1 基本概念
## 5.2 useState
## 5.3 useEffect
## 5.4 useContext
## 5.5 useRef
## 5.6 useReducer
## 5.7 useCallback
## 5.8 useMemo
## 5.9 自定义挂钩