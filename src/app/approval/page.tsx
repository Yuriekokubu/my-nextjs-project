"use client";

import React, { useEffect } from "react";
import { useBudget } from "@/context/BudgetContext";
import { formatDecimal } from "@/lib/format-decimal";
import { updateStatusBudget } from "@/services/budget-item";

const BudgetApprovalDataTable: React.FC = () => {
	const { budgetRequests, refreshBudgetRequests } = useBudget();

	useEffect(() => {
		refreshBudgetRequests();
	}, [refreshBudgetRequests]);

	const handleApprove = async (id: number) => {
		try {
			await updateStatusBudget(id, { status: "APPROVED" });
			alert("Budget request approved successfully!");
			refreshBudgetRequests();
		} catch (error) {
			console.error("Error approving budget request:", error);
			alert("Failed to approve budget request.");
		}
	};

	const handleReject = async (id: number) => {
		try {
			await updateStatusBudget(id, { status: "REJECTED" });
			alert("Budget request rejected successfully!");
			refreshBudgetRequests();
		} catch (error) {
			console.error("Error rejecting budget request:", error);
			alert("Failed to reject budget request.");
		}
	};

	const pendingRequests = budgetRequests.filter((request) => request.status === "PENDING");

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Owner_ID</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{pendingRequests.map((request) => (
						<tr key={request.id}>
							<td className="px-6 py-4 whitespace-nowrap text-center">{request.id}</td>
							<td className="px-6 py-4 whitespace-nowrap text-center">
								<span className="font-bold">{request.title}</span> x {request.quantity} Units
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-center">{formatDecimal(request.amount)}</td>
							<td className="px-6 py-4 whitespace-nowrap text-center">{request.status}</td>
							<td className="px-6 py-4 whitespace-nowrap text-center">{request.owner_id}</td>
							<td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
								{request.status === "PENDING" && (
									<>
										<button
											className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
											onClick={() => handleApprove(request.id)}
										>
											Approve
										</button>
										<button
											className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
											onClick={() => handleReject(request.id)}
										>
											Reject
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default BudgetApprovalDataTable;
