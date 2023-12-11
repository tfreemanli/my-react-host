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

React一般使用JSX语法，JSX语法在浏览器编译成JS之后再运行渲染。所以React多被称为前段渲染。
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

const componentApp = () => {     //组件
    return <p>函数形态的组件，返回HTML标签</p>
}

const container = document.getElementById("whateverLikeRoot");
const root = ReactDOM.createRoot(container);
root.render(myReactApp);
root.render(myElement);
root.render(<componentApp />);
```

换句话说，浏览器里看到的页面是React在浏览器的虚拟环境下“画”出来的结果，`ReactDOM.createRoot()` 就是在创建一个虚拟的DOM。每当虚拟环境下的内容改变时，浏览器就重新“画”一次。从MVC模式看，浏览器的画面是内存虚拟环境里各个JS“对象”的V，内存里还有对象本身M以及控制逻辑C

# 1. ES6 中的常用语法
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


# 2. JSX 常用语法
JSX = JavaScript XML，是XML语法。   
React支持JSX，使React的语句更简洁，在本文最开始的React简介中就有过简单的例子。
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


## 3.1 Class
