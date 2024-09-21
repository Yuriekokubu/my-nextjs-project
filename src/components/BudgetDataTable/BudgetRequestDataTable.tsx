import { useState } from "react";
import { commaNumber } from "@/lib/commaNumber";
import { BudgetRequest } from "@/models/budget-request";
import Link from "next/link";
import {
	BoldText,
	EditIcon,
	SortArrow,
	StyledTable,
	StyledTableCell,
	FloatingDeleteButton,
	StyledTableHeader,
	StyledTableRow,
	TableContainer,
	StatusCell,
	ButtonBackground,
	CheckboxLabel,
	Checkmark,
	HiddenCheckbox,
	StyledCheckbox,
	SearchInput,
} from "@/components/BudgetDataTable/BudgetTableStyle";
import { formatDateInTimezone } from "@/lib/formatDate";

interface BudgetRequestDataTableProps {
	items: BudgetRequest[];
	onDeleteSelected: (selectedIds: number[]) => void;
}

const BudgetRequestDataTable: React.FC<BudgetRequestDataTableProps> = ({ items, onDeleteSelected }) => {
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const [sortColumn, setSortColumn] = useState<keyof BudgetRequest>("id");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const [searchTerm, setSearchTerm] = useState<string>(""); // Add search state

	const handleSort = (column: keyof BudgetRequest) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	// Filter items based on search term
	const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

	const sortedItems = [...filteredItems].sort((a, b) => {
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

	const handleSelect = (id: number) => {
		setSelectedIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
	};

	const handleDelete = async () => {
		try {
			await onDeleteSelected(selectedIds);
			setSelectedIds([]); 
			alert("Items deleted successfully!");
		} catch (error) {
			console.error("Error deleting items:", error);
			alert("Failed to delete items. Please try again.");
		}
	};

	return (
		<>
			{/* Add search input */}
			<TableContainer>
				<SearchInput type="text" placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
				<StyledTable>
					<thead>
						<tr>
							<StyledTableHeader>
								<CheckboxLabel>
									<HiddenCheckbox
										type="checkbox"
										checked={selectedIds.length === items.length}
										onChange={() => setSelectedIds(selectedIds.length === items.length ? [] : items.map((item) => item.id))}
									/>
									<StyledCheckbox checked={selectedIds.length === items.length}>
										<Checkmark checked={selectedIds.length === items.length} />
									</StyledCheckbox>
								</CheckboxLabel>
							</StyledTableHeader>
							<StyledTableHeader></StyledTableHeader>
							<StyledTableHeader onClick={() => handleSort("id")}>ID {sortColumn === "id" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}</StyledTableHeader>
							<StyledTableHeader onClick={() => handleSort("title")}>Title {sortColumn === "title" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}</StyledTableHeader>
							<StyledTableHeader onClick={() => handleSort("amount")}>
								Budget {sortColumn === "amount" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}
							</StyledTableHeader>
							<StyledTableHeader onClick={() => handleSort("updated_at")}>
								Updated At {sortColumn === "updated_at" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}
							</StyledTableHeader>
							<StyledTableHeader onClick={() => handleSort("status")}>
								Status {sortColumn === "status" && <SortArrow>{sortDirection === "asc" ? "🔼" : "🔽"}</SortArrow>}
							</StyledTableHeader>
						</tr>
					</thead>
					<tbody>
						{sortedItems.map((request) => (
							<StyledTableRow key={request.id}>
								<StyledTableCell>
									<CheckboxLabel>
										<HiddenCheckbox type="checkbox" checked={selectedIds.includes(request.id)} onChange={() => handleSelect(request.id)} />
										<StyledCheckbox checked={selectedIds.includes(request.id)}>
											<Checkmark checked={selectedIds.includes(request.id)} />
										</StyledCheckbox>
									</CheckboxLabel>
								</StyledTableCell>
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
				{selectedIds.length > 0 && (
					<ButtonBackground>
						<FloatingDeleteButton onClick={handleDelete}>Delete Selected</FloatingDeleteButton>
					</ButtonBackground>
				)}
			</TableContainer>
		</>
	);
};

export default BudgetRequestDataTable;
