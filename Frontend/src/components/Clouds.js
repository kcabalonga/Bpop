import styled from "styled-components";
import Cloud1 from "../images/C1.svg";

const Cloud = styled.div`
    border-radius: 50px;
    background: #E1E9F5;
`

const CloudIcon = styled.div`
    background: url(${Cloud1});

`
const Clouds = () => {
    return (
        <Cloud>
        <CloudIcon/>
            what are you looking for?
        </Cloud>
    )
}

export default Clouds;