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

const fotoPredeterminada = "https://i.pinimg.com/originals/b8/08/07/b8080715de29eabbbba78c1b2c9d70be.png";

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
    const sortedData = [...filteredData].reverse(); // Invierte el orden
    const visibleRows = sortedData.slice(startIndex, endIndex);


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

    const renderActivo = (isActive: boolean) => {
        return (
            <div className={`Table_Estado ${isActive ? "Activo" : "NoActivo"}`}>
                {isActive ? "Activo": "No activo"}
            </div>
        );
    };

    return (
        <div className="Tabla">
            <StyledTextField
                label="Buscar"
                variant="outlined"
                placeholder="Buscar por cualquier campo..."
                size="small"
                fullWidth
                margin="dense"
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="Table_Total">
                <h6 className="Table_Total_P">Total registros: {filteredData.length}</h6>
            </div>
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
                                {columns.map((column) => {
                                    let cellContent = row[column];
                                    if (column === 'foto') {
                                        const imageUrl = row[column];
                                        cellContent = <img className='Tabla_Imagen' src={imageUrl ? imageUrl : fotoPredeterminada} alt="Foto de perfil" />;
                                    }
                                    if (column === 'estado') {
                                        cellContent = renderActivo(row[column]);
                                    }
                                    return <StyledTableCell key={column}>{cellContent}</StyledTableCell>;
                                })}

                                {verBotonEditar && (
                                    <StyledTableCell align="center" style={{ width: 150 }}>
                                        <Tooltip title="Editar o ver información" disableInteractive>
                                            <span className="Boton_Editar" onClick={() => VerRegistro(row.id)}>
                                                <IoPencil style={{ cursor: "pointer" }} />
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