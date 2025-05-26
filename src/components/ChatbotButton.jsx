import React, { useState } from 'react';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Hola, ¿qué vamos a hacer hoy?');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón del chatbot */}
      <button 
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        onClick={toggleChat}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-t-lg rounded-l-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Encabezado del chat */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Asistente Virtual</h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 p-4 overflow-y-auto h-60">
            <div className="mb-4">
              <div className="bg-blue-100 text-gray-800 p-3 rounded-lg max-w-xs">
                {message}
              </div>
            </div>
          </div>

          {/* Área de entrada (simulada) */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled
              />
              <button 
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 disabled:opacity-50"
                disabled
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;