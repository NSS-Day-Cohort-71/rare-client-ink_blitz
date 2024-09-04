import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Rare } from "./Rare"
import "./index.css"
import Modal from 'react-modal'

Modal.setAppElement('#root')


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Rare />
    </BrowserRouter>
)
