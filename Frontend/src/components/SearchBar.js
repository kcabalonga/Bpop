import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150vh; /* Makes the container take full viewport height */
    width: 100vw; /* Makes the container take full viewport width */
`;

const Search = styled.div`
    border-radius: 50px;
    background: #E1E9F5;
    padding: 15px 25px;
    width: 386px;
    height: 75px;
    color: #A8AAAD;
    font-size: 25px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
`

const SearchBar = () => {
    return (
        <Container>
            <Search>
                what are you looking for?
            </Search>
        </Container>
    )
}

export default SearchBar;