import{a as W}from"./chunk-WWMQPBNN.js";import{a as k}from"./chunk-J46H7NZA.js";import{i as $,j,k as U,l as N,o as C}from"./chunk-XYYWSSR3.js";import{l as R,m as D,r as P}from"./chunk-Y5VG4NV3.js";import{Eb as S,Ga as z,Gb as O,Ja as u,Ka as x,M as G,W as h,Xa as w,_a as g,ab as E,da as b,db as e,ea as f,eb as t,fa as c,fb as s,g as I,ga as d,jb as _,mb as m,nb as p,wb as o,yb as F}from"./chunk-VM3UWR7T.js";import"./chunk-ODN5LVDJ.js";var y=class r{sidebarOpen=new I(!1);sidebarOpen$=this.sidebarOpen.asObservable();toggleSidebar(){this.sidebarOpen.next(!this.sidebarOpen.value)}static \u0275fac=function(i){return new(i||r)};static \u0275prov=G({token:r,factory:r.\u0275fac,providedIn:"root"})};var L=class r{constructor(a,i,l,n){this.authService=a;this.router=i;this.sidebarService=l;this.bitacoraService=n}toggleSidebar(){this.sidebarService.toggleSidebar()}logout(){this.bitacoraService.getUserIP().subscribe({next:a=>{let i=new Date,l=`${i.getFullYear()}-${(i.getMonth()+1).toString().padStart(2,"0")}-${i.getDate().toString().padStart(2,"0")}`,n=`${i.getHours().toString().padStart(2,"0")}:${i.getMinutes().toString().padStart(2,"0")}:${i.getSeconds().toString().padStart(2,"0")}`,v={correo:this.authService.getAuthenticatedUserEmail()||"",fecha:l,hora:n,ip:a.ip,accion:"Cierre de sesi\xF3n",detalle:"El usuario cerr\xF3 sesi\xF3n en la plataforma"};this.bitacoraService.createBitacora(v).subscribe({next:()=>console.log("Bit\xE1cora de cierre de sesi\xF3n registrada con \xE9xito"),error:H=>console.error("Error al registrar en la bit\xE1cora",H)}),this.authService.logout(),this.router.navigate(["/login"])},error:a=>console.error("Error al obtener IP",a)})}static \u0275fac=function(i){return new(i||r)(x(C),x(j),x(y),x(k))};static \u0275cmp=h({type:r,selectors:[["app-header"]],standalone:!0,features:[S],decls:30,vars:0,consts:[[1,"flex","flex-col-reverse","justify-between","gap-6","md:flex-row","md:items-center"],[1,"capitalize"],["aria-label","breadcrumb",1,"w-max"],[1,"flex","flex-wrap","items-center","w-full","bg-opacity-60","rounded-md","bg-transparent","p-0","transition-all"],[1,"flex","items-center","text-blue-gray-900","antialiased","font-sans","text-sm","font-normal","leading-normal","cursor-pointer","transition-colors","duration-300","hover:text-light-blue-500"],["href","#"],[1,"block","antialiased","font-sans","text-sm","leading-normal","text-blue-900","font-normal","opacity-50","transition-all","hover:text-blue-500","hover:opacity-100"],[1,"text-gray-500","text-sm","antialiased","font-sans","font-normal","leading-normal","mx-2","pointer-events-none","select-none"],[1,"flex","items-center","text-blue-900","antialiased","font-sans","text-sm","font-normal","leading-normal","cursor-pointer","transition-colors","duration-300","hover:text-blue-500"],[1,"block","antialiased","font-sans","text-sm","leading-normal","text-blue-gray-900","font-normal"],[1,"block","antialiased","tracking-normal","font-sans","text-base","font-semibold","leading-relaxed","text-gray-900"],[1,"flex","items-center"],[1,"mr-auto","md:mr-4","md:w-56"],[1,"relative","w-full","min-w-[200px]","h-10"],["placeholder"," ",1,"peer","w-full","h-full","bg-transparent","text-gray-700","font-sans","font-normal","outline","outline-0","focus:outline-0","disabled:bg-blue-gray-50","disabled:border-0","transition-all","placeholder-shown:border","placeholder-shown:border-blue-gray-200","placeholder-shown:border-t-blue-gray-200","border","focus:border-2","border-t-transparent","focus:border-t-transparent","text-sm","px-3","py-2.5","rounded-[7px]","border-blue-gray-200","focus:border-blue-500"],[1,"flex","w-full","h-full","select-none","pointer-events-none","absolute","left-0","font-normal","peer-placeholder-shown:text-gray-500","leading-tight","peer-focus:leading-tight","peer-disabled:text-transparent","peer-disabled:peer-placeholder-shown:text-blue-gray-500","transition-all","-top-1.5","peer-placeholder-shown:text-sm","text-[11px]","peer-focus:text-[11px]","before:content['","']","before:block","before:box-border","before:w-2.5","before:h-1.5","before:mt-[6.5px]","before:mr-1","peer-placeholder-shown:before:border-transparent","before:rounded-tl-md","before:border-t","peer-focus:before:border-t-2","before:border-l","peer-focus:before:border-l-2","before:pointer-events-none","before:transition-all","peer-disabled:before:border-transparent","after:content['","']","after:block","after:flex-grow","after:box-border","after:w-2.5","after:h-1.5","after:mt-[6.5px]","after:ml-1","peer-placeholder-shown:after:border-transparent","after:rounded-tr-md","after:border-t","peer-focus:after:border-t-2","after:border-r","peer-focus:after:border-r-2","after:pointer-events-none","after:transition-all","peer-disabled:after:border-transparent","peer-placeholder-shown:leading-[3.75]","text-blue-gray-400","peer-focus:text-blue-500","before:border-blue-gray-200","peer-focus:before:border-blue-500","after:border-blue-gray-200","peer-focus:after:border-blue-500"],["type","button",1,"relative","middle","none","font-sans","font-medium","text-center","uppercase","transition-all","disabled:opacity-50","disabled:shadow-none","disabled:pointer-events-none","w-10","max-w-[40px]","h-10","max-h-[40px]","rounded-lg","text-xs","text-gray-500","hover:bg-blue-gray-500/10","active:bg-blue-gray-500/30","grid","xl:hidden",3,"click"],[1,"absolute","top-1/2","left-1/2","transform","-translate-y-1/2","-translate-x-1/2"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","aria-hidden","true","stroke-width","3",1,"h-6","w-6","text-blue-gray-500"],["fill-rule","evenodd","d","M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z","clip-rule","evenodd"],["type","button",1,"relative","middle","none","font-sans","font-medium","text-center","uppercase","transition-all","disabled:opacity-50","disabled:shadow-none","disabled:pointer-events-none","w-10","max-w-[40px]","h-10","max-h-[40px]","rounded-lg","text-xs","text-gray-500","hover:bg-blue-gray-500/10","active:bg-blue-gray-500/30","grid",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","aria-hidden","true",1,"h-6","w-6","text-blue-gray-500"],["d","M16.09 7.46a.75.75 0 00-1.18-.88l-4.53 5.6a.75.75 0 000 .88l4.53 5.6a.75.75 0 001.18-.88L12.96 13h7.29a.75.75 0 000-1.5h-7.29l3.13-3.88zM11 4.25a.75.75 0 00-1.5 0v15.5a.75.75 0 001.5 0V4.25z"]],template:function(i,l){i&1&&(e(0,"div",0)(1,"div",1)(2,"nav",2)(3,"ol",3)(4,"li",4)(5,"a",5)(6,"p",6),o(7,"dashboard"),t()(),e(8,"span",7),o(9,"/"),t()(),e(10,"li",8)(11,"p",9),o(12,"home"),t()()()(),e(13,"h6",10),o(14,"home"),t()(),e(15,"div",11)(16,"div",12)(17,"div",13),s(18,"input",14),e(19,"label",15),o(20,"Type here"),t()()(),e(21,"button",16),m("click",function(){return l.toggleSidebar()}),e(22,"span",17),c(),e(23,"svg",18),s(24,"path",19),t()()(),d(),e(25,"a")(26,"button",20),m("click",function(){return l.logout()}),e(27,"span",17),c(),e(28,"svg",21),s(29,"path",22),t()()()()()())}})};var X=r=>["/atencion",r];function Z(r,a){if(r&1){let i=_();e(0,"ul",21)(1,"li")(2,"a",22)(3,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarUsuarios())}),c(),e(4,"svg",8),s(5,"path",24),t(),d(),e(6,"p",11),o(7,"usuario"),t()()()(),e(8,"li")(9,"a",25)(10,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarAsegurados())}),c(),e(11,"svg",8),s(12,"path",24),t(),d(),e(13,"p",11),o(14,"asegurado"),t()()()(),e(15,"li")(16,"a",26)(17,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarRoles())}),c(),e(18,"svg",8),s(19,"path",24),t(),d(),e(20,"p",11),o(21,"rol"),t()()()(),e(22,"li")(23,"a",27)(24,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarPermisos())}),c(),e(25,"svg",8),s(26,"path",24),t(),d(),e(27,"p",11),o(28,"permiso"),t()()()(),e(29,"li")(30,"a",28)(31,"button",7),c(),e(32,"svg",8),s(33,"path",24),t(),d(),e(34,"p",11),o(35,"asignar Permiso"),t()()()(),e(36,"li")(37,"a",29)(38,"button",7),c(),e(39,"svg",8),s(40,"path",24),t(),d(),e(41,"p",11),o(42,"bitacora"),t()()()()()}}function ee(r,a){if(r&1){let i=_();e(0,"li")(1,"button",13),m("click",function(){b(i);let n=p();return f(n.toggleMenu("gestionUsuario"))}),e(2,"div",14),c(),e(3,"svg",15),s(4,"path",16),t(),d(),e(5,"span",17),o(6,"Gesti\xF3n de usuario"),t()(),c(),e(7,"svg",18),s(8,"path",19),t()(),w(9,Z,43,0,"ul",20),t()}if(r&2){let i=p();u(7),E("transform",i.expandedMenus.gestionUsuario?"rotate-180":""),u(2),g("ngIf",i.expandedMenus.gestionUsuario)}}function te(r,a){if(r&1){let i=_();e(0,"ul",21)(1,"li")(2,"a",30)(3,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarMedicos())}),c(),e(4,"svg",8),s(5,"path",24),t(),d(),e(6,"p",11),o(7,"medico"),t()()()(),e(8,"li")(9,"a",31)(10,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarEspecialidades())}),c(),e(11,"svg",8),s(12,"path",24),t(),d(),e(13,"p",11),o(14,"especialidad"),t()()()(),e(15,"li")(16,"a",32)(17,"button",7),c(),e(18,"svg",8),s(19,"path",24),t(),d(),e(20,"p",11),o(21,"asignar Medico"),t()()()(),e(22,"li")(23,"a",33)(24,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarHorarios())}),c(),e(25,"svg",8),s(26,"path",24),t(),d(),e(27,"p",11),o(28,"horario"),t()()()(),e(29,"li")(30,"a",34)(31,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarPermisosAusencia())}),c(),e(32,"svg",8),s(33,"path",24),t(),d(),e(34,"p",11),o(35,"permiso Ausencia"),t()()()(),e(36,"li")(37,"a",35)(38,"button",23),m("click",function(){b(i);let n=p(2);return f(n.listarCupos())}),c(),e(39,"svg",8),s(40,"path",24),t(),d(),e(41,"p",11),o(42,"cupo"),t()()()()()}}function ie(r,a){if(r&1){let i=_();e(0,"li")(1,"button",13),m("click",function(){b(i);let n=p();return f(n.toggleMenu("gestionMedico"))}),e(2,"div",14),c(),e(3,"svg",15),s(4,"path",16),t(),d(),e(5,"span",17),o(6,"Gesti\xF3n de M\xE9dico"),t()(),c(),e(7,"svg",18),s(8,"path",19),t()(),w(9,te,43,0,"ul",20),t()}if(r&2){let i=p();u(7),E("transform",i.expandedMenus.gestionMedico?"rotate-180":""),u(2),g("ngIf",i.expandedMenus.gestionMedico)}}function re(r,a){if(r&1){let i=_();e(0,"li")(1,"a",37),m("click",function(){let n=b(i).$implicit,v=p(3);return f(v.listarHorariosEspecialidad(n.nombre))}),e(2,"button",38)(3,"span",11),o(4),t()()()()}if(r&2){let i=a.$implicit;u(),g("routerLink",O(2,X,i.nombre)),u(3),F(" ",i.nombre," ")}}function ne(r,a){if(r&1&&(e(0,"ul",21),w(1,re,5,4,"li",36),t()),r&2){let i=p(2);u(),g("ngForOf",i.especialidades)}}function ae(r,a){if(r&1){let i=_();e(0,"li")(1,"button",13),m("click",function(){b(i);let n=p();return f(n.toggleMenu("gestionAtencion"))}),e(2,"div",14),c(),e(3,"svg",15),s(4,"path",16),t(),d(),e(5,"span",17),o(6,"Atenciones"),t()(),c(),e(7,"svg",18),s(8,"path",19),t()(),w(9,ne,2,1,"ul",20),t()}if(r&2){let i=p();u(7),E("transform",i.expandedMenus.gestionAtencion?"rotate-180":""),u(2),g("ngIf",i.expandedMenus.gestionAtencion)}}function oe(r,a){r&1&&(e(0,"li")(1,"a",39)(2,"button",7),c(),e(3,"svg",8),s(4,"path",9)(5,"path",10),t(),d(),e(6,"p",11),o(7,"reserva"),t()()()())}function le(r,a){r&1&&(e(0,"li")(1,"a",40)(2,"button",7),c(),e(3,"svg",8),s(4,"path",9)(5,"path",10),t(),d(),e(6,"p",11),o(7,"mis reservas"),t()()()())}function se(r,a){r&1&&(e(0,"li")(1,"a",41)(2,"button",7),c(),e(3,"svg",8),s(4,"path",9)(5,"path",10),t(),d(),e(6,"p",11),o(7,"mi historia clinica"),t()()()())}var V=class r{constructor(a,i,l,n){this.sidebarService=a;this.authService=i;this.medicoService=l;this.bitacoraService=n;this.sidebarService.sidebarOpen$.subscribe(v=>{this.isSidebarOpen=v})}isSidebarOpen=!0;expandedMenus={gestionUsuario:!1};userRole=null;especialidades=[];ngOnInit(){this.checkScreenSize(),this.userRole=this.authService.getUserRole();let a=this.authService.getAuthenticatedUserEmail();a?this.medicoService.getEspecialidadesDelMedico(a).subscribe(i=>{this.especialidades=i}):console.error("El correo del m\xE9dico autenticado es nulo")}checkScreenSize(){window.innerWidth>=1280?this.isSidebarOpen=!0:this.isSidebarOpen=!1}toggleMenu(a){this.expandedMenus[a]?this.expandedMenus[a]=!1:(Object.keys(this.expandedMenus).forEach(i=>{this.expandedMenus[i]=!1}),this.expandedMenus[a]=!0)}registrarBitacora(a,i){this.bitacoraService.getUserIP().subscribe({next:l=>{let n=new Date,v=`${n.getFullYear()}-${(n.getMonth()+1).toString().padStart(2,"0")}-${n.getDate().toString().padStart(2,"0")}`,H=`${n.getHours().toString().padStart(2,"0")}:${n.getMinutes().toString().padStart(2,"0")}:${n.getSeconds().toString().padStart(2,"0")}`,q={correo:this.authService.getAuthenticatedUserEmail()||"",fecha:v,hora:H,ip:l.ip,accion:a,detalle:i};this.bitacoraService.createBitacora(q).subscribe({next:()=>console.log("Registro de bit\xE1cora exitoso"),error:J=>console.error("Error al registrar en bit\xE1cora",J)})},error:l=>console.error("Error al obtener IP",l)})}listarUsuarios(){this.registrarBitacora("Listar usuarios","El usuario accedi\xF3 a la lista de usuarios")}listarAsegurados(){this.registrarBitacora("Listar asegurados","El usuario accedi\xF3 a la lista de asegurados")}listarRoles(){this.registrarBitacora("Listar roles","El usuario accedi\xF3 a la lista de roles")}listarPermisos(){this.registrarBitacora("Listar permisos","El usuario accedi\xF3 a la lista de permisos")}listarMedicos(){this.registrarBitacora("Listar medicos","El usuario accedi\xF3 a la lista de m\xE9dicos")}listarEspecialidades(){this.registrarBitacora("Listar especialidades","El usuario accedi\xF3 a la lista de especialidades")}listarHorarios(){this.registrarBitacora("Listar horarios","El usuario accedi\xF3 a la lista de horarios")}listarPermisosAusencia(){this.registrarBitacora("Listar permisos ausencia","El usuario accedi\xF3 a la lista de permisos de ausencia")}listarCupos(){this.registrarBitacora("Listar cupos","El usuario accedi\xF3 a la lista de cupos")}listarHorariosEspecialidad(a){this.registrarBitacora("Listar horarios",`Listar sus horarios de ${a}`)}static \u0275fac=function(i){return new(i||r)(x(y),x(C),x(W),x(k))};static \u0275cmp=h({type:r,selectors:[["app-sidebar"]],hostBindings:function(i,l){i&1&&m("resize",function(){return l.checkScreenSize()},!1,z)},standalone:!0,features:[S],decls:21,vars:8,consts:[[1,"bg-gradient-to-br","from-gray-800","to-gray-900","fixed","inset-0","z-50","my-4","ml-4","h-[calc(100vh-32px)]","w-72","rounded-xl","transition-transform","duration-300"],[1,"relative","border-b","border-white/20"],["href","#/",1,"flex","items-center","gap-4","py-6","px-8"],[1,"block","antialiased","tracking-normal","font-sans","text-base","font-semibold","leading-relaxed","text-white"],[1,"m-4"],[1,"mb-4","flex","flex-col","gap-1"],["routerLink","/dashboard"],["routerLinkActive","bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]","type","button",1,"middle","none","font-sans","font-bold","center","transition-all","disabled:opacity-50","disabled:shadow-none","disabled:pointer-events-none","text-xs","py-3","rounded-lg","text-white","hover:bg-white/10","active:bg-white/30","flex","w-full","items-center","gap-4","px-4","capitalize"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","aria-hidden","true",1,"w-5","h-5","text-inherit"],["d","M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"],["d","M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"],[1,"block","antialiased","font-sans","text-base","leading-relaxed","text-inherit","font-medium","capitalize"],[4,"ngIf"],[1,"w-full","flex","items-center","justify-between","text-white","py-3","px-4","rounded-lg","hover:bg-white/10",3,"click"],[1,"flex","items-center","gap-4"],["xmlns","http://www.w3.org/2000/svg","fill","currentColor","viewBox","0 0 24 24",1,"w-5","h-5","text-inherit"],["d","M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"],[1,"font-medium","capitalize"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-4","h-4","transition-transform"],["fill-rule","evenodd","d","M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z","clip-rule","evenodd"],["class","pl-8 mt-2 space-y-2",4,"ngIf"],[1,"pl-8","mt-2","space-y-2"],["routerLink","/usuario"],["routerLinkActive","bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]","type","button",1,"middle","none","font-sans","font-bold","center","transition-all","disabled:opacity-50","disabled:shadow-none","disabled:pointer-events-none","text-xs","py-3","rounded-lg","text-white","hover:bg-white/10","active:bg-white/30","flex","w-full","items-center","gap-4","px-4","capitalize",3,"click"],["fill-rule","evenodd","d","M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z","clip-rule","evenodd"],["routerLink","/asegurado"],["routerLink","/rol"],["routerLink","/permiso"],["routerLink","/rol-permiso"],["routerLink","/bitacora"],["routerLink","/medico"],["routerLink","/especialidad"],["routerLink","/asignar-medico"],["routerLink","/horario"],["routerLink","/permiso-ausencia"],["routerLink","/cupo"],[4,"ngFor","ngForOf"],[3,"click","routerLink"],["type","button",1,"middle","none","font-sans","font-bold","center","transition-all","text-xs","py-3","rounded-lg","text-white","hover:bg-white/10","flex","w-full","items-center","gap-4","px-4","capitalize"],["routerLink","/reserva"],["routerLink","/mis-reservas"],["routerLink","/mi-historia-clinica"]],template:function(i,l){i&1&&(e(0,"aside",0)(1,"div",1)(2,"a",2)(3,"h6",3),o(4,"Seguro de Salud Vida Sana"),t()()(),e(5,"div",4)(6,"ul",5)(7,"li")(8,"a",6)(9,"button",7),c(),e(10,"svg",8),s(11,"path",9)(12,"path",10),t(),d(),e(13,"p",11),o(14,"dashboard"),t()()()(),w(15,ee,10,3,"li",12)(16,ie,10,3,"li",12)(17,ae,10,3,"li",12)(18,oe,8,0,"li",12)(19,le,8,0,"li",12)(20,se,8,0,"li",12),t()()()),i&2&&(E("-translate-x-full",!l.isSidebarOpen),u(15),g("ngIf",l.userRole=="SuperUsuario"),u(),g("ngIf",l.userRole=="SuperUsuario"),u(),g("ngIf",l.userRole=="Medico"),u(),g("ngIf",l.userRole=="Asegurado"),u(),g("ngIf",l.userRole=="Asegurado"),u(),g("ngIf",l.userRole=="Asegurado"))},dependencies:[U,N,P,R,D]})};var T=class r{static \u0275fac=function(i){return new(i||r)};static \u0275cmp=h({type:r,selectors:[["app-footer"]],standalone:!0,features:[S],decls:23,vars:0,consts:[[1,"py-2"],[1,"flex","w-full","flex-wrap","items-center","justify-center","gap-6","px-2","md:justify-between"],[1,"block","antialiased","font-sans","text-sm","leading-normal","font-normal","text-inherit"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","aria-hidden","true",1,"-mt-0.5","inline-block","h-3.5","w-3.5"],["d","M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"],["href","https://www.creative-tim.com","target","_blank",1,"transition-colors","hover:text-blue-500"],[1,"flex","items-center","gap-4"],["href","https://www.creative-tim.com","target","_blank",1,"block","antialiased","font-sans","text-sm","leading-normal","py-0.5","px-1","font-normal","text-inherit","transition-colors","hover:text-blue-500"],["href","https://www.creative-tim.com/presentation","target","_blank",1,"block","antialiased","font-sans","text-sm","leading-normal","py-0.5","px-1","font-normal","text-inherit","transition-colors","hover:text-blue-500"],["href","https://www.creative-tim.com/blog","target","_blank",1,"block","antialiased","font-sans","text-sm","leading-normal","py-0.5","px-1","font-normal","text-inherit","transition-colors","hover:text-blue-500"],["href","https://www.creative-tim.com/license","target","_blank",1,"block","antialiased","font-sans","text-sm","leading-normal","py-0.5","px-1","font-normal","text-inherit","transition-colors","hover:text-blue-500"]],template:function(i,l){i&1&&(e(0,"footer",0)(1,"div",1)(2,"p",2),o(3,"\xA9 2023, made with "),c(),e(4,"svg",3),s(5,"path",4),t(),o(6," by "),d(),e(7,"a",5),o(8,"Creative Tim"),t(),o(9," for a better web. "),t(),e(10,"ul",6)(11,"li")(12,"a",7),o(13,"Creative Tim"),t()(),e(14,"li")(15,"a",8),o(16,"About Us"),t()(),e(17,"li")(18,"a",9),o(19,"Blog"),t()(),e(20,"li")(21,"a",10),o(22,"License"),t()()()()())}})};var A=class r{static \u0275fac=function(i){return new(i||r)};static \u0275cmp=h({type:r,selectors:[["app-layout"]],standalone:!0,features:[S],decls:9,vars:0,consts:[[1,"min-h-screen","bg-gray-50/50"],[1,"p-4","xl:ml-80"],[1,"block","w-full","max-w-full","bg-transparent","text-white","shadow-none","rounded-xl","transition-all","px-0","py-1"],[1,"mt-12"],[1,"text-blue-gray-600"]],template:function(i,l){i&1&&(e(0,"div",0),s(1,"app-sidebar"),e(2,"div",1)(3,"nav",2),s(4,"app-header"),t(),e(5,"div",3),s(6,"router-outlet"),t(),e(7,"div",4),s(8,"app-footer"),t()()())},dependencies:[L,V,T,$]})};export{A as default};