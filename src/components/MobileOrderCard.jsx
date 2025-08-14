const formatApiDate = (dateStr) => {
    if (dateStr === '1900-01-01') return 'Por definir';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  };
  
export const MobileOrderCard = ({ order }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-green-600">
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
            {order.Estado}          </span>
          <div className={`mt-1 text-sm ${getDaysColor(order.DiasTranscurridos)}`}>
            {order.DiasTranscurridos} días
          </div>
        </div>
      </div>
      {order.Slabs && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Slabs:</span> {order.Slabs}
        </div>
      )}
    </div>
);