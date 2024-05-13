import { useState } from "react";

export default function Options ({children, value, onCount}) {
    
    return <button onClick={onCount}>{children}: {value}</button>
    }