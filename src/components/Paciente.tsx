import type { Patient } from "../types"
import PacienteDetalle from "./PacienteDetalle"
import { usePacienteStore } from '../store/store'
import DialogModal from "./DialogModal"
import { useState } from "react"
import { toast } from 'react-toastify'

type PacienteProps = {
    paciente: Patient
}

const Paciente = ({ paciente }: PacienteProps) => {

    const [isOpened, setIsOpened] = useState(false)

    const pacienteActivo = usePacienteStore((state) => state.pacienteActivo)
    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente)
    const establecerPacienteActivo = usePacienteStore((state) => state.establecerPacienteActivo)

    const notifyDelete = () => toast('Paciente eliminado correctamente')

    const handleClickEliminar = () => {
        //protección extra
        if (pacienteActivo) return

        eliminarPaciente(paciente.id)
        notifyDelete()
    }

    const handleClickEditar = () => {
        establecerPacienteActivo(paciente)
    }

    const onProceed = () => {
        handleClickEliminar()
        setIsOpened(false)
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PacienteDetalle label="ID" data={paciente.id} />
            <PacienteDetalle label="Nombre" data={paciente.name} />
            <PacienteDetalle label="Propietario" data={paciente.caretaker} />
            <PacienteDetalle label="Email" data={paciente.email} />
            <PacienteDetalle label="Fecha Alta" data={paciente.date || ''} />
            <PacienteDetalle label="Síntomas" data={paciente.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleClickEditar}
                >
                    Editar
                </button>

                <button
                    type="button"
                    disabled={!!pacienteActivo}
                    title={pacienteActivo ? "Termina de editar antes de eliminar" : ""}
                    className={`py-2 px-10 text-white font-bold uppercase rounded-lg transition-colors
                        ${pacienteActivo
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                    onClick={() => setIsOpened(true)}
                >
                    Eliminar
                </button>

                <DialogModal
                    title="Eliminar Paciente"
                    isOpened={isOpened}
                    onProceed={onProceed}
                    onClose={() => setIsOpened(false)}
                >
                    <p>¿Estás seguro de que quieres eliminar al paciente [{paciente.name}]?</p>
                </DialogModal>
            </div>
        </div>
    )
}

export default Paciente