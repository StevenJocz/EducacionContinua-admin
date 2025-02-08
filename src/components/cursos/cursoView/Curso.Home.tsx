"use client";
import { CursosProvider } from '@/context/Curso.context'
import React from 'react'
import Curso from './Curso'

const HomeCurso = () => {
    return (
        <CursosProvider>
            <Curso />
        </CursosProvider>
    )
}

export default HomeCurso