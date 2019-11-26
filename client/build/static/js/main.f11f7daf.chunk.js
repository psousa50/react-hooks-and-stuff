(this["webpackJsonpenv-context"]=this["webpackJsonpenv-context"]||[]).push([[0],{43:function(t,e,n){t.exports=n(76)},76:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),a=n(16),c=n.n(a),i=n(15),u=n.n(i),l=n(21),s=n(6),d=n(22),f=n.n(d),p=n(11),m=n(4);var b=function(t){return Object(m.tryCatch)(t,(function(t){return t}))},v=function(t){return t.status<300?(n=t.data,Object(m.fromEither)(Object(p.right)(n))):(e=new Error(t.statusText),Object(m.fromEither)(Object(p.left)(e)));var e,n},O={toDoApi:{getOne:function(t){return Object(s.pipe)(b((function(){return f.a.get("https://jsonplaceholder.typicode.com/todos/".concat(t))})),Object(m.chain)(v))},getAll:function(){return Object(s.pipe)(b((function(){return f.a.get("https://jsonplaceholder.typicode.com/todos")})),Object(m.chain)(v),Object(m.map)((function(t){return t.slice(0,10)})))}}},D=r.a.createContext(O),E=n(10),j=n(13),h={toDos:[],toDo:void 0,loading:!1,error:void 0},g=Object(j.b)({name:"ToDos",initialState:h,reducers:{onGetToDosStart:function(t){t.loading=!0},onGetToDosSuccess:function(t,e){t.toDos=e.payload,t.loading=!1},onGetToDosError:function(t,e){t.error=e.payload,t.loading=!1},onGetToDoStart:function(t){t.loading=!0},onGetToDoSuccess:function(t,e){t.toDo=e.payload,t.loading=!1},onGetToDoError:function(t,e){t.error=e.payload,t.loading=!1}}}),T=g.actions,w=T.onGetToDosStart,y=T.onGetToDosSuccess,G=T.onGetToDosError,k=T.onGetToDoStart,x=T.onGetToDoSuccess,S=T.onGetToDoError,A=g.reducer,C=n(12),B=n(19),I=function(){var t=function(){var t=Object(o.useContext)(D).toDoApi,e=Object(E.b)();Object(o.useEffect)((function(){(function(){var n=Object(l.a)(u.a.mark((function n(){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e(w()),n.next=3,Object(s.pipe)(t.getAll(),Object(m.fold)((function(t){return e(G(t.message)),C.task.of(void 0)}),(function(t){return e(y(t)),C.task.of(void 0)})))();case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}})()()}),[e,t]);var n=Object(E.c)((function(t){return t.toDos}));return{toDos:n.toDos,loading:n.loading,error:n.error}}(),e=t.toDos,n=t.loading,a=t.error;return a?r.a.createElement("div",null,"Error: ".concat(a)):n?r.a.createElement("div",null,"Loading..."):r.a.createElement("div",null,r.a.createElement("h1",null,"TO DOs"),e.map((function(t){return r.a.createElement("div",{key:t.id},r.a.createElement("div",null,t.title),r.a.createElement(B.b,{to:{pathname:"/todo/".concat(t.id)}},"Show"))})))},J=n(8),L=function(){var t=Object(J.f)().id,e=function(t){var e=Object(o.useContext)(D).toDoApi,n=Object(E.b)();Object(o.useEffect)((function(){(function(){var o=Object(l.a)(u.a.mark((function o(){return u.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return n(k()),o.next=3,Object(s.pipe)(e.getOne(t),Object(m.fold)((function(t){return n(S(t.message)),C.task.of(void 0)}),(function(t){return n(x(t)),C.task.of(void 0)})))();case 3:return o.abrupt("return",o.sent);case 4:case"end":return o.stop()}}),o)})));return function(){return o.apply(this,arguments)}})()()}),[n,e,t]);var r=Object(E.c)((function(t){return t.toDos}));return{toDo:r.toDo,loading:r.loading,error:r.error}}(parseInt(t)),n=e.toDo,a=e.loading;return!n||a?r.a.createElement("div",null,"Loading..."):r.a.createElement("div",null,r.a.createElement("h2",null,"ToDo"),r.a.createElement("div",null,n.title))},W=n(7),P=Object(W.combineReducers)({toDos:A}),R=Object(j.a)({reducer:P});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement((function(){return r.a.createElement(D.Provider,{value:O},r.a.createElement(E.a,{store:R},r.a.createElement(B.a,null,r.a.createElement(J.c,null,r.a.createElement(J.a,{path:"/todo/:id"},r.a.createElement(L,null)),r.a.createElement(J.a,{path:"/"},r.a.createElement(I,null))))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[43,1,2]]]);
//# sourceMappingURL=main.f11f7daf.chunk.js.map