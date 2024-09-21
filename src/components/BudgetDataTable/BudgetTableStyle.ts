import { Pencil } from "lucide-react";
import styled from "styled-components";

interface StyledCheckboxProps {
    checked: boolean;
}

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

export const FloatingDeleteButton = styled.button`
  position: fixed; /* Fixed positioning */
  bottom: 20px; /* Distance from the bottom */
  right: 20px; /* Distance from the right */
  background-color: #ff4d4d; /* Red background */
  color: white; /* White text */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 15px; /* Padding */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s; /* Transition effect for hover */

  &:hover {
    background-color: #ff1a1a; /* Darker red on hover */
  }

  &:disabled {
    background-color: #ccc; /* Gray when disabled */
    cursor: not-allowed; /* Not-allowed cursor */
  }
`;

export const ButtonBackground = styled.div`
position: fixed; /* Fixed positioning */
bottom: 20px; /* Distance from the bottom */
right: 20px; /* Distance from the right */
background-color: rgba(245, 40, 145, 0.8); /* White background with slight transparency */
border-radius: 8px; /* Rounded corners */
padding: 10px; /* Padding around the button */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
display: flex; /* Flexbox for alignment */
align-items: center; /* Center items vertically */
justify-content: center; /* Center items horizontally */
z-index: 1001; /* Above the overlay */
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;

export const StyledCheckbox = styled.span<StyledCheckboxProps>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid #000;
  border-radius: 4px;
  background: ${(props) => (props.checked ? "#007bff" : "#fff")};
  position: relative;

  &:hover {
    border-color: #007bff;
  }
`;

export const Checkmark = styled.span<{ checked: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 2px;
  transform: translate(-50%, -50%);
  opacity: ${(props) => (props.checked ? 1 : 0)};
`;

export const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  border: 1px solid #ccc; /* Add border for better visibility */
  border-radius: 4px; /* Rounded corners */
  font-size: 16px; /* Adjust font size */

  &:focus {
    border-color: #0070f3; /* Change border color on focus */
    outline: none; /* Remove default outline */
  }
`;