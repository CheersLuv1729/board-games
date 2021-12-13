

interface IBoardProps {
    width: number;
    height: number;
    colors: (x: number, y: number) => string;


}

interface ISquareProps { 
    color: string;
}

const Square = (props: ISquareProps) => {
    return <>
        <div style={{backgroundColor: props.color, aspectRatio: "1", width: "100%"}}>

        </div>
    </>;
}

const Board = (props: IBoardProps) => {

    Array.from(Array(10).keys()).map((v, i) => {
        console.log(i);
        return i;
    });

    return <>
        <div style={{display: "grid", gridTemplateColumns: `repeat(${props.width}, auto)`, width: "100%"}}>
            {Array.from(Array(props.height).keys()).map((v, y) => 
                Array.from(Array(props.width).keys()).map((v, x) => {
                    return <Square key={`x:${x},y:${y}`} color={props.colors(x, y)} />;
                })
            )}

        </div>
    </>;
}

const TestBoard = () => {
    //    <Board width={7} height={6} colors={(x, y) => (x+y)%2 ? "#6F4E37" : "#FFFDD0"}  />
    return <div style={{width: "400px"}}>
        <Board width={7} height={6} colors={(x, y) => "blue"}  />
    </div>
}


export {
    Board,
    TestBoard,
}