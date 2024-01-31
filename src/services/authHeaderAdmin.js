export default function authHeaderAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.token && user.user.is_admin == 1) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }