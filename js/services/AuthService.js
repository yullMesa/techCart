import ClienteService from "./ClienteService.js";
class AuthService {
 static isAuthenticated(){return localStorage.getItem("isLoggedIn") === "true";}
 static verificarPassword(clienteId,password){
  const cliente=ClienteService.getClienteById(clienteId);
  return Boolean(cliente && typeof password === 'string' && cliente.password === password);
 }
 static logout(){localStorage.removeItem('isLoggedIn');localStorage.removeItem('techCartSesion');}
}
export default AuthService;
