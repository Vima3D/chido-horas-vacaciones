import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export default function useGestionRegistros(coleccionFirestore, campo) {
  const [trabajadores, setTrabajadores] = useState([]);
  const [registros, setRegistros] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoValor, setNuevoValor] = useState(0);
  const [nuevaFecha, setNuevaFecha] = useState(new Date());

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [modo, setModo] = useState("nuevo");

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "trabajadores"), (snapshot) => {
      setTrabajadores(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    });

    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, coleccionFirestore), (snapshot) => {
      setRegistros(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    });

    return unsub;
  }, [coleccionFirestore]);

  const guardarReporte = async () => {
    if (editando) {
      await updateDoc(doc(db, coleccionFirestore, idEditar), {
        nombre: nuevoNombre,
        [campo]: nuevoValor,
        fecha: Timestamp.fromDate(nuevaFecha),
      });
    } else {
      await addDoc(collection(db, coleccionFirestore), {
        nombre: nuevoNombre,
        [campo]: nuevoValor,
        fecha: Timestamp.fromDate(nuevaFecha),
      });
    }

    setMensaje(editando ? "Registro actualizado" : "Registro guardado");
    setEditando(false);
    setIdEditar(null);
    setModo("nuevo");

    setNuevoValor(0);
    setNuevaFecha(new Date());
    setNuevoNombre(trabajadores[0]?.nombre || "");

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  };

  const eliminarReporte = async (id) => {
    await deleteDoc(doc(db, coleccionFirestore, id));
  };

  return {
    trabajadores,
    registros,

    mostrarFormulario,
    setMostrarFormulario,

    nuevoNombre,
    setNuevoNombre,

    nuevoValor,
    setNuevoValor,

    nuevaFecha,
    setNuevaFecha,

    editando,
    setEditando,

    idEditar,
    setIdEditar,

    modo,
    setModo,

    guardarReporte,
    eliminarReporte,

    mensaje,
    setMensaje,
  };
}
