import { Routes, Route } from "react-router-dom";
import ProductionOrderForm from "../views/ProductionOrderForm";
import ProductionOrdersDisplay from "../views/ProductionOrdersDisplay";
import ProductionOrdersMobile from "../views/ProductionOrdersMobile";


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={
        <main className="min-h-screen p-6">
          <ProductionOrderForm />
        </main>}
      />
      <Route path="/orders" element={<ProductionOrdersDisplay />} />
      <Route path="/ordersMobile" element={<ProductionOrdersMobile />} />
    </Routes>
      
    </>
  )
}

export default App
