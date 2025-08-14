import { useState, useEffect } from 'react';

const ProductionOrdersMobile = () => {
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
          cache: 'no-store'
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
    
    const interval = setInterval(getCurrentOrders, 30000);
    return () => clearInterval(interval);
  }, []);

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

  // Manejar cambio de página
  const goToPage = (page) => {
    if (page >= 0 && page < pageCount) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-xl">Cargando datos de producción...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (ordersData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-xl">No hay órdenes de producción activas</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header simplificado para móvil */}
      <div className="bg-green-600 text-white p-3 rounded-lg shadow-lg mb-4">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center">Órdenes de Producción</h1>
          <div className="text-4xl font-bold mt-2">MGF5</div>
          <div className="text-sm mt-1">
            {formatTime(currentTime)} - {formatDate(currentTime)}
          </div>
        </div>
      </div>

      {/* Controles de paginación */}
      <div className="mb-4 flex justify-between items-center">
        <button 
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg ${currentPage === 0 ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white'}`}
        >
          Anterior
        </button>
        
        <div className="flex items-center space-x-2">
          {Array.from({ length: Math.min(5, pageCount) }).map((_, index) => {
            // Mostrar páginas cercanas a la actual
            let pageToShow;
            if (pageCount <= 5) {
              pageToShow = index;
            } else if (currentPage < 3) {
              pageToShow = index;
            } else if (currentPage > pageCount - 4) {
              pageToShow = pageCount - 5 + index;
            } else {
              pageToShow = currentPage - 2 + index;
            }

            return (
              <button
                key={pageToShow}
                onClick={() => goToPage(pageToShow)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentPage === pageToShow ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {pageToShow + 1}
              </button>
            );
          })}
          
          {pageCount > 5 && currentPage < pageCount - 3 && (
            <span className="mx-1">...</span>
          )}
          
          {pageCount > 5 && currentPage < pageCount - 3 && (
            <button
              onClick={() => goToPage(pageCount - 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === pageCount - 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {pageCount}
            </button>
          )}
        </div>
        
        <button 
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
          className={`px-4 py-2 rounded-lg ${currentPage === pageCount - 1 ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white'}`}
        >
          Siguiente
        </button>
      </div>

      {/* Lista de órdenes en formato tarjeta */}
      <div className="space-y-3 mb-4">
        {paginatedData.map((order, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-600">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{order.Nombre}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Millares:</span> {order.Millares}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">F. Entrega:</span> {formatApiDate(order.F_Entrega)}
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.Estado)}`}>
                  {order.Estado}
                </span>
                <div className={`mt-1 text-sm ${getDaysColor(order.DiasTranscurridos)}`}>
                  {order.DiasTranscurridos} días
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador de página actual */}
      <div className="mb-4 text-center text-gray-600">
        Página {currentPage + 1} de {pageCount}
      </div>

      {/* Footer simplificado */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-green-600 text-white p-3 rounded-lg text-center">
          <div className="text-xl font-bold">{ordersData.length}</div>
          <div className="text-xs">Órdenes</div>
        </div>
        <div className="bg-blue-600 text-white p-3 rounded-lg text-center">
          <div className="text-xl font-bold">
            {ordersData.filter(order => order.Status === 'EN').length}
          </div>
          <div className="text-xs">Entregadas</div>
        </div>
        <div className="bg-yellow-600 text-white p-3 rounded-lg text-center">
          <div className="text-xl font-bold">
            {ordersData.filter(order => parseInt(order.DiasTranscurridos) > 3).length}
          </div>
          <div className="text-xs">Atención</div>
        </div>
        <div className="bg-purple-600 text-white p-3 rounded-lg text-center">
          <div className="text-xl font-bold">
            {ordersData.reduce((sum, order) => sum + parseInt(order.Millares), 0)}
          </div>
          <div className="text-xs">Millares totales</div>
        </div>
      </div>
    </div>
  );
};

export default ProductionOrdersMobile;