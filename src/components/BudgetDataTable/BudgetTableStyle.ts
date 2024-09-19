import { Pencil } from "lucide-react";
import styled from "styled-components";

export const TableContainer = styled.div`
	overflow-x: auto;
	padding-left: 5rem;
	padding-right: 5rem;
`;

export const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

export const StyledTableHeader = styled.th`
	background-color: #f7f7f7;
	padding: 12px;
	font-weight: bold;
	text-align: left;
	cursor: pointer;
	text-align: left;
	&:hover {
		background-color: #e5e5e5;
	}
`;

export const StyledTableRow = styled.tr`
	border-bottom: 1px solid #ddd;

	&:hover {
		background-color: #f1f1f1;
	}
`;

export const StyledTableCell = styled.td`
	text-align: left;
	padding: 12px;
`;

export const EditIcon = styled(Pencil)`
	transition: color 0.2s;
	cursor: pointer;

	&:hover {
		color: #0070f3;
	}
`;

export const SortArrow = styled.span`
	margin-left: 5px;
`;

export const BoldText = styled.span`
	font-weight: bold;
`;

export const StatusCell = styled(StyledTableCell) <{ status: string }>`
  color: ${({ status }) => {
        switch (status) {
            case "REJECTED":
                return "#333"; // Softer white color for text
            case "APPROVED":
                return "#333"; // Softer white color for text
            case "PENDING":
                return "#333"; // Softer black color for text
            default:
                return "#333"; // Softer black color for text
        }
    }};
  
  background-color: ${({ status }) => {
        switch (status) {
            case "REJECTED":
                return "#f5c6c6"; // Softer light coral background
            case "APPROVED":
                return "#c3e6cb"; // Softer light green background
            case "PENDING":
                return "#fff3cd"; // Softer yellow background
            case "IN_PROGRESS":
                return "#d1ecf1"; // Softer light blue background
            case "ON_HOLD":
                return "#e2e3e5"; // Softer light gray background
            default:
                return "transparent";
        }
    }};
`;