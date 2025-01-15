import { UserEntry } from "./presentation/pages/userEntry"
import './App.css'
import { queryClient } from "./config/utils/reactQuery.utils"
import { QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Dashboard } from "./presentation/pages/dashboard"

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserEntry />} />
        <Route path="/agency" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
