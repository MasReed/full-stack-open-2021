(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{23:function(t,e,n){},43:function(t,e,n){"use strict";n.r(e);var c=n(1),r=n(17),a=n.n(r),o=(n(23),n(8)),i=n(3),u=n(4),s=n.n(u),l="/api/notes",d={getAll:function(){var t=s.a.get(l),e={id:1e4,content:"This note not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))},create:function(t){return s.a.post(l,t).then((function(t){return t.data}))},update:function(t,e){return s.a.put("".concat(l,"/").concat(t),e).then((function(t){return t.data}))}},j=n(0),b=function(){return Object(j.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:"16px"},children:[Object(j.jsx)("br",{}),Object(j.jsx)("em",{children:"Note App Example 2021"})]})},f=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"mark unimportant":"mark important";return Object(j.jsxs)("li",{className:"note",children:[e.content,Object(j.jsx)("button",{onClick:n,children:c})]})},m=function(t){var e=t.message;return e?Object(j.jsx)("div",{className:"error-notification",children:e}):null},h=function(){var t=Object(c.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],a=Object(c.useState)("a new note..."),u=Object(i.a)(a,2),s=u[0],l=u[1],h=Object(c.useState)(!0),O=Object(i.a)(h,2),p=O[0],x=O[1],g=Object(c.useState)(null),v=Object(i.a)(g,2),C=v[0],S=v[1];Object(c.useEffect)((function(){d.getAll().then((function(t){r(t)}))}),[]);var w=p?n:n.filter((function(t){return t.important}));return Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:"Notes"}),Object(j.jsx)(m,{message:C}),Object(j.jsx)("div",{children:Object(j.jsxs)("button",{onClick:function(){return x(!p)},children:["Show ",p?"important":"all"]})}),Object(j.jsx)("ul",{children:w.map((function(t){return Object(j.jsx)(f,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(o.a)(Object(o.a)({},e),{},{important:!e.important});d.update(t,c).then((function(e){r(n.map((function(n){return n.id!==t?n:e})))})).catch((function(t){S("Note '".concat(e.content,"' does not exist on the server.")),setTimeout((function(){S(null)}),5e3)}))}(t.id)}},t.id)}))}),Object(j.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:(new Date).toISOString(),important:Math.random()<.5};d.create(e).then((function(t){r(n.concat(t)),l("")}))},children:[Object(j.jsx)("input",{value:s,onChange:function(t){l(t.target.value)}}),Object(j.jsx)("button",{type:"submit",children:"Save"})]}),Object(j.jsx)(b,{})]})},O=n(18),p="/api/persons",x={createContact:function(t){return s.a.post(p,t).then((function(t){return t.data}))},readAllContacts:function(){return s.a.get(p).then((function(t){return t.data}))},updateContact:function(t){return s.a.put(p+"/".concat(t.id),t).then((function(t){return t.data}))},deleteContact:function(t){return s.a.delete(p+"/".concat(t)).then((function(t){return t.data}))}},g=function(t){var e=t.message;if(!e)return null;return Object(j.jsx)("div",{style:{color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},children:e})},v=function(t){var e=t.onChange,n=t.value;return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{children:Object(j.jsx)("input",{placeholder:"Search Contacts...",onChange:e,value:n})})})},C=function(t){var e=t.onSubmit,n=t.newName,c=t.handleNameChange,r=t.newNumber,a=t.handleNumberChange;return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("h2",{children:"Add New Contact"}),Object(j.jsxs)("form",{onSubmit:e,children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{children:"Name: "}),Object(j.jsx)("input",{value:n,onChange:c})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{children:"Number: "}),Object(j.jsx)("input",{value:r,onChange:a})]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{type:"submit",children:"Add"})})]})]})},S=function(t){var e=t.id,n=t.name,c=t.number,r=t.onClick;return Object(j.jsxs)("div",{id:e,style:{padding:"5px"},children:[Object(j.jsxs)("p",{style:{display:"inline"},children:[n,": #",c]}),Object(j.jsx)("button",{onClick:r,style:{display:"inline",marginLeft:"10px"},children:"Delete"})]},e)},w=function(t){var e=t.getContacts,n=t.onClick,c=e();return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("h2",{children:"Contacts"}),c.map((function(t){return t?Object(j.jsx)(S,{id:t.id,name:t.name,number:t.number,onClick:n},t.id):null}))]})},y=function(t){var e=t.message;if(!e)return null;return Object(j.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},children:e})},N=function(){var t=Object(c.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],a=Object(c.useState)(""),o=Object(i.a)(a,2),u=o[0],s=o[1],l=Object(c.useState)(""),d=Object(i.a)(l,2),b=d[0],f=d[1],m=Object(c.useState)(""),h=Object(i.a)(m,2),p=h[0],S=h[1],N=Object(c.useState)(!0),k=Object(i.a)(N,2),A=k[0],T=k[1],D=Object(c.useState)(null),F=Object(i.a)(D,2),L=F[0],E=F[1],I=Object(c.useState)(null),z=Object(i.a)(I,2),B=z[0],R=z[1];Object(c.useEffect)((function(){x.readAllContacts().then((function(t){return r(t)}))}),[]);var J=function(t){var e=t.name,c=t.number,a=n.filter((function(t){return t.name===e}))[0],o=a.id,i={name:e,number:c,id:o};x.updateContact(i).then((function(t){r((function(e){var n=e.indexOf(a),c=Object(O.a)(e);return c[n]=t,c})),E("'".concat(e,"' successfully updated!")),setTimeout((function(){E(null)}),5e3)})).catch((function(t){R("'".concat(i.name,"' cannot be found.")),setTimeout((function(){R(null)}),5e3)})),s(""),f("")};return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("h1",{children:"Phonebook"}),Object(j.jsx)(y,{message:L}),Object(j.jsx)(g,{message:B}),Object(j.jsx)(v,{onChange:function(t){T(!1),S(t.target.value)},value:p}),Object(j.jsx)(C,{onSubmit:function(t){t.preventDefault();var e={name:u,number:b};n.some((function(t){return t.name.toLowerCase()===u.toLowerCase()}))?window.confirm("\n'".concat(u,"' is already a contact.\n                \nReplace the previous number with: ").concat(b,"?"))&&J(e):x.createContact(e).then((function(t){r(n.concat(t)),E("'".concat(e.name,"' successfully added!")),setTimeout((function(){E(null)}),5e3)}));s(""),f("")},newName:u,handleNameChange:function(t){s(t.target.value)},newNumber:b,handleNumberChange:function(t){f(t.target.value)}}),Object(j.jsx)(w,{getContacts:function(){return A?n:n.filter((function(t){return!0===t.name.toLowerCase().includes(p.toLowerCase())}))},onClick:function(t){var e=t.target.parentNode.id,c=n.find((function(t){return t.id===e}));window.confirm("Delete contact '".concat(c.name,"' ?"))&&x.deleteContact(e).then((function(t){r(n.filter((function(t){return t.id!==e})))})).catch((function(t){console.log(t)}))}})]})};a.a.render(Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(h,{}),Object(j.jsx)(N,{})]}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.8a5eb3c7.chunk.js.map