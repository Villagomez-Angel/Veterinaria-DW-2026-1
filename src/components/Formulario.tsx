import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePacienteStore } from '../store/store'

const Formulario = () => {

    const pacienteActivo = usePacienteStore((state) => state.pacienteActivo)
    const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)
    const actualizarPaciente = usePacienteStore((state) => state.actualizarPaciente)
    const limpiarPacienteActivo = usePacienteStore((state) => state.limpiarPacienteActivo)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DraftPatient>()

    useEffect(() => {
        if (pacienteActivo) {
            setValue('name', pacienteActivo.name)
            setValue('caretaker', pacienteActivo.caretaker)
            setValue('email', pacienteActivo.email)
            setValue('date', pacienteActivo.date)
            setValue('symptoms', pacienteActivo.symptoms)
        }
    }, [pacienteActivo])

    const registrarPaciente = (data: DraftPatient) => {
        if (pacienteActivo) {
            actualizarPaciente(data)
        } else {
            agregarPaciente(data)
        }
        limpiarFormulario()
    }

    const handleCancelar = () => {
        limpiarPacienteActivo()
        limpiarFormulario()
    }

    const limpiarFormulario = () => {
        setValue('name', '')
        setValue('caretaker', '')
        setValue('email', '')
        setValue('date', '')
        setValue('symptoms', '')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                {pacienteActivo ? 'Edita el Paciente y ' : 'Añade Pacientes y '}
                <span className="text-indigo-600 font-bold">
                    {pacienteActivo ? 'Guarda los Cambios' : 'Administralos'}
                </span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registrarPaciente)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: "El nombre del paciente es obligatorio"
                        })}
                    />
                    {errors.name &&
                        <Error>{errors.name?.message?.toString()}</Error>
                    }
                    
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', {
                            required: "El nombre del propietario es obligatorio"
                        })}
                    />
                    {errors.caretaker && <p className="text-red-500 text-sm mt-1">{errors.caretaker?.message?.toString()}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El Email es Obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email No Válido'
                            }
                        })}
                    />
                    {errors.email && <Error>{errors.email?.message?.toString()}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: "La fecha de alta es obligatoria"
                        })}
                    />
                    {errors.date && <Error>{errors.date?.message?.toString()}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', {
                            required: "Los síntomas son obligatorios"
                        })}
                    ></textarea>
                    {errors.symptoms && <Error>{errors.symptoms?.message?.toString()}</Error>}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={pacienteActivo ? 'Actualizar Paciente' : 'Guardar Paciente'}
                />

                {pacienteActivo && (
                    <button
                        type="button"
                        className="bg-gray-600 w-full p-3 text-white uppercase font-bold hover:bg-gray-700 cursor-pointer transition-colors mt-3"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    )

}

export default Formulario
