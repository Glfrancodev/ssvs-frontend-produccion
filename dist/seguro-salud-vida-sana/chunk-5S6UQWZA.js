import{a as Z}from"./chunk-3MQHXZD4.js";import{a as N}from"./chunk-7GE6MY6T.js";import{a as A}from"./chunk-JQIAP6UG.js";import{H as X}from"./chunk-F5T2E34X.js";import{a as W,b as Y,i as q,j as J,k as K,l as Q,o as y}from"./chunk-RO5PIZCY.js";import"./chunk-4YRY4IP2.js";import{l as V,m as H,r as I}from"./chunk-2HP4KZBQ.js";import{$a as g,Fb as w,Ha as U,Hb as R,Ka as m,La as h,N as L,S as T,X as _,Ya as v,bb as C,ea as f,eb as e,fa as b,fb as i,g as $,ga as c,gb as l,ha as d,kb as x,nb as u,ob as p,xb as o,yb as G,zb as D}from"./chunk-TOSOZOFE.js";import"./chunk-ODN5LVDJ.js";var E=class n{sidebarOpen=new $(!1);sidebarOpen$=this.sidebarOpen.asObservable();toggleSidebar(){this.sidebarOpen.next(!this.sidebarOpen.value)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=L({token:n,factory:n.\u0275fac,providedIn:"root"})};var O=class n{constructor(r,t,s){this.http=r;this.authService=t;this.aseguradoService=s}apiUrl="https://ssvs-backend-produccion-production.up.railway.app/api/notificacion";getAuthHeaders(){return new W({"Content-Type":"application/json",Authorization:`Bearer ${this.authService.getToken()}`})}obtenerNotificacionesPorAseguradoId(r){let t=`${this.apiUrl}/asegurado/${r}`;return this.http.get(t,{headers:this.getAuthHeaders()})}obtenerNotificacionesNoLeidas(r){let t=`${this.apiUrl}/asegurado/${r}/no-leidas`;return this.http.get(t,{headers:this.getAuthHeaders()})}marcarTodasComoLeidas(r){let t=`${this.apiUrl}/asegurado/${r}/marcar-leidas`;return this.http.patch(t,{},{headers:this.getAuthHeaders()})}static \u0275fac=function(t){return new(t||n)(T(Y),T(y),T(N))};static \u0275prov=L({token:n,factory:n.\u0275fac,providedIn:"root"})};function le(n,r){if(n&1&&(e(0,"span",27),o(1),i()),n&2){let t=p();m(),G(t.contadorNoLeidas)}}function ce(n,r){if(n&1&&(e(0,"li")(1,"span"),o(2),i()()),n&2){let t=r.$implicit;m(),C("leido",t.leido),m(),G(t.descripcion)}}function de(n,r){if(n&1){let t=x();e(0,"div",28)(1,"div",29)(2,"span"),o(3,"Notificaciones"),i(),e(4,"button",30),u("click",function(){f(t);let a=p();return b(a.marcarTodasComoLeidas())}),o(5,"Marcar todas como le\xEDdas"),i()(),e(6,"ul"),v(7,ce,3,3,"li",31),i()()}if(n&2){let t=p();m(7),g("ngForOf",t.notificaciones)}}var B=class n{constructor(r,t,s,a,S,M){this.authService=r;this.router=t;this.sidebarService=s;this.bitacoraService=a;this.notificacionService=S;this.aseguradoService=M}notificaciones=[];mostrarNotificaciones=!1;aseguradoId=null;ngOnInit(){this.obtenerAseguradoId()}obtenerAseguradoId(){let r=this.authService.getAuthenticatedUserEmail();r&&this.aseguradoService.getAseguradoPorCorreo(r).subscribe({next:t=>{t&&t.id!==void 0?(this.aseguradoId=t.id,this.cargarNotificaciones()):(console.error("El asegurado no tiene un ID v\xE1lido."),this.aseguradoId=null)},error:t=>console.error("Error al obtener el asegurado:",t)})}contadorNoLeidas=0;cargarNotificaciones(){this.aseguradoId&&this.notificacionService.obtenerNotificacionesPorAseguradoId(this.aseguradoId).subscribe({next:r=>{this.notificaciones=r,this.contadorNoLeidas=this.notificaciones.filter(t=>!t.leido).length},error:r=>console.error("Error al cargar las notificaciones:",r)})}marcarTodasComoLeidas(){this.aseguradoId&&this.notificacionService.marcarTodasComoLeidas(this.aseguradoId).subscribe({next:()=>{this.notificaciones.forEach(r=>r.leido=!0),this.contadorNoLeidas=0},error:r=>console.error("Error al marcar todas como le\xEDdas:",r)})}toggleNotificaciones(){this.mostrarNotificaciones=!this.mostrarNotificaciones}toggleSidebar(){this.sidebarService.toggleSidebar()}logout(){this.bitacoraService.getUserIP().subscribe({next:r=>{let t=new Date,s=`${t.getFullYear()}-${(t.getMonth()+1).toString().padStart(2,"0")}-${t.getDate().toString().padStart(2,"0")}`,a=`${t.getHours().toString().padStart(2,"0")}:${t.getMinutes().toString().padStart(2,"0")}:${t.getSeconds().toString().padStart(2,"0")}`,S={correo:this.authService.getAuthenticatedUserEmail()||"",fecha:s,hora:a,ip:r.ip,accion:"Cierre de sesi\xF3n",detalle:"El usuario cerr\xF3 sesi\xF3n en la plataforma"};this.bitacoraService.createBitacora(S).subscribe({next:()=>console.log("Bit\xE1cora de cierre de sesi\xF3n registrada con \xE9xito"),error:M=>console.error("Error al registrar en la bit\xE1cora",M)}),this.authService.logout(),this.router.navigate(["/login"])},error:r=>console.error("Error al obtener IP",r)})}static \u0275fac=function(t){return new(t||n)(h(y),h(J),h(E),h(A),h(O),h(N))};static \u0275cmp=_({type:n,selectors:[["app-header"]],standalone:!0,features:[w],decls:37,vars:2,consts:[[1,"flex","flex-col-reverse","justify-between","gap-6","md:flex-row","md:items-center","relative"],[1,"capitalize"],["aria-label","breadcrumb",1,"w-max"],[1,"flex","flex-wrap","items-center","w-full","bg-opacity-60","rounded-md","bg-transparent","p-0","transition-all"],[1,"flex","items-center","text-blue-gray-900","antialiased","font-sans","text-sm","font-normal","leading-normal","cursor-pointer","transition-colors","duration-300","hover:text-light-blue-500"],["href","#"],[1,"block","antialiased","font-sans","text-sm","leading-normal","text-blue-900","font-normal","opacity-50","transition-all","hover:text-blue-500","hover:opacity-100"],[1,"text-gray-500","text-sm","antialiased","font-sans","font-normal","leading-normal","mx-2","pointer-events-none","select-none"],[1,"flex","items-center","text-blue-900","antialiased","font-sans","text-sm","font-normal","leading-normal","cursor-pointer","transition-colors","duration-300","hover:text-blue-500"],[1,"block","antialiased","font-sans","text-sm","leading-normal","text-blue-gray-900","font-normal"],[1,"block","antialiased","tracking-normal","font-sans","text-base","font-semibold","leading-relaxed","text-gray-900"],[1,"flex","items-center"],[1,"mr-auto","md:mr-4","md:w-56"],[1,"relative","w-full","min-w-[200px]","h-10"],["placeholder"," ",1,"peer","w-full","h-full","bg-transparent","text-gray-700","font-sans","font-normal","outline","outline-0","focus:outline-0","disabled:bg-blue-gray-50","disabled:border-0","transition-all","placeholder-shown:border","placeholder-shown:border-blue-gray-200","placeholder-shown:border-t-blue-gray-200","border","focus:border-2","border-t-transparent","focus:border-t-transparent","text-sm","px-3","py-2.5","rounded-[7px]","border-blue-gray-200","focus:border-blue-500"],[1,"flex","w-full","h-full","select-none","pointer-events-none","absolute","left-0","font-normal","peer-placeholder-shown:text-gray-500","leading-tight","peer-focus:leading-tight","peer-disabled:text-transparent","peer-disabled:peer-placeholder-shown:text-blue-gray-500","transition-all","-top-1.5","peer-placeholder-shown:text-sm","text-[11px]","peer-focus:text-[11px]","before:content['","']","before:block","before:box-border","before:w-2.5","before:h-1.5","before:mt-[6.5px]","before:mr-1","peer-placeholder-shown:before:border-transparent","before:rounded-tl-md","before:border-t","peer-focus:before:border-t-2","before:border-l","peer-focus:before:border-l-2","before:pointer-events-none","before:transition-all","peer-disabled:before:border-transparent","after:content['","']","after:block","after:flex-grow","after:box-border","after:w-2.5","after:h-1.5","after:mt-[6.5px]","after:ml-1","peer-placeholder-shown:after:border-transparent","after:rounded-tr-md","after:border-t","peer-focus:after:border-t-2","after:border-r","peer-focus:after:border-r-2","after:pointer-events-none","after:transition-all","peer-disabled:after:border-transparent","peer-placeholder-shown:leading-[3.75]","text-blue-gray-400","peer-focus:text-blue-500","before:border-blue-gray-200","peer-focus:before:border-blue-500","after:border-blue-gray-200","peer-focus:after:border-blue-500"],[1,"flex","items-center","relative"],["type","button",1,"relative","middle","none","font-sans","font-medium","text-center","uppercase","transition-all","disabled:opacity-50","disabled:shadow-none","disabled:pointer-events-none","w-10","max-w-[40px]","h-10","max-h-[40px]","rounded-lg","text-xs","text-gray-500","hover:bg-blue-gray-500/10","active:bg-blue-gray-500/30","grid",3,"click"],[1,"absolute","top-1/2","left-1/2","transform","-translate-y-1/2","-translate-x-1/2"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","aria-hidden","true",1,"h-6","w-6","text-blue-gray-500"],["d","M12 2a6 6 0 016 6v5h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a4.978 4.978 0 01-1.528 3.528A4.978 4.978 0 0112 22a4.978 4.978 0 01-3.528-1.472A4.978 4.978 0 017 17H6a2 2 0 01-2-2v-1a2 2 0 012-2h1V8a6 6 0 016-6zm0 2a4 4 0 00-4 4v5H6v1h12v-1h-2V8a4 4 0 00-4-4zm0 16a3 3 0 002.121-.879A2.978 2.978 0 0015 17H9a2.978 2.978 0 00.879 2.121A3 3 0 0012 20z"],["class","notificacion-badge",4,"ngIf"],["class","notificaciones-container",4,"ngIf"],["type","button",1,"relative","middle","none","font-sans","font-medium","text-center","uppercase","transition-all","disabled:opacity-50","disabled:shadow-none","disabled:pointer-events-none","w-10","max-w-[40px]","h-10","max-h-[40px]","rounded-lg","text-xs","text-gray-500","hover:bg-blue-gray-500/10","active:bg-blue-gray-500/30","grid","xl:hidden",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","aria-hidden","true","stroke-width","3",1,"h-6","w-6","text-blue-gray-500"],["fill-rule","evenodd","d","M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z","clip-rule","evenodd"],["d","M16.09 7.46a.75.75 0 00-1.18-.88l-4.53 5.6a.75.75 0 000 .88l4.53 5.6a.75.75 0 001.18-.88L12.96 13h7.29a.75.75 0 000-1.5h-7.29l3.13-3.88zM11 4.25a.75.75 0 00-1.5 0v15.5a.75.75 0 001.5 0V4.25z"],[1,"notificacion-badge"],[1,"notificaciones-container"],[1,"notificaciones-header"],[3,"click"],[4,"ngFor","ngForOf"]],template:function(t,s){t&1&&(e(0,"div",0)(1,"div",1)(2,"nav",2)(3,"ol",3)(4,"li",4)(5,"a",5)(6,"p",6),o(7,"dashboard"),i()(),e(8,"span",7),o(9,"/"),i()(),e(10,"li",8)(11,"p",9),o(12,"home"),i()()()(),e(13,"h6",10),o(14,"home"),i()(),e(15,"div",11)(16,"div",12)(17,"div",13),l(18,"input",14),e(19,"label",15),o(20,"Type here"),i()()(),e(21,"div",16)(22,"button",17),u("click",function(){return s.toggleNotificaciones()}),e(23,"span",18),c(),e(24,"svg",19),l(25,"path",20),i()(),v(26,le,2,1,"span",21),i(),v(27,de,8,1,"div",22),i(),d(),e(28,"button",23),u("click",function(){return s.toggleSidebar()}),e(29,"span",18),c(),e(30,"svg",24),l(31,"path",25),i()()(),d(),e(32,"a")(33,"button",17),u("click",function(){return s.logout()}),e(34,"span",18),c(),e(35,"svg",19),l(36,"path",26),i()()()()()()),t&2&&(m(26),g("ngIf",s.contadorNoLeidas>0),m(),g("ngIf",s.mostrarNotificaciones))},dependencies:[X,I,V,H],styles:[".notificacion-badge[_ngcontent-%COMP%]{position:absolute;top:-5px;right:-5px;background-color:#ff4757;color:#000;border-radius:50%;font-size:12px;font-weight:700;padding:4px 8px;display:flex;justify-content:center;align-items:center}.notificacion-badge[_ngcontent-%COMP%]{position:absolute;top:-5px;right:-5px;background-color:#ff4757;color:#fff;border-radius:50%;font-size:12px;font-weight:700;padding:4px 8px;display:flex;justify-content:center;align-items:center}.notificaciones-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px;color:#333}.notificaciones-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span.leido[_ngcontent-%COMP%]{color:#6c757d;text-decoration:line-through}"]})};var me=n=>["/atencion",n];function pe(n,r){if(n&1){let t=x();e(0,"ul",21)(1,"li")(2,"a",22)(3,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarUsuarios())}),c(),e(4,"svg",8),l(5,"path",24),i(),d(),e(6,"p",11),o(7,"usuario"),i()()()(),e(8,"li")(9,"a",25)(10,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarAsegurados())}),c(),e(11,"svg",8),l(12,"path",24),i(),d(),e(13,"p",11),o(14,"asegurado"),i()()()(),e(15,"li")(16,"a",26)(17,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarRoles())}),c(),e(18,"svg",8),l(19,"path",24),i(),d(),e(20,"p",11),o(21,"rol"),i()()()(),e(22,"li")(23,"a",27)(24,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarPermisos())}),c(),e(25,"svg",8),l(26,"path",24),i(),d(),e(27,"p",11),o(28,"permiso"),i()()()(),e(29,"li")(30,"a",28)(31,"button",7),c(),e(32,"svg",8),l(33,"path",24),i(),d(),e(34,"p",11),o(35,"asignar Permiso"),i()()()(),e(36,"li")(37,"a",29)(38,"button",7),c(),e(39,"svg",8),l(40,"path",24),i(),d(),e(41,"p",11),o(42,"bitacora"),i()()()()()}}function ue(n,r){if(n&1){let t=x();e(0,"li")(1,"button",13),u("click",function(){f(t);let a=p();return b(a.toggleMenu("gestionUsuario"))}),e(2,"div",14),c(),e(3,"svg",15),l(4,"path",16),i(),d(),e(5,"span",17),o(6,"Gesti\xF3n de usuario"),i()(),c(),e(7,"svg",18),l(8,"path",19),i()(),v(9,pe,43,0,"ul",20),i()}if(n&2){let t=p();m(7),C("transform",t.expandedMenus.gestionUsuario?"rotate-180":""),m(2),g("ngIf",t.expandedMenus.gestionUsuario)}}function fe(n,r){if(n&1){let t=x();e(0,"ul",21)(1,"li")(2,"a",30)(3,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarMedicos())}),c(),e(4,"svg",8),l(5,"path",24),i(),d(),e(6,"p",11),o(7,"medico"),i()()()(),e(8,"li")(9,"a",31)(10,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarEspecialidades())}),c(),e(11,"svg",8),l(12,"path",24),i(),d(),e(13,"p",11),o(14,"especialidad"),i()()()(),e(15,"li")(16,"a",32)(17,"button",7),c(),e(18,"svg",8),l(19,"path",24),i(),d(),e(20,"p",11),o(21,"asignar Medico"),i()()()(),e(22,"li")(23,"a",33)(24,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarHorarios())}),c(),e(25,"svg",8),l(26,"path",24),i(),d(),e(27,"p",11),o(28,"horario"),i()()()(),e(29,"li")(30,"a",34)(31,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarPermisosAusencia())}),c(),e(32,"svg",8),l(33,"path",24),i(),d(),e(34,"p",11),o(35,"permiso Ausencia"),i()()()(),e(36,"li")(37,"a",35)(38,"button",23),u("click",function(){f(t);let a=p(2);return b(a.listarCupos())}),c(),e(39,"svg",8),l(40,"path",24),i(),d(),e(41,"p",11),o(42,"cupo"),i()()()()()}}function be(n,r){if(n&1){let t=x();e(0,"li")(1,"button",13),u("click",function(){f(t);let a=p();return b(a.toggleMenu("gestionMedico"))}),e(2,"div",14),c(),e(3,"svg",15),l(4,"path",16),i(),d(),e(5,"span",17),o(6,"Gesti\xF3n de M\xE9dico"),i()(),c(),e(7,"svg",18),l(8,"path",19),i()(),v(9,fe,43,0,"ul",20),i()}if(n&2){let t=p();m(7),C("transform",t.expandedMenus.gestionMedico?"rotate-180":""),m(2),g("ngIf",t.expandedMenus.gestionMedico)}}function ge(n,r){if(n&1){let t=x();e(0,"li")(1,"a",37),u("click",function(){let a=f(t).$implicit,S=p(3);return b(S.listarHorariosEspecialidad(a.nombre))}),e(2,"button",38)(3,"span",11),o(4),i()()()()}if(n&2){let t=r.$implicit;m(),g("routerLink",R(2,me,t.nombre)),m(3),D(" ",t.nombre," ")}}function he(n,r){if(n&1&&(e(0,"ul",21),v(1,ge,5,4,"li",36),i()),n&2){let t=p(2);m(),g("ngForOf",t.especialidades)}}function ve(n,r){if(n&1){let t=x();e(0,"li")(1,"button",13),u("click",function(){f(t);let a=p();return b(a.toggleMenu("gestionAtencion"))}),e(2,"div",14),c(),e(3,"svg",15),l(4,"path",16),i(),d(),e(5,"span",17),o(6,"Atenciones"),i()(),c(),e(7,"svg",18),l(8,"path",19),i()(),v(9,he,2,1,"ul",20),i()}if(n&2){let t=p();m(7),C("transform",t.expandedMenus.gestionAtencion?"rotate-180":""),m(2),g("ngIf",t.expandedMenus.gestionAtencion)}}function xe(n,r){n&1&&(e(0,"li")(1,"a",39)(2,"button",7),c(),e(3,"svg",8),l(4,"path",9)(5,"path",10),i(),d(),e(6,"p",11),o(7,"reserva"),i()()()())}function Se(n,r){n&1&&(e(0,"li")(1,"a",40)(2,"button",7),c(),e(3,"svg",8),l(4,"path",9)(5,"path",10),i(),d(),e(6,"p",11),o(7,"mis reservas"),i()()()())}function _e(n,r){n&1&&(e(0,"li")(1,"a",41)(2,"button",7),c(),e(3,"svg",8),l(4,"path",9)(5,"path",10),i(),d(),e(6,"p",11),o(7,"mi historia clinica"),i()()()())}var z=class n{constructor(r,t,s,a){this.sidebarService=r;this.authService=t;this.medicoService=s;this.bitacoraService=a;this.sidebarService.sidebarOpen$.subscribe(S=>{this.isSidebarOpen=S})}isSidebarOpen=!0;expandedMenus={gestionUsuario:!1};userRole=null;especialidades=[];ngOnInit(){this.checkScreenSize(),this.userRole=this.authService.getUserRole();let r=this.authService.getAuthenticatedUserEmail();r?this.medicoService.getEspecialidadesDelMedico(r).subscribe(t=>{this.especialidades=t}):console.error("El correo del m\xE9dico autenticado es nulo")}checkScreenSize(){window.innerWidth>=1280?this.isSidebarOpen=!0:this.isSidebarOpen=!1}toggleMenu(r){this.expandedMenus[r]?this.expandedMenus[r]=!1:(Object.keys(this.expandedMenus).forEach(t=>{this.expandedMenus[t]=!1}),this.expandedMenus[r]=!0)}registrarBitacora(r,t){this.bitacoraService.getUserIP().subscribe({next:s=>{let a=new Date,S=`${a.getFullYear()}-${(a.getMonth()+1).toString().padStart(2,"0")}-${a.getDate().toString().padStart(2,"0")}`,M=`${a.getHours().toString().padStart(2,"0")}:${a.getMinutes().toString().padStart(2,"0")}:${a.getSeconds().toString().padStart(2,"0")}`,ie={correo:this.authService.getAuthenticatedUserEmail()||"",fecha:S,hora:M,ip:s.ip,accion:r,detalle:t};this.bitacoraService.createBitacora(ie).subscribe({next:()=>console.log("Registro de bit\xE1cora exitoso"),error:re=>console.error("Error al registrar en bit\xE1cora",re)})},error:s=>console.error("Error al obtener IP",s)})}listarUsuarios(){this.registrarBitacora("Listar usuarios","El usuario accedi\xF3 a la lista de usuarios")}listarAsegurados(){this.registrarBitacora("Listar asegurados","El usuario accedi\xF3 a la lista de asegurados")}listarRoles(){this.registrarBitacora("Listar roles","El usuario accedi\xF3 a la lista de roles")}listarPermisos(){this.registrarBitacora("Listar permisos","El usuario accedi\xF3 a la lista de permisos")}listarMedicos(){this.registrarBitacora("Listar medicos","El usuario accedi\xF3 a la lista de m\xE9dicos")}listarEspecialidades(){this.registrarBitacora("Listar especialidades","El usuario accedi\xF3 a la lista de especialidades")}listarHorarios(){this.registrarBitacora("Listar horarios","El usuario accedi\xF3 a la lista de horarios")}listarPermisosAusencia(){this.registrarBitacora("Listar permisos ausencia","El usuario accedi\xF3 a la lista de permisos de ausencia")}listarCupos(){this.registrarBitacora("Listar cupos","El usuario accedi\xF3 a la lista de cupos")}listarHorariosEspecialidad(r){this.registrarBitacora("Listar horarios",`Listar sus horarios de ${r}`)}static \u0275fac=function(t){return new(t||n)(h(E),h(y),h(Z),h(A))};static \u0275cmp=_({type:n,selectors:[["app-sidebar"]],hostBindings:function(t,s){t&1&&u("resize",function(){return s.checkScreenSize()},!1,U)},standalone:!0,features:[w],decls:21,vars:8,consts:[[1,"bg-gradient-to-br","from-gray-800","to-gray-900","fixed","inset-0","z-50","my-4","ml-4","h-[calc(100vh-32px)]","w-72","rounded-xl","transition-transform","duration-300"],[1,"relative","border-b","border-white/20"],["href","#/",1,"flex","items-center","gap-4","py-6","px-8"],[1,"block","antialiased","tracking-normal","font-sans","text-base","font-semibold","leading-relaxed","text-white"],[1,"m-4"],[1,"mb-4","flex","flex-col","gap-1"],["routerLink","/dashboard"],["routerLinkActive","bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]","type","button",1,"middle","none","font-sans","font-bold","center","transition-all","disabled:opacity-50","disabled:shadow-none","disabled:pointer-events-none","text-xs","py-3","rounded-lg","text-white","hover:bg-white/10","active:bg-white/30","flex","w-full","items-center","gap-4","px-4","capitalize"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","aria-hidden","true",1,"w-5","h-5","text-inherit"],["d","M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"],["d","M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"],[1,"block","antialiased","font-sans","text-base","leading-relaxed","text-inherit","font-medium","capitalize"],[4,"ngIf"],[1,"w-full","flex","items-center","justify-between","text-white","py-3","px-4","rounded-lg","hover:bg-white/10",3,"click"],[1,"flex","items-center","gap-4"],["xmlns","http://www.w3.org/2000/svg","fill","currentColor","viewBox","0 0 24 24",1,"w-5","h-5","text-inherit"],["d","M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"],[1,"font-medium","capitalize"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-4","h-4","transition-transform"],["fill-rule","evenodd","d","M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z","clip-rule","evenodd"],["class","pl-8 mt-2 space-y-2",4,"ngIf"],[1,"pl-8","mt-2","space-y-2"],["routerLink","/usuario"],["routerLinkActive","bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]","type","button",1,"middle","none","font-sans","font-bold","center","transition-all","disabled:opacity-50","disabled:shadow-none","disabled:pointer-events-none","text-xs","py-3","rounded-lg","text-white","hover:bg-white/10","active:bg-white/30","flex","w-full","items-center","gap-4","px-4","capitalize",3,"click"],["fill-rule","evenodd","d","M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z","clip-rule","evenodd"],["routerLink","/asegurado"],["routerLink","/rol"],["routerLink","/permiso"],["routerLink","/rol-permiso"],["routerLink","/bitacora"],["routerLink","/medico"],["routerLink","/especialidad"],["routerLink","/asignar-medico"],["routerLink","/horario"],["routerLink","/permiso-ausencia"],["routerLink","/cupo"],[4,"ngFor","ngForOf"],[3,"click","routerLink"],["type","button",1,"middle","none","font-sans","font-bold","center","transition-all","text-xs","py-3","rounded-lg","text-white","hover:bg-white/10","flex","w-full","items-center","gap-4","px-4","capitalize"],["routerLink","/reserva"],["routerLink","/mis-reservas"],["routerLink","/mi-historia-clinica"]],template:function(t,s){t&1&&(e(0,"aside",0)(1,"div",1)(2,"a",2)(3,"h6",3),o(4,"Seguro de Salud Vida Sana"),i()()(),e(5,"div",4)(6,"ul",5)(7,"li")(8,"a",6)(9,"button",7),c(),e(10,"svg",8),l(11,"path",9)(12,"path",10),i(),d(),e(13,"p",11),o(14,"dashboard"),i()()()(),v(15,ue,10,3,"li",12)(16,be,10,3,"li",12)(17,ve,10,3,"li",12)(18,xe,8,0,"li",12)(19,Se,8,0,"li",12)(20,_e,8,0,"li",12),i()()()),t&2&&(C("-translate-x-full",!s.isSidebarOpen),m(15),g("ngIf",s.userRole=="SuperUsuario"),m(),g("ngIf",s.userRole=="SuperUsuario"),m(),g("ngIf",s.userRole=="Medico"),m(),g("ngIf",s.userRole=="Asegurado"),m(),g("ngIf",s.userRole=="Asegurado"),m(),g("ngIf",s.userRole=="Asegurado"))},dependencies:[K,Q,I,V,H]})};var P=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=_({type:n,selectors:[["app-footer"]],standalone:!0,features:[w],decls:23,vars:0,consts:[[1,"py-2"],[1,"flex","w-full","flex-wrap","items-center","justify-center","gap-6","px-2","md:justify-between"],[1,"block","antialiased","font-sans","text-sm","leading-normal","font-normal","text-inherit"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","aria-hidden","true",1,"-mt-0.5","inline-block","h-3.5","w-3.5"],["d","M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"],["href","https://www.creative-tim.com","target","_blank",1,"transition-colors","hover:text-blue-500"],[1,"flex","items-center","gap-4"],["href","https://www.creative-tim.com","target","_blank",1,"block","antialiased","font-sans","text-sm","leading-normal","py-0.5","px-1","font-normal","text-inherit","transition-colors","hover:text-blue-500"],["href","https://www.creative-tim.com/presentation","target","_blank",1,"block","antialiased","font-sans","text-sm","leading-normal","py-0.5","px-1","font-normal","text-inherit","transition-colors","hover:text-blue-500"],["href","https://www.creative-tim.com/blog","target","_blank",1,"block","antialiased","font-sans","text-sm","leading-normal","py-0.5","px-1","font-normal","text-inherit","transition-colors","hover:text-blue-500"],["href","https://www.creative-tim.com/license","target","_blank",1,"block","antialiased","font-sans","text-sm","leading-normal","py-0.5","px-1","font-normal","text-inherit","transition-colors","hover:text-blue-500"]],template:function(t,s){t&1&&(e(0,"footer",0)(1,"div",1)(2,"p",2),o(3,"\xA9 2023, made with "),c(),e(4,"svg",3),l(5,"path",4),i(),o(6," by "),d(),e(7,"a",5),o(8,"Creative Tim"),i(),o(9," for a better web. "),i(),e(10,"ul",6)(11,"li")(12,"a",7),o(13,"Creative Tim"),i()(),e(14,"li")(15,"a",8),o(16,"About Us"),i()(),e(17,"li")(18,"a",9),o(19,"Blog"),i()(),e(20,"li")(21,"a",10),o(22,"License"),i()()()()())}})};var j=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=_({type:n,selectors:[["app-layout"]],standalone:!0,features:[w],decls:9,vars:0,consts:[[1,"min-h-screen","bg-gray-50/50"],[1,"p-4","xl:ml-80"],[1,"block","w-full","max-w-full","bg-transparent","text-white","shadow-none","rounded-xl","transition-all","px-0","py-1"],[1,"mt-12"],[1,"text-blue-gray-600"]],template:function(t,s){t&1&&(e(0,"div",0),l(1,"app-sidebar"),e(2,"div",1)(3,"nav",2),l(4,"app-header"),i(),e(5,"div",3),l(6,"router-outlet"),i(),e(7,"div",4),l(8,"app-footer"),i()()())},dependencies:[B,z,P,q]})};export{j as default};