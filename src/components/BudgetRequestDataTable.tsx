import { useState } from "react";
import styled from "styled-components";
import { formatDecimal } from "@/lib/format-decimal";
import { BudgetRequest } from "@/models/budget-request";
import { Pencil } from "lucide-react";
import Link from "next/link";

// Styled Components for the table
const TableContainer = styled.div`
	overflow-x: auto;
`;

const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const StyledTableHeader = styled.th`
	background-color: #f7f7f7;
	padding: 12px;
	font-weight: bold;
	text-align: left;
	cursor: pointer;

	&:hover {
		background-color: #e5e5e5;
	}
`;

const StyledTableRow = styled.tr`
	border-bottom: 1px solid #ddd;

	&:hover {
		background-color: #f1f1f1;
	}
`;

const StyledTableCell = styled.td`
	text-align: center;
	padding: 12px;
`;

const EditIcon = styled(Pencil)`
	transition: color 0.2s;
	cursor: pointer;

	&:hover {
		color: #0070f3;
	}
`;

const SortArrow = styled.span`
	margin-left: 5px;
`;

const BoldText = styled.span`
	font-weight: bold;
`;

interface BudgetRequestDataTableProps {
	items: BudgetRequest[];
}

const BudgetRequestDataTable: React.FC<BudgetRequestDataTableProps> = ({ items }) => {
	const [sortColumn, setSortColumn] = useState<keyof BudgetRequest>("id");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const handleSort = (column: keyof BudgetRequest) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	const sortedItems = [...items].sort((a, b) => {
		const valueA = a[sortColumn];
		const valueB = b[sortColumn];

		if (typeof valueA === "string" && typeof valueB === "string") {
			return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
		}
		if (typeof valueA === "number" && typeof valueB === "number") {
			return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
		}
		return 0;
	});

	return (
		<TableContainer>
			<StyledTable>
				<thead>
					<tr>
						<StyledTableHeader>{""}</StyledTableHeader>
						<StyledTableHeader onClick={() => handleSort("id")}>ID {sortColumn === "id" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}</StyledTableHeader>
						<StyledTableHeader onClick={() => handleSort("title")}>Title {sortColumn === "title" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}</StyledTableHeader>
						<StyledTableHeader onClick={() => handleSort("amount")}>Budget {sortColumn === "amount" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}</StyledTableHeader>
						<StyledTableHeader onClick={() => handleSort("status")}>Status {sortColumn === "status" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}</StyledTableHeader>
					</tr>
				</thead>
				<tbody>
					{sortedItems.map((request) => (
						<StyledTableRow key={request.id}>
							<StyledTableCell>
								<Link href={`/edit/${request.id}`} passHref>
									<EditIcon />
								</Link>
							</StyledTableCell>
							<StyledTableCell>{request.id}</StyledTableCell>
							<StyledTableCell>
								<BoldText>{request.title}</BoldText> x {request.quantity} Units
							</StyledTableCell>
							<StyledTableCell>{formatDecimal(request.amount)}</StyledTableCell>
							<StyledTableCell>{request.status}</StyledTableCell>
						</StyledTableRow>
					))}
				</tbody>
			</StyledTable>
		</TableContainer>
	);
};

export default BudgetRequestDataTable;
