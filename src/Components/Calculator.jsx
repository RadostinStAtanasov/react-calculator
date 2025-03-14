import { useState } from "react";
import './ComponentStyle.css';

export default function Calculator() {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');

    const ops = ['/', '*', '+', '-', '.'];

    const updateCalc = value => {
        if (
            ops.includes(value) && calc === '' ||
            ops.includes(value) && ops.includes(calc.slice(-1))
        ) {
            return;
        }
        if (calc.length === 0 && value === '0') {
            return;
        }

        setCalc(calc + value);

        if (!ops.includes(value)) {
            setResult(eval(calc + value).toString());
        }
    }

    const createDigits = function() {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button onClick={() => updateCalc(i.toString())} key={i}> {i} </button>
            )
        }
        return digits;
    }
   
    const calculate = () => {
        setCalc(eval(calc).toString());
    }

    const deleteLast = () => {
        if (calc == '') {
            return;
        }

        const value = calc.slice(0, -1);

        setCalc(value);
    }

    const clearDisplay = () => {
        setCalc('');
    }


    return (
        <>
        <div className="App">
            <div className="calculator">
                <div className="display">
                    {/* {result ? <span>({result})</span> : ''}
                    &nbsp; */}
                    { calc || "0" }
                </div>
                <div className="containerAllBtns">
                    <button className="delBtn" onClick={deleteLast}>BKSP</button>
                    <button className="clearBtn" onClick={clearDisplay}>CL</button>
                <div className="containerBtns">
                    <div className="operators">
                        <button onClick={() => updateCalc('+')}>+</button>
                        <button onClick={() => updateCalc('-')}>-</button>
                        <button onClick={() => updateCalc('/')}>/</button>
                        <button onClick={() => updateCalc('*')}>*</button>
                    </div>
                    <div className="btns-0-9-point">
                        {createDigits()}
                        <button onClick={() => updateCalc('0')}>0</button>
                        <button onClick={() => updateCalc('.')}>.</button>
                        <button onClick={calculate}>=</button> 
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}