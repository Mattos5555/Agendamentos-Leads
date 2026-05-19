"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {

  const [tipoFormulario, setTipoFormulario] = useState("agendamento");

  // AGENDAMENTO
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");

  // LEADS
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empreendimento, setEmpreendimento] = useState("");
  const [campanha, setCampanha] = useState("");
  const [status, setStatus] = useState("");

  async function adicionarAgendamento(e: any) {
    e.preventDefault();

    const { error } = await supabase
      .from("agendamentos")
      .insert([
        {
          cliente,
          data,
          horario,
          local,
        },
      ]);

    if (error) {
      alert("Erro ao salvar agendamento");
      console.log(error);
      return;
    }

    alert("Agendamento enviado com sucesso 🚀");

    setCliente("");
    setData("");
    setHorario("");
    setLocal("");
  }

  async function enviarLead(e: any) {
    e.preventDefault();

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          nome,
          telefone,
          empreendimento,
          campanha,
          status,
        },
      ]);

    if (error) {
      alert("Erro ao enviar lead");
      console.log(error);
      return;
    }

    alert("Lead enviado com sucesso 🚀");

    setNome("");
    setTelefone("");
    setEmpreendimento("");
    setCampanha("");
    setStatus("");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Atendimento Imobiliário
        </h1>

        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setTipoFormulario("agendamento")}
            className="flex-1 bg-black text-white p-4 rounded-xl"
          >
            Agendamento
          </button>

          <button
            onClick={() => setTipoFormulario("lead")}
            className="flex-1 bg-gray-700 text-white p-4 rounded-xl"
          >
            Cadastro de Leads
          </button>

        </div>

        {tipoFormulario === "agendamento" && (

          <form
            onSubmit={adicionarAgendamento}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Nome do Cliente"
              className="w-full border p-4 rounded-xl"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />

            <input
              type="date"
              className="w-full border p-4 rounded-xl"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />

            <input
              type="time"
              className="w-full border p-4 rounded-xl"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Local do Agendamento"
              className="w-full border p-4 rounded-xl"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white p-4 rounded-xl text-lg"
            >
              Confirmar Agendamento
            </button>

          </form>
        )}

        {tipoFormulario === "lead" && (

          <form
            onSubmit={enviarLead}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Nome"
              className="w-full border p-4 rounded-xl"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Número de telefone"
              className="w-full border p-4 rounded-xl"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Empreendimento"
              className="w-full border p-4 rounded-xl"
              value={empreendimento}
              onChange={(e) => setEmpreendimento(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Qual campanha?"
              className="w-full border p-4 rounded-xl"
              value={campanha}
              onChange={(e) => setCampanha(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Status atualizado"
              className="w-full border p-4 rounded-xl"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white p-4 rounded-xl text-lg"
            >
              Enviar Lead
            </button>

          </form>
        )}

      </div>

    </main>
  );
}