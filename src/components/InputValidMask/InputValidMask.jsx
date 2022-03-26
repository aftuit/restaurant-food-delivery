import React from "react"
import InputMask from "react-input-mask"
import { TextField } from "@mui/material"


const InputValidMask = props => {
    return (
        <InputMask
            mask={props.mask}
            value={props.value}
            onChange={props.onChange}
        >
            {inputProps => <TextField
                {...inputProps}
                className={props.className}
                label={props.label} />}
        </InputMask>
    )
}

export default InputValidMask
