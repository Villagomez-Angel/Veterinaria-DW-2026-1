import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DraftPatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';
 
type PacientesState = {
    pacientes:                Patient[];
    pacienteActivo:           Patient | null;
    agregarPaciente:          (data: DraftPatient) => void;
    eliminarPaciente:         (id: Patient['id']) => void;
    establecerPacienteActivo: (paciente: Patient) => void;
    actualizarPaciente:       (data: DraftPatient) => void;
    limpiarPacienteActivo:    () => void;
}
 
const crearPaciente = (data: DraftPatient): Patient => ({
    id: uuidv4(),
    ...data
})
 
export const usePacienteStore = create<PacientesState>()(  
    persist(
        (set) => ({
            pacientes:      [],
            pacienteActivo: null,
 
            agregarPaciente: (data) =>
                set((state) => ({
                    pacientes: [...state.pacientes, crearPaciente(data)]
                })),
 
            eliminarPaciente: (id) =>
                set((state) => ({
                    pacientes: state.pacientes.filter(p => p.id !== id)
                })),
 
            establecerPacienteActivo: (paciente) =>
                set(() => ({ pacienteActivo: paciente })),
 
            actualizarPaciente: (data) =>
                set((state) => ({
                    pacientes: state.pacientes.map(p =>
                        p.id === state.pacienteActivo?.id
                            ? { id: p.id, ...data }
                            : p
                    ),
                    pacienteActivo: null
                })),
 
            limpiarPacienteActivo: () =>
                set(() => ({ pacienteActivo: null })),
        }),
        { name: 'pacientes-storage' }   // <-- configuracion
    )
)