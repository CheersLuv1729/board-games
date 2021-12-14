import { useState } from "react";


type IBoardProps = React.PropsWithChildren<{
    width: number;
    height: number;
}>;

interface ISquareProps { 
    color: string;
}

const Square = (props: ISquareProps) => {
    return <>
        <div style={{backgroundColor: props.color, aspectRatio: "1", width: "100%"}} />
    </>;
}

const Board = (props: IBoardProps) => {

    return <>
        <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${props.width}, auto)`,
            gridTemplateRows: `repeat(${props.height}), auto`,
            width: "100%",
            borderRadius: "1%",
            overflow: "hidden",
        }}>
            {props.children}
        </div>
    </>;
}

function Range(arg0: number, arg1?: number, stride = 1) : Array<number>{
    if(arg1 == undefined){
        return Range(0, arg0, stride);
    }

    const res = [];
    for(let i = arg0; i < arg1; i += stride){
        res.push(i);
    }

    return res;
}

interface IFourRowBoardProps {
    state: (number | undefined)[][];
    isTurn: boolean;
    onMove: (x: number) => void;

}

interface IFourRowColorScheme {
    boardColor: [number, number, number],
    p1Color: [number, number, number],
    p2Color: [number, number, number],
}

const FourRowBoard = (props: IFourRowBoardProps) => {

    const [hover, setHover] = useState<number | undefined>(undefined);

    return <>
        <Board width={7} height={6} >
            {Range(6).map((y) => 
                Range(7).map((x) => {

                    const colorScheme : IFourRowColorScheme = {
                        boardColor: [0  , 0  , 255],
                        p1Color:    [255, 0  , 0  ],
                        p2Color:    [255, 255, 0  ],
                    }

                    // Remember that the board is rendered top down!

                    const piece = props.state[y][x];

                    const toColorString = (c: [number, number, number]) => 
                        `rgb(${Number(c[0])},${Number(c[1])},${Number(c[2])})`;

                    const p1Color = toColorString(colorScheme.p1Color); // [255, 197, 217];
                    const p2Color = toColorString(colorScheme.p2Color); // [194, 242, 208];
                    const boardColor = toColorString(colorScheme.boardColor);


                    let pieceColor : string = "white";
                    if(piece != undefined)
                        pieceColor = [p1Color, p2Color][piece];
                    
                    let nextY = -1;
                    for(let i = 0; i < 6; i++){
                        if(props.state[i][x] == undefined) nextY = i;
                    }

                    if(hover == x && nextY == y)
                        pieceColor = "lightgrey";

                    return <>
                        <div 
                            style={{aspectRatio: "1", width: "100%", backgroundColor:boardColor, padding: "2.5%", boxSizing: "border-box", overflow: 'hidden'}} 
                            onMouseEnter={()=>{setHover(x)}} 
                            onMouseLeave={()=>{if(hover==x)setHover(undefined)}}
                            onClick={()=>{props.onMove(x)}}
                        >
                            <div style={{width: "100%", height: "100%", backgroundColor: pieceColor, borderRadius: "50%"}} />
                        </div>

                    </>   
                })
            )}
        </Board>
    </>;
}

class FourRowEngine {
    state: Array<Array<number | undefined>>;
    playerTurn: number;

    constructor(){
        console.log("New engine");
        this.state = [
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined, ],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined, ],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined, ],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined, ],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined, ],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined, ],
        ];

        this.playerTurn = 1;
    }

    playMove(x: number){

        for(let i = 5; i >= 0; i--){
            if(this.state[i][x] == undefined){
                console.log(this.state[i][x]);
                this.state[i][x] = this.playerTurn;
                this.playerTurn = this.playerTurn == 1 ? 0 : 1;
                return true;
            }
        }

        return false;
    }



}


const TestBoard = () => {

    const [engine] = useState(() => new FourRowEngine());
    const [state, setState] = useState(JSON.parse(JSON.stringify(engine.state)));


    return <div id="game-area" style={{width: "100%", height: "100%"}}>
        <div style={{width: "600px", margin: "auto"}}>
            <FourRowBoard onMove={x => {
                engine.playMove(x);
                setState(JSON.parse(JSON.stringify(engine.state)));
            }} state={state} isTurn={false}/>
        </div>
    </div>;
    
    return <div style={{width: "400px"}}>
        <Board width={7} height={6}>
        {Range(6).map((y) => 
            Range(7).map((x) => 
                <>
                    <Square key={`x:${x},y:${y}`} color={(x+y)%2 ? "#6F4E37" : "#FFFDD0"} />
                </>
            )
        )}
        </Board>
    </div>
}


export {
    Board,
    TestBoard,
}