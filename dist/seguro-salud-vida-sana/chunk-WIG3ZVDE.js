import{a as o,b as n,o as p}from"./chunk-EALBQTKK.js";import{Q as a,V as r}from"./chunk-3RWLLOHT.js";var s=class e{constructor(t,i){this.http=t;this.authService=i}apiUrl="https://ssvs-backend-produccion-production.up.railway.app/api/tratamiento";getAuthHeaders(){return new o({"Content-Type":"application/json",Authorization:`Bearer ${this.authService.getToken()}`})}getTratamientoByConsultaId(t){return this.http.get(`${this.apiUrl}/consulta/${t}`,{headers:this.getAuthHeaders()})}createTratamiento(t){return this.http.post(this.apiUrl,t,{headers:this.getAuthHeaders()})}static \u0275fac=function(i){return new(i||e)(r(n),r(p))};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})};export{s as a};