interface GreetingOptions {
    name: string;
    age: number;
    format: "Default" | "Table";
}

function greeting(options: GreetingOptions): void {
    const { name, age, format } = options;

    if (format === "Table") {
        console.log(`Hi Name: ${name}, Age: ${age}`);
    }
    else {
        console.log("Unknown format");
    }
}

greeting({
    name: "Alice",
    age: 18,
    format: "Table"
});
