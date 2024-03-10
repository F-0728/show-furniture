import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import { TableContainer, Table, Thead, Tbody, Tr, Td, Th } from '@chakra-ui/react';

// APIを叩くよ！！
const isError = (error: unknown): error is Error => {
    return error instanceof Error;
};

type Furniture = {
    place: string;
    characters: string[];
    //lack: any;
};

const columns: string[] = ["place", "characters"];

const BasicTable = () => {
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

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    {columns.map((column) => (
                        <Th key={column}>{column}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {furnitureData.map((furniture) => (
                    <Tr>
                        <Td>{furniture.place}</Td>
                        <Td>{furniture.characters.join(", ")}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default BasicTable;

