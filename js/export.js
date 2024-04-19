import { whatToMove } from "./simulation.js";

navigator.clipboard.writeText(JSON.stringify(whatToMove))
.then(()=>{alert("Copied!");});