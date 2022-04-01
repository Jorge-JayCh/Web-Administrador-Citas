import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if ( !citasIniciales ) {
    citasIniciales = [];
  } 

  // Crear State Arreglo Citas
  const [ citas, guardarCitas ] = useState( citasIniciales );

  // use Effect para realizar ciertas operaciones cuando el state cambia
  // se ejecuta cuando el componente esta listo pero tambien
  // cuando hay cambios en el componente 
  // se comporta como un observador del state
  // [] array de dependencias
  useEffect( () => {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if ( citasIniciales ) {
      localStorage.setItem('citas', JSON.stringify( citas ));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [ citas ] );



  // Funcion que toma las citas actuales y agrega la nueva
  const crearCita = cita => {
    // console.log( cita );
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id );
    guardarCitas( nuevasCitas );
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';



  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario 
                crearCita={ crearCita }
              />
          </div>
          <div className="one-half column">
              <h2>{ titulo }</h2>
              { citas.map( cita => (
                <Cita
                  key={ cita.id }
                  cita={ cita }
                  eliminarCita={ eliminarCita }
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
