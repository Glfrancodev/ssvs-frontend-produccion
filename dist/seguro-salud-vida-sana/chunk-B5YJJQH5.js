import{a as j}from"./chunk-WIG3ZVDE.js";import{a as F}from"./chunk-3GOBKWC2.js";import{a as R}from"./chunk-GB72KSVT.js";import{a as A,b as k}from"./chunk-BNUNU2GP.js";import{B as D,f as T,k as w,l as E,n as y,u as H}from"./chunk-RDO4C5ZH.js";import"./chunk-4YRY4IP2.js";import{j as I}from"./chunk-24563CTF.js";import{h as O,j as P}from"./chunk-EALBQTKK.js";import{q as M}from"./chunk-5DWL5JJZ.js";import{$a as b,Ab as o,Bb as l,Ib as x,Jb as S,Na as a,Oa as c,_ as u,cb as v,ha as f,hb as i,ia as g,ib as n,nb as C,qb as h,rb as _}from"./chunk-3RWLLOHT.js";var B=()=>({"min-width":"50rem","max-width":"100%"});function N(r,e){r&1&&(i(0,"tr")(1,"th",4),o(2,"ID Consulta"),n(),i(3,"th",5),o(4,"Fecha Consulta"),n(),i(5,"th",6),o(6,"Motivo Consulta"),n(),i(7,"th",5),o(8,"Diagn\xF3stico"),n(),i(9,"th",5),o(10,"Nota"),n(),i(11,"th",7),o(12,"Acciones"),n()())}function V(r,e){if(r&1){let t=C();i(0,"tr")(1,"td"),o(2),n(),i(3,"td"),o(4),n(),i(5,"td"),o(6),n(),i(7,"td"),o(8),n(),i(9,"td"),o(10),n(),i(11,"td")(12,"button",8),h("click",function(){let d=f(t).$implicit,p=_();return g(p.irATratamiento(d.id))}),n()()()}if(r&2){let t=e.$implicit;a(2),l(t.id),a(2),l(t.fechaConsulta),a(2),l(t.motivoConsulta),a(2),l(t.diagnostico),a(2),l(t.nota)}}var s=class r{constructor(e,t,m,d,p){this.router=e;this.route=t;this.aseguradoService=m;this.consultaService=d;this.tratamientoService=p}asegurado=null;consultas=[];ngOnInit(){this.route.paramMap.subscribe(e=>{let t=Number(e.get("aseguradoId"));t&&this.obtenerAsegurado(t)})}obtenerAsegurado(e){this.aseguradoService.getAseguradoById(e).subscribe(t=>{this.asegurado=t,t.historiaClinica&&t.historiaClinica.id&&this.obtenerConsultas(t.historiaClinica.id)},t=>{console.error("Error al obtener el asegurado:",t)})}obtenerConsultas(e){this.consultaService.getConsultasPorHistoriaClinicaId(e).subscribe(t=>{this.consultas=t,this.verificarTratamientos()},t=>{console.error("Error al obtener las consultas:",t)})}verificarTratamientos(){this.consultas.forEach(e=>{e.id!==void 0?this.tratamientoService.getTratamientoByConsultaId(e.id).subscribe(t=>{e.tieneTratamiento=!!t},t=>{e.tieneTratamiento=!1}):e.tieneTratamiento=!1})}irATratamiento(e){this.router.navigate(["/tratamiento",e])}static \u0275fac=function(t){return new(t||r)(c(P),c(O),c(R),c(F),c(j))};static \u0275cmp=u({type:r,selectors:[["app-historia-clinica"]],standalone:!0,features:[x],decls:6,vars:3,consts:[[1,"historia-clinica-container"],["dataKey","id",3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[2,"width","15%"],[2,"width","20%"],[2,"width","25%"],[2,"width","10%"],["pButton","","type","button","icon","pi pi-arrow-right",1,"p-button-rounded","p-button-text","p-button-info",3,"click"]],template:function(t,m){t&1&&(i(0,"div",0)(1,"h3"),o(2,"Historia Cl\xEDnica de Usuario"),n(),i(3,"p-table",1),b(4,N,13,0,"ng-template",2)(5,V,13,5,"ng-template",3),n()()),t&2&&(a(3),v("value",m.consultas)("tableStyle",S(2,B)))},dependencies:[M,D,H,T,I,y,E,w,k,A],styles:[".historia-clinica-container[_ngcontent-%COMP%]{max-width:100%;margin:auto;padding:1.5rem;background-color:#f9f9f9;border-radius:12px;box-shadow:0 4px 8px #0000001a}.historia-clinica-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:700;color:#3f51b5;text-align:center;margin-bottom:1.5rem;border-bottom:2px solid #ddd;padding-bottom:.5rem}.p-table[_ngcontent-%COMP%]{width:100%;border-radius:8px;overflow:hidden;font-size:.95rem;box-shadow:0 4px 8px #0000001a}.p-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#3f51b5;color:#fff;padding:12px;text-align:center;font-weight:700}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{transition:background-color .3s}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f7f7f7}.p-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#e0f7fa}.p-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:10px;text-align:center;vertical-align:middle}.p-button-info[_ngcontent-%COMP%]{background-color:#3f51b5!important;color:#fff!important;width:2.5rem;height:2.5rem;border-radius:50%;transition:background-color .3s ease}.p-button-info[_ngcontent-%COMP%]:hover{background-color:#2c3e9e!important}"]})};export{s as default};