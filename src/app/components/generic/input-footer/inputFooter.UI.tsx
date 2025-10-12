'use-client'

import { Button } from "../button-component/Button.UI"
import { InputFooter } from "./inputFooter.types"

const InputFooterComponent: React.FC<InputFooter> = ({ onClickBack, onClickGenerate, isSubmitting }) => {
    return (
        <div className="flex justify-between mt-4">
            <Button type="submit" variant="secondary" size="lg" title="Back" onClick={onClickBack}>
                Go Back
            </Button>
            <Button type="submit" variant="primary" size="lg" title="Get Insights" onClick={onClickGenerate}>
                Get Insights
            </Button>
        </div>
    )
}

export default InputFooterComponent