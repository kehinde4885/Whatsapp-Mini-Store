import React from "react";

export default function Button(props){
    const {bool,func,item,text} = props

    let classes = ["border border-blue-800 bg-blue-800 text-white"]
    let classes2= ["border border-blue-800 bg-red-800 text-white"]


    return (
        <button className={bool ? classes : classes2} onClick={handleClick}>
            {bool ? 'Add to Cart' : 'Remove From Cart'}
        </button>
    )

    function handleClick(){
        func(item)
    }
}