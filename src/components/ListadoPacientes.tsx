import { usePacienteStore } from '../store/store'
import Paciente from './Paciente'


const ListadoPacientes = () => {

  const pacientes = usePacienteStore(state => state.pacientes)

  return (
    <div>
      <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Administra tus {''}
        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
      </p>
      {pacientes.map(paciente => (
        <Paciente
          key={paciente.id}
          paciente={paciente} />
      ))}
    </div>
  )
}

export default ListadoPacientes;