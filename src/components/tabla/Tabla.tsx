"use client"
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Tooltip } from "@mui/material";
import { RightAlignedContainer, StyledPagination, StyledTableCell, StyledTableRow, StyledTextField } from "@/utils/MaterialUI";
import { IoPencil } from "react-icons/io5";
import './Tabla.css'


interface DataTableProps {
    data: Record<string, any>[];
    mostrarRegistro?: (id: number) => void;
    verBotonEditar?: boolean;
}

const Tabla: React.FC<DataTableProps> = ({ data, mostrarRegistro, verBotonEditar }) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    if (!data || data.length === 0) return <p>No hay datos disponibles</p>;

    const columns = data.length > 0 ? Object.keys(data[0]).filter(column => column !== 'id') : [];


    // Filtrar datos según la búsqueda
    const filteredData = data.filter((row) =>
        columns.some((column) => String(row[column]).toLowerCase().includes(search.toLowerCase()))
    );

    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
    const visibleRows = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handleChangePage = (
        event: React.ChangeEvent<unknown> | null,
        newPage: number,
    ) => {
        if (event) {
            setPage(newPage - 1);
        }
    };

    const VerRegistro = (id: number) => {
        if (mostrarRegistro) {
            mostrarRegistro(id);
        }
    };

    return (
        <div className="Tabla">
            <StyledTextField
                label="Buscar"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer component={Paper} sx={{ backgroundColor: "#1f2130" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell key={column}>{column}</StyledTableCell>
                            ))}
                            {(verBotonEditar) && (
                                <StyledTableCell align="center" style={{ width: 150 }}>ACCIONES</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => (
                            <StyledTableRow key={index}>
                                {columns.map((column) => (
                                    <StyledTableCell key={column}>{row[column]}</StyledTableCell>
                                ))}

                                {verBotonEditar && (
                                    <StyledTableCell align="center" style={{ width: 150 }}>
                                        <Tooltip title="Editar o ver información" disableInteractive>
                                            <span className="Boton_Editar" onClick={() => VerRegistro(row.id)}> 
                                                <IoPencil  style={{ cursor: "pointer" }} />
                                                Editar
                                            </span>
                                        </Tooltip>
                                    </StyledTableCell>
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <RightAlignedContainer>
                <StyledPagination
                    color='primary'
                    count={totalPages}
                    page={page + 1}
                    onChange={(event, newPage) => handleChangePage(event, newPage)}
                />
            </RightAlignedContainer>
        </div>
    );
};

export default Tabla