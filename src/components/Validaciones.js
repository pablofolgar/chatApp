class Validaciones{

  validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
  };

  validarDigitos(campoNumerico){
  	var re = /^\d+$/;
          return re.test(campoNumerico);
  }

  validarLetras(campoAlfabetico){
  	var re = /^[a-zA-Z]*$/;
          return re.test(campoAlfabetico);
  }

  validarTelefono(campoTelefonico){
  	var re = /^\(?([0-9]{3,4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
          return re.test(campoTelefonico);
  }
}

export default new Validaciones();