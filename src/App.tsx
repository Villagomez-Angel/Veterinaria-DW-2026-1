import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <div className="container mx-auto mt-20">
          <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
            Seguimiento de Pacientes {''}
            <span className="text-indigo-700">Veterinaria</span>
          </h1>

          <div className="mt-12 md:flex">
              <Formulario />
              <ListadoPacientes />
          </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  )
}

export default App
