import styled from "styled-components";
import './Button.css'

const StyledButton = styled.button` 
border-radius: 2px;
cursor:pointer;
border:none;
margin:0;
margin-top:.5rem;
padding:.3rem 1rem;
overflow:hidden;
margin-right:15px;
`
const Button = ({ buttonText,mode,click }) => {
    return (
        <StyledButton className={mode ? "styled-button-light" : "styled-button-dark"} onClick={click} > 
            <p className="button-text">{buttonText}</p>
        </StyledButton>
    )
}
export default Button;