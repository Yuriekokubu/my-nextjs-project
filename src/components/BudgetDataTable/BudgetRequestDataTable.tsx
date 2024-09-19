import { useState } from "react";
import { commaNumber } from "@/lib/commaNumber";
import { BudgetRequest } from "@/models/budget-request";
import Link from "next/link";
import { BoldText, EditIcon, SortArrow, StyledTable, StyledTableCell, StyledTableHeader, StyledTableRow, TableContainer, StatusCell } from "@/components/BudgetDataTable/BudgetTableStyle";
import { formatDateInTimezone } from "@/lib/formatDate"; // Adjust import path as needed

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
						<StyledTableHeader onClick={() => handleSort("updated_at")}>
							Updated At {sortColumn === "updated_at" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}
						</StyledTableHeader>
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
							<StyledTableCell>{commaNumber(request.amount)}</StyledTableCell>
							<StyledTableCell>{formatDateInTimezone(request.updated_at)}</StyledTableCell>
							<StatusCell status={request.status}>{request.status}</StatusCell>
						</StyledTableRow>
					))}
				</tbody>
			</StyledTable>
		</TableContainer>
	);
};

export default BudgetRequestDataTable;
