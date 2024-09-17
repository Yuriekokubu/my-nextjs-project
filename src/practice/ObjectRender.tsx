function ObjectRender(props: {
    title: string;
    amount?: number;
}) {
    return (
        <div>
            <h1>Task: {props.title}</h1>
            <p>${props.amount ? props.amount : "-"}</p>
        </div>
    );
}

export default ObjectRender