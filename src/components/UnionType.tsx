function Demo() {
    return (
        <div>
            <MyButton color="green">Approve</MyButton>
            <MyButton color="red">Reject</MyButton>
            <MyButton color="red">Reject 2</MyButton>
        </div>
    );
}

type Color = "green" | "red" | "blue"

type MyButtonProps = {
    color: Color;
    children: React.ReactNode;
};

function MyButton({ color, children }: MyButtonProps) {
    return <button color={color}>{children}</button>;
}

function Label({ color }: { color: Color }) {
    return <p color={color}>Label</p>;
}

export default Demo;