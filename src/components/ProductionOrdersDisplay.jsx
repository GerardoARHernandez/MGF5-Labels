import { useState, useEffect } from 'react';

const ProductionOrdersDisplay = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener datos de la API
  useEffect(() => {
    const getCurrentOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://systemweb.ddns.net/StatusProd/API1/ListStatusProd`, {
          cache: 'no-store' // Evitar caché del navegador
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setOrdersData(data.SDTStatusProd || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
        setOrdersData([]);
      } finally {
        setIsLoading(false);
      }      
    };

    getCurrentOrders();
    
    // Actualizar datos cada minuto
    const interval = setInterval(getCurrentOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // Cambiar página cada 10 segundos (solo si hay datos)
  useEffect(() => {
    if (ordersData.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % Math.ceil(ordersData.length / 10));
    }, 10000);

    return () => clearInterval(interval);
  }, [ordersData]);

  // Actualizar hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'ENTREGADO': return 'bg-green-100 text-green-800';
      case 'En Espera de Inicio': return 'bg-yellow-100 text-yellow-800';
      case 'Planeacion': return 'bg-blue-100 text-blue-800';
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

  const formatApiDate = (dateStr) => {
    if (dateStr === '1900-01-01') return 'Por definir';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  };

  // Paginación de datos
  const itemsPerPage = 10;
  const pageCount = Math.ceil(ordersData.length / itemsPerPage);
  const paginatedData = ordersData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-2xl">Cargando datos de producción...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-2xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (ordersData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-2xl">No hay órdenes de producción activas</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-9">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg mb-8">
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
          {Array.from({ length: pageCount }).map((_, index) => (
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
                <th className="px-8 py-6 text-left text-3xl font-bold text-gray-700">Cliente</th>
                <th className="px-8 py-6 text-left text-3xl font-bold text-gray-700">Millares</th>
                <th className="px-8 py-6 text-left text-3xl font-bold text-gray-700">F_Entrega</th>
                <th className="px-8 py-6 text-left text-3xl font-bold text-gray-700">Estado</th>
                <th className="px-8 py-6 text-left text-3xl font-bold text-gray-700">Días Transcurridos</th>
              </tr>
            </thead>
            <tbody className='text-2xl'>
              {paginatedData.map((order, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="px-8 py-6 text-2xl font-semibold text-gray-900">
                    {order.Nombre}
                  </td>
                  <td className="px-8 py-6 text-2xl text-gray-700 font-medium">
                    {order.Millares} millares
                  </td>
                  <td className="px-8 py-6 text-2xl text-gray-700 font-medium">
                    {formatApiDate(order.F_Entrega)}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex px-4 py-2 rounded-full text-xl font-semibold ${getStatusColor(order.Estado)}`}>
                      {order.Estado}
                    </span>
                  </td>
                  <td className={`px-8 py-6 text-2xl ${getDaysColor(order.DiasTranscurridos)}`}>
                    {order.DiasTranscurridos} días
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
          <div className="text-3xl font-bold">{ordersData.length}</div>
          <div className="text-lg">Órdenes Activas</div>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
          <div className="text-3xl font-bold">
            {ordersData.filter(order => order.Status === 'EN').length}
          </div>
          <div className="text-lg">Entregadas</div>
        </div>
        <div className="bg-yellow-600 text-white p-6 rounded-lg text-center">
          <div className="text-3xl font-bold">
            {ordersData.filter(order => parseInt(order.DiasTranscurridos) > 3).length}
          </div>
          <div className="text-lg">Requieren Atención</div>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded-lg text-center">
          <div className="text-3xl font-bold">Página {currentPage + 1}</div>
          <div className="text-lg">de {pageCount}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductionOrdersDisplay;