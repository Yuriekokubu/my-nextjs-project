import styled from "styled-components";
import BudgetCard from "./BudgetCard";
import { BudgetRequest } from "@/models/budget-request";

interface BudgetPanelProps {
	items: BudgetRequest[];
}

const Panel = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1.5rem;
	padding: 1rem;
	max-width: 1200px;
	margin: 0 auto;
	align-items: center;
	justify-content: center;
`;

function BudgetPanel({ items }: BudgetPanelProps) {
	const total = 10_000;
	const usedBudget = items
		.filter((request) => request.status === "APPROVED")
		.map((request) => request.amount)
		.reduce((sum, amount) => sum + amount, 0);

	const budgetData = [
		{ title: "Total Budget", value: total, bgColor: "#0070f3" }, // Blue background for Total Budget
		{ title: "Used Budget", value: usedBudget, bgColor: "#f6c1cc" }, // Soft green for Used Budget
		{ title: "Balance", value: total - usedBudget, bgColor: "#28a745" }, // Soft pink for Balance
	];

	return (
		<Panel>
			{budgetData.map((data) => (
				<BudgetCard key={data.title} title={data.title} value={data.value} bgColor={data.bgColor} />
			))}
		</Panel>
	);
}

export default BudgetPanel;
