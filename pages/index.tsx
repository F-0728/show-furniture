import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import { TableContainer, Table, Thead, Tbody, Tr, Td, Th } from '@chakra-ui/react';
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table";

// APIを叩くよ！！
const isError = (error: unknown): error is Error => {
    return error instanceof Error;
};

type Furniture = {
    place: string;
    characters: string[];
    lack: any;
};

const columns: ColumnDef<Furniture, any>[] = [
    {
        accessorKey: 'place',
        header: '設置場所',
    },
    {
        accessorKey: 'characters',
        header: 'キャラクター',
    },
    {
        accessorKey: 'lack',
        header: '不足',
    },
];

const BasicTable: React.FC = () => {
    const [furnitureData, setFurnitureData] = useState<(Furniture | null)[]>([]);

    const fetchFurniture = async () => {
        try {
            const response = axios.get("http://localhost:8000/res/");
            setFurnitureData((await response).data.furniture);
        } catch (e) {
            if (isError(e)) {
                console.error(e.message);
            }
        }
    };

    useEffect(() => {
        fetchFurniture();
    }, []);

    const table = useReactTable({
        columns,
        data: furnitureData,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <TableContainer>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <Td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                );
                            })}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default BasicTable;

