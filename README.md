# ionic1-area-picker-demo
ionic1地区（省、市、区）选择器Demo
这只是一个ionic1地区（省、市、区）选择Demo，并不是一个插件，不涉及任何原生的东西。

![地区选择Demo.gif](http://upload-images.jianshu.io/upload_images/4128422-82b708a0ed3c9a6a.gif?imageMogr2/auto-orient/strip)

***
1. 关于地区数据
* 地区数据是保存在本地的area.json文件里面，使用$http.get("js/area.json")获取数据到项目中。
* 地区数据很少有发生变化，所以很适合存在本地，减少从服务器获取数据的时间。
* 当然，如果你一定要从服务器上去获取，也不是不可以。如果数据格式与当前项目的格式不相同的话，那相应的service的处理也要变化。

2. 关于界面显示
地区选择的界面通过一个modal层来弹出来，主要是为了方便值传递。
在ionic-modal-view里面使用ion-slide-box，设置ion-slide-box的高度为全屏时使用height=100%不起作用，只能用ng-style把屏幕的高度给它。
一开始使用ion-veiw的方式来做的，选择了地区之后使用广播的方式回传到上一个页面。后来放弃了，因为出现了一个问题，没能完全解决掉。
第一个页面需要有地区选择的广播监听处理，从它进入的下一个页面也有这个监听处理。在第二个页面上完成地区选择之后，两个页面的监听事件都会被触发。
目前$ionicModal只带了一种从下方弹出的动画。自定义$ionicModal的动画，比如：从右边往左弹出。

       /*================ 自定义$ionicModal动画 ================*/
        .slide-in-right {
          -webkit-transform: translateX(-100%);
          transform: translateX(100%);
        }

        .slide-in-right.ng-enter, .slide-in-right > .ng-enter {
          -webkit-transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;
          transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;
        }

        .slide-in-right.ng-enter-active, .slide-in-right > .ng-enter-active {
          -webkit-transform: translateX(0);
          transform: translateX(0);
        }

        .slide-in-right.ng-leave, .slide-in-right > .ng-leave {
          -webkit-transition: all ease-in-out 250ms;
          transition: all ease-in-out 250ms;
        }

        .slide-in-left {
          -webkit-transform: translateX(-100%);
          transform: translateX(100%);
        }

        .slide-in-left.ng-enter, .slide-in-left > .ng-enter {
          -webkit-transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;
          transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;
        }

        .slide-in-left.ng-enter-active, .slide-in-left > .ng-enter-active {
          -webkit-transform: translateX(0);
          transform: translateX(0);
        }

        .slide-in-left.ng-leave, .slide-in-left > .ng-leave {
          -webkit-transition: all ease-in-out 250ms;
          transition: all ease-in-out 250ms;
        }

        /*================ 自定义$ionicModal动画 ================*/

3. 关于$ionicModal的再封装
选择地区的界面是用一个modal层弹出来的，因为在实际项目中，可能很多地方都会用到，所以就把对modal层的初始化，show、hide以及remove封装到一个service中。
同时，这个service还包括选中省、市、区之后的操作。
因为modal层的缓存的原因，所以在modal层关闭的时候是调用的remove方法，每次弹出的modal层都是重新初始化出来的。
