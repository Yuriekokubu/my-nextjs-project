import { commaNumber } from "@/lib/commaNumber";
import { Card, Title, Value } from "./BudgetCardStyle";

interface BudgetCardProps {
	title: string;
	value: number;
	bgColor: string;
}

function BudgetCard({ title, value, bgColor }: BudgetCardProps) {
	return (
		<Card $bgColor={bgColor}>
			<Title>{title}</Title>
			<Value>{commaNumber(value)}</Value>
		</Card>
	);
}

export default BudgetCard;
