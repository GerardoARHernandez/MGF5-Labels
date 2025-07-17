import { useState, useEffect } from 'react';

const ProductionOrdersDisplay = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Datos de ejemplo para múltiples páginas
  const ordersData = [
    // Página 1
    [
      { cliente: "ETIMEX DE MÉXICO", cant: "150 millares", fecha: "15/Ago", proceso: "En Suajado", transcurridos: "3 días" },
      { cliente: "CODITEX,SA DE CV", cant: "50 millares", fecha: "12/Ago", proceso: "En Embobinado", transcurridos: "1 días" },
      { cliente: "ETIMEX DE MÉXICO", cant: "150 millares", fecha: "15/Ago", proceso: "En Suajado", transcurridos: "3 días" },
      { cliente: "CODITEX,SA DE CV", cant: "50 millares", fecha: "12/Ago", proceso: "En Embobinado", transcurridos: "1 días" },
      { cliente: "PAPELERA INDUSTRIAL", cant: "200 millares", fecha: "14/Ago", proceso: "En Impresión", transcurridos: "2 días" },
      { cliente: "GRUPO TEXTILERO", cant: "75 millares", fecha: "13/Ago", proceso: "En Corte", transcurridos: "4 días" },
      { cliente: "MANUFACTURERA DEL NORTE", cant: "120 millares", fecha: "16/Ago", proceso: "En Acabado", transcurridos: "1 días" },
      { cliente: "ETIQUETAS PREMIUM", cant: "90 millares", fecha: "11/Ago", proceso: "En Barnizado", transcurridos: "6 días" },
      { cliente: "CODITEX,SA DE CV", cant: "60 millares", fecha: "17/Ago", proceso: "En Embobinado", transcurridos: "0 días" },
      { cliente: "ETIMEX DE MÉXICO", cant: "180 millares", fecha: "10/Ago", proceso: "En Suajado", transcurridos: "7 días" },
      { cliente: "INDUSTRIAL MERCANTIL", cant: "110 millares", fecha: "14/Ago", proceso: "En Laminado", transcurridos: "3 días" },
      { cliente: "PAPELERA ESPECIALIZADA", cant: "85 millares", fecha: "15/Ago", proceso: "En Impresión", transcurridos: "2 días" }
    ],
    // Página 2
    [
      { cliente: "TEXTILES MODERNOS", cant: "95 millares", fecha: "16/Ago", proceso: "En Corte", transcurridos: "1 días" },
      { cliente: "GRUPO MANUFACTURERO", cant: "130 millares", fecha: "13/Ago", proceso: "En Acabado", transcurridos: "4 días" },
      { cliente: "ETIQUETAS SELECTAS", cant: "70 millares", fecha: "12/Ago", proceso: "En Barnizado", transcurridos: "5 días" },
      { cliente: "INDUSTRIAL TAPATÍA", cant: "160 millares", fecha: "17/Ago", proceso: "En Laminado", transcurridos: "0 días" },
      { cliente: "CODITEX,SA DE CV", cant: "45 millares", fecha: "11/Ago", proceso: "En Embobinado", transcurridos: "6 días" },
      { cliente: "PAPELERA INTEGRAL", cant: "115 millares", fecha: "14/Ago", proceso: "En Impresión", transcurridos: "3 días" },
      { cliente: "MANUFACTURERA BAJÍO", cant: "80 millares", fecha: "15/Ago", proceso: "En Suajado", transcurridos: "2 días" },
      { cliente: "TEXTILES CORPORATIVOS", cant: "105 millares", fecha: "13/Ago", proceso: "En Corte", transcurridos: "4 días" },
      { cliente: "ETIQUETAS INDUSTRIALES", cant: "125 millares", fecha: "16/Ago", proceso: "En Acabado", transcurridos: "1 días" },
      { cliente: "GRUPO PAPELERO", cant: "90 millares", fecha: "12/Ago", proceso: "En Barnizado", transcurridos: "5 días" },
      { cliente: "MANUFACTURERA CENTRAL", cant: "140 millares", fecha: "17/Ago", proceso: "En Laminado", transcurridos: "0 días" },
      { cliente: "ETIMEX DE MÉXICO", cant: "100 millares", fecha: "10/Ago", proceso: "En Suajado", transcurridos: "7 días" }
    ]
  ];

  // Cambiar página cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % ordersData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Actualizar hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (proceso) => {
    switch (proceso) {
      case 'En Suajado': return 'bg-blue-100 text-blue-800';
      case 'En Embobinado': return 'bg-green-100 text-green-800';
      case 'En Impresión': return 'bg-purple-100 text-purple-800';
      case 'En Corte': return 'bg-orange-100 text-orange-800';
      case 'En Acabado': return 'bg-yellow-100 text-yellow-800';
      case 'En Barnizado': return 'bg-red-100 text-red-800';
      case 'En Laminado': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysColor = (dias) => {
    const numDias = parseInt(dias);
    if (numDias === 0) return 'text-green-600 font-semibold';
    if (numDias <= 2) return 'text-yellow-600 font-semibold';
    if (numDias <= 4) return 'text-orange-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-MX', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="bg-green-600 text-white p-8 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-6xl font-bold">Órdenes de Producción Activas</h1>
            <p className="text-2xl mt-2 opacity-90">Sistema de Monitoreo en Tiempo Real</p>
          </div>
          <div className="text-right">
            <div className="text-8xl font-bold tracking-wider">MGF5</div>
            <div className="text-2xl mt-2">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Información de fecha y página */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl text-gray-600">
          {formatDate(currentTime)}
        </div>
        <div className="flex space-x-2">
          {ordersData.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index === currentPage ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tabla de órdenes */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-8 py-6 text-left text-2xl font-bold text-gray-700">Cliente</th>
                <th className="px-8 py-6 text-left text-2xl font-bold text-gray-700">Cant</th>
                <th className="px-8 py-6 text-left text-2xl font-bold text-gray-700">F_Entrega</th>
                <th className="px-8 py-6 text-left text-2xl font-bold text-gray-700">Proceso</th>
                <th className="px-8 py-6 text-left text-2xl font-bold text-gray-700">Transcurridos</th>
              </tr>
            </thead>
            <tbody>
              {ordersData[currentPage].map((order, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="px-8 py-6 text-xl font-semibold text-gray-900">
                    {order.cliente}
                  </td>
                  <td className="px-8 py-6 text-xl text-gray-700 font-medium">
                    {order.cant}
                  </td>
                  <td className="px-8 py-6 text-xl text-gray-700 font-medium">
                    {order.fecha}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex px-4 py-2 rounded-full text-lg font-semibold ${getStatusColor(order.proceso)}`}>
                      {order.proceso}
                    </span>
                  </td>
                  <td className={`px-8 py-6 text-xl ${getDaysColor(order.transcurridos)}`}>
                    {order.transcurridos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer con estadísticas */}
      <div className="mt-8 grid grid-cols-4 gap-6">
        <div className="bg-green-600 text-white p-6 rounded-lg text-center">
          <div className="text-3xl font-bold">{ordersData[currentPage].length}</div>
          <div className="text-lg">Órdenes Activas</div>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
          <div className="text-3xl font-bold">
            {ordersData[currentPage].filter(order => order.transcurridos === "0 días").length}
          </div>
          <div className="text-lg">Nuevas Hoy</div>
        </div>
        <div className="bg-yellow-600 text-white p-6 rounded-lg text-center">
          <div className="text-3xl font-bold">
            {ordersData[currentPage].filter(order => parseInt(order.transcurridos) > 3).length}
          </div>
          <div className="text-lg">Requieren Atención</div>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded-lg text-center">
          <div className="text-3xl font-bold">Página {currentPage + 1}</div>
          <div className="text-lg">de {ordersData.length}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductionOrdersDisplay;