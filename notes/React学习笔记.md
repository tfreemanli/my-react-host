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

React一般使用JSX语法，JSX语法在浏览器编译成JS之后再运行渲染。所以React多被称为前端渲染。
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

换句话说，浏览器里看到的页面是React在浏览器的虚拟环境下“画”出来的结果，`ReactDOM.createRoot()` 就是在创建一个虚拟的DOM。每当虚拟环境下的内容改变时，浏览器就重新“画”一次。从MVC模式看，浏览器的画面是内存虚拟环境里各个JS“对象”的V，内存里还有对象本身M以及控制逻辑C

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

# 3. 组件（Components）的概念
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