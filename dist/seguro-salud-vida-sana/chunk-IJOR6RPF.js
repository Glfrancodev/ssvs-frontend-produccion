import{a as N}from"./chunk-VAO66HGS.js";import{a as R,b as A}from"./chunk-BNUNU2GP.js";import{B as H,f as E,k as I,l as y,n as T,u as F}from"./chunk-RDO4C5ZH.js";import"./chunk-4YRY4IP2.js";import{j as k}from"./chunk-24563CTF.js";import{h as S,j as w}from"./chunk-EALBQTKK.js";import{q as P}from"./chunk-5DWL5JJZ.js";import{$a as _,Ab as i,Bb as c,Db as x,Ib as M,Jb as O,Na as a,Oa as d,_ as C,cb as h,ha as l,hb as e,ia as s,ib as o,nb as v,qb as b,rb as g}from"./chunk-3RWLLOHT.js";var V=()=>({"min-width":"50rem","max-width":"100%"});function B(r,n){r&1&&(e(0,"tr")(1,"th",4),i(2,"N\xFAmero"),o(),e(3,"th",5),i(4,"Fecha Reservado"),o(),e(5,"th",4),i(6,"Hora"),o(),e(7,"th",4),i(8,"Fecha Horario"),o(),e(9,"th",5),i(10,"Nombre Asegurado"),o(),e(11,"th",4),i(12,"Acciones"),o()())}function D(r,n){if(r&1){let t=v();e(0,"tr")(1,"td"),i(2),o(),e(3,"td"),i(4),o(),e(5,"td"),i(6),o(),e(7,"td"),i(8),o(),e(9,"td"),i(10),o(),e(11,"td")(12,"button",6),b("click",function(){let u=l(t).$implicit,m=g();return s(m.verHistoriaClinica(u.asegurado.id))}),o(),e(13,"button",7),b("click",function(){let u=l(t).$implicit,m=g();return s(m.iniciarConsulta(u.id))}),o()()()}if(r&2){let t=n.$implicit;a(2),c(t.numero),a(2),c(t.fechaReservado),a(2),c(t.hora),a(2),c(t.horario.fecha),a(2),x("",t.asegurado.usuario.nombre," ",t.asegurado.usuario.apellido,"")}}var f=class r{constructor(n,t,p){this.route=n;this.cupoService=t;this.router=p}cupos=[];ngOnInit(){this.route.paramMap.subscribe(n=>{let t=Number(n.get("idHorario"));t&&this.obtenerCuposOcupados(t)})}obtenerCuposOcupados(n){this.cupoService.getCuposOcupadosPorHorario(n).subscribe(t=>{this.cupos=t,console.log("Cupos ocupados:",this.cupos)},t=>{console.error("Error al obtener los cupos ocupados:",t)})}verHistoriaClinica(n){this.router.navigate(["/historia-clinica",n])}iniciarConsulta(n){this.router.navigate(["/consulta",n])}static \u0275fac=function(t){return new(t||r)(d(S),d(N),d(w))};static \u0275cmp=C({type:r,selectors:[["app-cupo-medico"]],standalone:!0,features:[M],decls:6,vars:3,consts:[[1,"cupo-container"],["dataKey","id",3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[2,"width","15%"],[2,"width","20%"],["pButton","","type","button","icon","pi pi-ellipsis-h",1,"p-button-rounded","p-button-text","p-button-info",3,"click"],["pButton","","type","button","icon","pi pi-arrow-right",1,"p-button-rounded","p-button-text","p-button-success",3,"click"]],template:function(t,p){t&1&&(e(0,"div",0)(1,"h3"),i(2,"Tus Citas"),o(),e(3,"p-table",1),_(4,B,13,0,"ng-template",2)(5,D,14,6,"ng-template",3),o()()),t&2&&(a(3),h("value",p.cupos)("tableStyle",O(2,V)))},dependencies:[P,H,F,E,k,T,y,I,A,R],styles:[".cupo-container[_ngcontent-%COMP%]{max-width:100%;margin:auto;padding:1.5rem;background-color:#f9f9f9;border-radius:12px;box-shadow:0 4px 8px #0000001a}.cupo-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:700;color:#3f51b5;text-align:center;margin-bottom:1.5rem;border-bottom:2px solid #ddd;padding-bottom:.5rem}.p-table[_ngcontent-%COMP%]{width:100%;border-radius:8px;overflow:hidden;font-size:.95rem;box-shadow:0 4px 8px #0000001a}.p-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#3f51b5;color:#fff;padding:12px;text-align:center;font-weight:700}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{transition:background-color .3s}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f7f7f7}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#e0f7fa}.p-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:10px;text-align:center;vertical-align:middle}.p-button-info[_ngcontent-%COMP%]{background-color:#3f51b5!important;color:#fff!important;width:2.5rem;height:2.5rem;border-radius:50%;transition:background-color .3s ease}.p-button-info[_ngcontent-%COMP%]:hover{background-color:#2c3e9e!important}.p-button-success[_ngcontent-%COMP%]{background-color:#4caf50!important;color:#fff!important;width:2.5rem;height:2.5rem;border-radius:50%;transition:background-color .3s ease}.p-button-success[_ngcontent-%COMP%]:hover{background-color:#388e3c!important}"]})};export{f as default};