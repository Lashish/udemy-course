import { useNavigate } from "react-router";
import Button from "./Button";
import styles from "./Button.module.css"
// eslint-disable-file 
function BackButton() {
    const navigate = useNavigate()
    return (
        <Button type="back" onClick={(e) => {
            e.preventDefault();
            navigate(-1);
        }}>&larr; Back</Button>
    )
}

export default BackButton;