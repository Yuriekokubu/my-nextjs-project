import styled from "styled-components";
import { formatDecimal } from "@/lib/format-decimal";

interface BudgetCardProps {
	title: string;
	value: number;
	bgColor: string;
}

const Card = styled.div<{ bgColor: string }>`
	background-color: ${(props) => props.bgColor};
	color: #fff;
	padding: 1.5rem;
	border-radius: 0.5rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	text-align: center;
`;

const Title = styled.p`
	font-size: 1.125rem;
	font-weight: 600;
	color: black;
	margin-bottom: 0.5rem;
`;

const Value = styled.p`
	font-size: 1.5rem;
	font-weight: 700;
	color: white;
`;

function BudgetCard({ title, value, bgColor }: BudgetCardProps) {
	return (
		<Card bgColor={bgColor}>
			<Title>{title}</Title>
			<Value>{formatDecimal(value)}</Value>
		</Card>
	);
}

export default BudgetCard;
