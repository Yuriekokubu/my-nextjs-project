import { useEffect, useState } from "react";

type Status = "PENDING" | "APPROVED" | "REJECTED";

type BudgetItem = {
  id: number;
  title: string;
  status: Status;
};

function delayResponse(fn: () => Promise<BudgetItem[]>) {
  // delay response between 0 - 5 seconds
  const delayInMs = Math.random() * 5 * 1000;

  return new Promise<BudgetItem[]>((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, delayInMs);
  });
}

function fetchItems(filterStatus: Status | null) {
  const params = new URLSearchParams();
  if (filterStatus) {
    params.set("status", filterStatus);
  }
  return delayResponse(() =>
    fetch("https://task-api-v2.onrender.com/items?" + params.toString())
      .then((response) => response.json())
      .then((json) => json.data)
  );
}

function DemoUseEffect() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<Status | null>(null);

  useEffect(() => {
    let valid = true;
    fetchItems(filterStatus).then((responseItems) => {
      if (valid) {
        setItems(responseItems);
      }
    });
    return () => {
      valid = false;
    };
  }, [filterStatus]);

  return (
    <div>
      <div>
        Filter status:
        <button
          className="bg-yellow-500"
          onClick={() => setFilterStatus("PENDING")}
        >
          PENDING
        </button>
        <button
          className="bg-green-500"
          onClick={() => setFilterStatus("APPROVED")}
        >
          APPROVED
        </button>
      </div>
      {items.map((item) => (
        <p key={item.id}>
          {item.title} - {item.status}
        </p>
      ))}
    </div>
  );
}

export default DemoUseEffect;
