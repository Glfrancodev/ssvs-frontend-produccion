import{a as le}from"./chunk-IOCKE5T6.js";import{a as ne,b as ie}from"./chunk-FNNVKIP6.js";import{a as re,b as ae}from"./chunk-ZIVYLMDF.js";import{a as oe}from"./chunk-JQIAP6UG.js";import{A as K,B as Y,C as J,D as Q,E as X,F as Z,G as ee,H as te,d as h,h as W,o as G,p as q,q as L,r as U,s as H}from"./chunk-F5T2E34X.js";import{o as F,q as N,s as A,t as D,w as z,y as j}from"./chunk-RO5PIZCY.js";import"./chunk-4YRY4IP2.js";import{m as V,r as $}from"./chunk-2HP4KZBQ.js";import{$a as m,Bb as x,Cb as v,Db as S,Eb as I,Fb as T,Gb as y,Ka as d,La as g,X as k,Ya as _,_b as B,cb as P,ea as s,eb as a,fa as u,fb as l,gb as O,kb as f,nb as b,ob as c,xb as p,zb as w}from"./chunk-TOSOZOFE.js";import{a as E}from"./chunk-ODN5LVDJ.js";var de=()=>({width:"120px",height:"40px"}),pe=()=>({"min-width":"50rem"});function me(n,e){n&1&&(a(0,"tr")(1,"th",10),p(2,"Id"),l(),a(3,"th",11),p(4,"Nombre"),l(),a(5,"th",12),p(6,"Acci\xF3n"),l()())}function se(n,e){if(n&1&&p(0),n&2){let t=c().$implicit;w(" ",t.id," ")}}function ue(n,e){if(n&1){let t=f();a(0,"input",21),S("ngModelChange",function(i){s(t);let r=c().$implicit;return v(r.nombre,i)||(r.nombre=i),u(i)}),l()}if(n&2){let t=c().$implicit;x("ngModel",t.nombre)}}function ge(n,e){if(n&1&&p(0),n&2){let t=c().$implicit;w(" ",t.nombre," ")}}function fe(n,e){if(n&1){let t=f();a(0,"button",22),b("click",function(){s(t);let i=c().$implicit,r=c();return u(r.onRowEditInit(i))}),l()}}function be(n,e){if(n&1){let t=f();a(0,"button",23),b("click",function(){s(t);let i=c().$implicit,r=c();return u(r.deleteRol(i.id))}),l()}}function _e(n,e){if(n&1){let t=f();a(0,"button",24),b("click",function(){s(t);let i=c().$implicit,r=c();return u(r.onRowEditSave(i))}),l()}}function he(n,e){if(n&1){let t=f();a(0,"button",25),b("click",function(){s(t);let i=c(),r=i.$implicit,C=i.rowIndex,R=c();return u(R.onRowEditCancel(r,C))}),l()}}function Ce(n,e){if(n&1&&(a(0,"tr",13)(1,"td")(2,"p-cellEditor"),_(3,se,1,1,"ng-template",14),l()(),a(4,"td")(5,"p-cellEditor"),_(6,ue,1,1,"ng-template",15)(7,ge,1,1,"ng-template",14),l()(),a(8,"td")(9,"div",16),_(10,fe,1,0,"button",17)(11,be,1,0,"button",18)(12,_e,1,0,"button",19)(13,he,1,0,"button",20),l()()()),n&2){let t=e.$implicit,o=e.editing;m("pEditableRow",t),d(10),m("ngIf",!o),d(),m("ngIf",!o),d(),m("ngIf",o),d(),m("ngIf",o)}}var M=class n{constructor(e,t,o,i,r){this.rolService=e;this.messageService=t;this.bitacoraService=o;this.authService=i;this.cdr=r}roles=[];editedRoles={};newRol={nombre:""};sortField="id";sortOrder=1;ngOnInit(){this.getAllRoles()}getAllRoles(){this.rolService.getRoles().subscribe(e=>{this.roles=e})}registrarBitacora(e,t){this.bitacoraService.getUserIP().subscribe({next:o=>{let i=new Date,r=`${i.getFullYear()}-${(i.getMonth()+1).toString().padStart(2,"0")}-${i.getDate().toString().padStart(2,"0")}`,C=`${i.getHours().toString().padStart(2,"0")}:${i.getMinutes().toString().padStart(2,"0")}:${i.getSeconds().toString().padStart(2,"0")}`,R={correo:this.authService.getAuthenticatedUserEmail()||"",fecha:r,hora:C,ip:o.ip,accion:e,detalle:t};this.bitacoraService.createBitacora(R).subscribe({next:()=>console.log("Registro de bit\xE1cora exitoso"),error:ce=>console.error("Error al registrar en bit\xE1cora",ce)})},error:o=>console.error("Error al obtener IP",o)})}onRowEditInit(e){this.editedRoles[e.id]=E({},e),this.messageService.add({severity:"info",summary:"Edici\xF3n",detail:"Editando rol"})}onRowEditSave(e){e.nombre?this.rolService.updateRol(e).subscribe(()=>{delete this.editedRoles[e.id],this.messageService.add({severity:"success",summary:"Guardado",detail:"Rol actualizado"}),this.registrarBitacora("Actualizar Rol",`Rol actualizado: ${e.nombre}`)}):this.messageService.add({severity:"error",summary:"Error",detail:"Nombre es obligatorio"})}onRowEditCancel(e,t){this.roles[t]=this.editedRoles[e.id]||e,delete this.editedRoles[e.id],this.messageService.add({severity:"info",summary:"Cancelado",detail:"Edici\xF3n cancelada"})}deleteRol(e){let t=this.roles.find(o=>o.id===e);this.rolService.deleteRol(e).subscribe(()=>{this.roles=this.roles.filter(o=>o.id!==e),this.messageService.add({severity:"success",summary:"Eliminado",detail:"Rol eliminado correctamente"}),this.registrarBitacora("Eliminar Rol",`Rol eliminado: ${t?.nombre}`)})}saveRol(){this.newRol.nombre?this.rolService.createRol(this.newRol).subscribe(e=>{this.roles=[...this.roles,e],this.cdr.detectChanges(),this.messageService.add({severity:"success",summary:"Guardado",detail:"Nuevo rol creado correctamente"}),this.registrarBitacora("A\xF1adir Rol",`Rol a\xF1adido: ${e.nombre}`),this.newRol={nombre:""}}):this.messageService.add({severity:"error",summary:"Error",detail:"Nombre es obligatorio"})}static \u0275fac=function(t){return new(t||n)(g(le),g(h),g(oe),g(F),g(B))};static \u0275cmp=k({type:n,selectors:[["app-permiso"]],standalone:!0,features:[I([h]),T],decls:13,vars:9,consts:[[1,"form-container"],[2,"font-weight","bold"],[1,"form-field"],["for","nombre",2,"font-weight","bold"],["id","nombre","type","text","pInputText","","placeholder","Nombre del permiso",3,"ngModelChange","ngModel"],[1,"form-field",2,"text-align","center"],["icon","pi pi-save","label","Guardar","styleClass","p-button-raised p-button-warning",3,"click"],["dataKey","id","editMode","row",3,"value","tableStyle","sortField","sortOrder"],["pTemplate","header"],["pTemplate","body"],["pSortableColumn","id",2,"width","30%"],[2,"width","50%"],[2,"width","20%"],[3,"pEditableRow"],["pTemplate","output"],["pTemplate","input"],[1,"flex","align-items-center","justify-content-center","gap-2"],["pButton","","pRipple","","type","button","pInitEditableRow","","icon","pi pi-pencil","class","p-button-rounded","style","background-color: #ffffff; color: #007bff; border: none; width: 2.5rem; height: 2.5rem;",3,"click",4,"ngIf"],["pButton","","pRipple","","type","button","icon","pi pi-trash","class","p-button-rounded p-button-danger","style","width: 3rem; height: 3rem;",3,"click",4,"ngIf"],["pButton","","pRipple","","type","button","pSaveEditableRow","","icon","pi pi-check","class","p-button-rounded","style","background-color: #ffffff; color: #28a745; border: none; width: 2.5rem; height: 2.5rem; margin-right: 0.5rem;",3,"click",4,"ngIf"],["pButton","","pRipple","","type","button","pCancelEditableRow","","icon","pi pi-times","class","p-button-rounded","style","background-color: #ffffff; color: #dc3545; border: none; width: 2.5rem; height: 2.5rem;",3,"click",4,"ngIf"],["pInputText","","type","text","required","",3,"ngModelChange","ngModel"],["pButton","","pRipple","","type","button","pInitEditableRow","","icon","pi pi-pencil",1,"p-button-rounded",2,"background-color","#ffffff","color","#007bff","border","none","width","2.5rem","height","2.5rem",3,"click"],["pButton","","pRipple","","type","button","icon","pi pi-trash",1,"p-button-rounded","p-button-danger",2,"width","3rem","height","3rem",3,"click"],["pButton","","pRipple","","type","button","pSaveEditableRow","","icon","pi pi-check",1,"p-button-rounded",2,"background-color","#ffffff","color","#28a745","border","none","width","2.5rem","height","2.5rem","margin-right","0.5rem",3,"click"],["pButton","","pRipple","","type","button","pCancelEditableRow","","icon","pi pi-times",1,"p-button-rounded",2,"background-color","#ffffff","color","#dc3545","border","none","width","2.5rem","height","2.5rem",3,"click"]],template:function(t,o){t&1&&(O(0,"p-toast"),a(1,"div",0)(2,"h3",1),p(3,"Crear Nuevo Rol"),l(),a(4,"div",2)(5,"label",3),p(6,"Nombre"),l(),a(7,"input",4),S("ngModelChange",function(r){return v(o.newRol.nombre,r)||(o.newRol.nombre=r),r}),l()(),a(8,"div",5)(9,"p-button",6),b("click",function(){return o.saveRol()}),l()()(),a(10,"p-table",7),_(11,me,7,0,"ng-template",8)(12,Ce,14,5,"ng-template",9),l()),t&2&&(d(7),x("ngModel",o.newRol.nombre),d(2),P(y(7,de)),d(),m("value",o.roles)("tableStyle",y(8,pe))("sortField",o.sortField)("sortOrder",o.sortOrder))},dependencies:[te,K,W,Y,ee,J,Q,X,Z,$,V,ae,re,j,N,A,z,D,H,L,U,q,G,ie,ne],styles:[".form-container[_ngcontent-%COMP%]{padding:1.5rem;border:1px solid #ddd;border-radius:12px;background-color:#f9f9f9;box-shadow:0 4px 8px #0000001a;margin-bottom:1.5rem;display:grid;gap:1rem;max-width:100%;margin:auto}.form-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:700;color:#3f51b5;text-align:center;margin:0;margin-bottom:1rem;border-bottom:2px solid #ddd;padding-bottom:.5rem}.form-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem}.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-weight:600;color:#333}input[pInputText][_ngcontent-%COMP%]{width:100%;padding:.5rem;border-radius:6px;border:1px solid #ddd;background-color:#fff;font-size:.95rem;box-shadow:inset 0 1px 3px #0000001a;transition:border-color .3s ease}input[pInputText][_ngcontent-%COMP%]:focus{outline:none;border-color:#3f51b5;box-shadow:0 0 4px #3f51b54d}.p-button-warning[_ngcontent-%COMP%]{background-color:#ffc107!important;color:#fff!important;font-size:1rem;border-radius:8px;padding:.75rem 1rem;font-weight:700;width:50%;margin:auto;box-shadow:0 2px 6px #00000026}.p-button-warning[_ngcontent-%COMP%]:hover{background-color:#e0a800!important}.p-table[_ngcontent-%COMP%]{width:100%;max-width:1200px;margin:auto;border-radius:8px;overflow:hidden;box-shadow:0 4px 8px #0000001a;font-size:.95rem}.p-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#3f51b5;color:#fff;font-weight:700;text-align:center;padding:12px}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{transition:background-color .3s}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f7f7f7}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#e0f7fa}.p-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px;text-align:center;vertical-align:middle}.p-button-rounded[_ngcontent-%COMP%]{border-radius:50%!important}.p-button-danger[_ngcontent-%COMP%]{width:2.5rem;height:2.5rem;border-radius:50%;color:#d32f2f!important}.p-button-danger[_ngcontent-%COMP%]:hover{background-color:#d32f2f!important;color:#fff!important}.p-button-success[_ngcontent-%COMP%]{background-color:#43a047!important;color:#fff!important;width:2.5rem;height:2.5rem}.p-button-success[_ngcontent-%COMP%]:hover{background-color:#388e3c!important}.p-button[_ngcontent-%COMP%]{box-shadow:none!important}"]})};export{M as default};