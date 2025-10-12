/**
 * This component provides reusable header that will be at the top of all input methods.
 */

import { InputHeader } from "./inputHeader.Types";
import React from "react";

const InputHeaderComponent: React.FC<InputHeader> = ({ header, description, model }) => {
    return (
        <div className="input-header-container flex flex-col justify-center items-center my-4 px-6 py-3">
            <h1 className="input-header text-4xl md:text-5xl font-bold text-success mb-4">
                {header}
            </h1>
            <div className="input-desc text-base text-gray-900 mb-3">
                {description}
            </div>
            <div className="model text-md text-gray-500 font-bold">
                {`Model used: `}{model}
            </div>
        </div>
    )
}

export default InputHeaderComponent;