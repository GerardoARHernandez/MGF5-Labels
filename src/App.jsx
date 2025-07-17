import { Routes, Route } from "react-router-dom"
import ProductionOrderForm from "./components/ProductionOrderForm"
import ProductionOrdersDisplay from "./components/ProductionOrdersDisplay"


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
    </Routes>
      
    </>
  )
}

export default App
