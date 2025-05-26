import ChatbotButton from "./ChatbotButton";


export default function ProductionOrderForm() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-blue-100 rounded-lg shadow-xl">

      <ChatbotButton />

      <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Orden de Producción</h2>

      {/* Encabezado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block font-semibold text-sm mb-1">Cliente:</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">O.C.:</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">Orden:</label>
          <input type="number" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">Emisión:</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">Entrega:</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* Medidas y características */}
      <h3 className="text-lg font-semibold mb-3 text-blue-800 border-b pb-1">Medidas y Características Generales</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {[
          "Ancho", "Desarrollo", "Material", "Millares", "Al paso", "Tipo Separ.",
          "Pleca", "Etiqueta x Rollo", "Centro", "Adhesivo", "Esquinas", "Forma",
          "SKU", "Pantone", "Plano Mecánico"
        ].map((placeholder, idx) => (
          <input key={idx} placeholder={placeholder} className="w-full p-2 border rounded" />
        ))}
      </div>

      {/* Características de salida */}
      <h3 className="text-lg font-semibold mb-3 text-blue-800 border-b pb-1">Características de Salida</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {[
          "SKU Proveedor", "Cav al Eje", "Esp al Desar.", "Margen Impr", "Suaje a utilizar",
          "Ancho cm", "Ancho mm", "Espacio Tot", "Ancho Total", "Metros", "Rollos"
        ].map((placeholder, idx) => (
          <input key={idx} placeholder={placeholder} className="w-full p-2 border rounded" />
        ))}
      </div>

      {/* Observaciones */}
      <div className="mb-6">
        <textarea placeholder="Observ 1" className="w-full p-2 border rounded mb-2 h-16" />
        <textarea placeholder="Observ 2" className="w-full p-2 border rounded mb-2 h-16" />
        <textarea placeholder="Observ 3" className="w-full p-2 border rounded h-16" />
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4">
        <button className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer">
          Confirma Orden
        </button>
        <button className="bg-gray-400 text-white font-semibold px-4 py-2 rounded hover:bg-gray-500 hover:cursor-pointer">
          Salir
        </button>
      </div>
    </div>
  );
}
