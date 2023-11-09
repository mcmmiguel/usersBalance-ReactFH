(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();const N=`<div class="modal-dialog">\r
    <form novalidate>\r
        <span>User</span>\r
        <input type="text" name="firstName" placeholder="First Name" />\r
        <input type="text" name="lastName" placeholder="Last Name" />\r
        <input type="number" name="balance" placeholder="Balance" />\r
\r
        <div>\r
            <input type="checkbox" id="is-active" name="isActive" checked />\r
            <label for="is-active">is active?</label>\r
        </div>\r
\r
        <button type="submit">\r
            Save\r
        </button>\r
\r
    </form>\r
\r
</div>`;class y{constructor({id:t,isActive:r,balance:n,avatar:a,firstName:s,lastName:c,gender:m}){this.id=t,this.isActive=r,this.balance=n,this.avatar=a,this.firstName=s,this.lastName=c,this.gender=m}}const f=e=>{const{avatar:t,balance:r,first_name:n,gender:a,id:s,isActive:c,last_name:m}=e;return new y({avatar:t,balance:r,firstName:n,gender:a,id:s,isActive:c,lastName:m})},w=async e=>{const t=`http://localhost:3001/users/${e}`,n=await(await fetch(t)).json();return f(n)};let i,d,v={};const b=async e=>{if(i==null||i.classList.remove("hide-modal"),!e)return;const t=await w(e);P(t)},g=()=>{i==null||i.classList.add("hide-modal"),d==null||d.reset()},P=e=>{d.querySelector('[name="firstName"]').value=e.firstName,d.querySelector('[name="lastName"]').value=e.lastName,d.querySelector('[name="balance"]').value=e.balance,d.querySelector('[name="isActive"]').value=e.isActive,v=e},T=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=N,i.className="modal-container hide-modal",d=i.querySelector("form"),i.addEventListener("click",r=>{r.target.className==="modal-container"&&g()}),d.addEventListener("submit",async r=>{r.preventDefault(),console.log(r);const n=new FormData(d),a={...v};for(const[s,c]of n){if(s==="balance"){a[s]=+c;continue}if(s==="isActive"){a[s]=c==="on";continue}a[s]=c}await t(a),g()}),e.append(i))};const E=e=>{const t=document.createElement("button");t.innerText="+",t.classList.add("fab-button"),t.addEventListener("click",()=>{b()}),e.append(t)},h=async(e=1)=>{const t=`http://localhost:3001/users?_page=${e}`;return(await(await fetch(t)).json()).map(s=>f(s))},o={currentPage:0,users:[]},S=async()=>{const e=await h(o.currentPage+1);e.length!==0&&(o.currentPage+=1,o.users=e)},L=async()=>{if(o.currentPage===1)return;const e=await h(o.currentPage-1);o.currentPage-=1,o.users=e},$=e=>{let t=!1;o.users=o.users.map(r=>r.id===e.id?(t=!0,e):r),o.users.length<10&&!t&&o.users.push(e)},A=async()=>{const e=await h(o.currentPage);if(e.length===0){await L();return}o.users=e},l={loadNextPage:S,loadPreviousPage:L,onUserChanged:$,reloadPage:A,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage},U=async e=>{const t=`http://localhost:3001/users/${e}`;return await(await fetch(t,{method:"DELETE"})).json(),!0};let u;const x=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Active</th>
        <th>Actions</th>
    </tr>
    `;const r=document.createElement("tbody");return e.append(t,r),e},M=e=>{const t=e.target.closest(".select-user");if(!t)return;const r=t.getAttribute("data-id");b(r)},B=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const r=t.getAttribute("data-id");try{await U(r),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),p()}catch(n){alert("No se pudo eliminar"),console.log(n)}},p=e=>{const t=l.getUsers();u||(u=x(),e.append(u),u.addEventListener("click",M),u.addEventListener("click",B));let r="";t.forEach(n=>{r+=`
        <tr>
            <td>${n.id}</td>
            <td>${n.balance}</td>
            <td>${n.firstName}</td>
            <td>${n.lastName}</td>
            <td>${n.isActive}</td>
            <td>
                <a href="#/" class="select-user" data-id=${n.id}> Select </a>
                |
                <a href="#/" class="delete-user" data-id=${n.id}> Delete </a>
            </td>
        </tr>
        `}),u.querySelector("tbody").innerHTML=r};const C=e=>{const t=document.createElement("button");t.innerText=" Next > ",t.addEventListener("click",async()=>{await l.loadNextPage(),n.innerText=l.getCurrentPage(),p(e)});const r=document.createElement("button");r.innerText=" < Prev ",r.addEventListener("click",async()=>{await l.loadPreviousPage(),n.innerText=l.getCurrentPage(),p(e)});const n=document.createElement("span");n.id="current-page",n.innerText=l.getCurrentPage(),e.append(r,n,t)},H=e=>{const{avatar:t,balance:r,firstName:n,gender:a,id:s,isActive:c,lastName:m}=e;return{avatar:t,balance:r,first_name:n,gender:a,id:s,isActive:c,last_name:m}},O=async e=>{const t=new y(e);if(!t.firstName||!t.lastName)throw"Hay campos sin llenar";const r=H(t);let n;return t.id?n=await D(r):n=await q(r),f(n)},q=async e=>{const n=await(await fetch("http://localhost:3001/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log(n),n},D=async e=>{const t=`http://localhost:3001/users/${e.id}`,n=await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({updatedUser:n}),n},j=async e=>{e.innerHTML="Loading",await l.loadNextPage(),e.innerHTML="",p(e),C(e),E(e),T(e,async t=>{const r=await O(t);l.onUserChanged(r),p()})};document.querySelector("#app").innerHTML=`
  <div>
    <h1>USERS BALANCE CONTROL - CRUD</h1>
    <div class="card container">
    </div>
  </div>
`;const F=document.querySelector(".card");j(F);
