import React, { useState } from "react";
import styled from "styled-components";
import CloudIcon1 from '../images/Cloud1.svg';
import CloudIcon2 from '../images/Cloud2.svg';

const Landing = styled.div`
    width: 100vw;
    height: 100vh;
    background: #F5FAFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 0;
    margin: 0;
`;

const Container = styled.div`
    display: flex;
    width: 735px;
    height: 405px;
    flex-direction: column;
    justify-content: center;
    color: #72B6ED;
    text-align: center;
    font-family: "Hammersmith One";
    font-size: 75px;
    font-weight: 400;
    align-self: center;
    margin-top: -10rem;
    z-index: 1;
`;

// const Container_Subtitle = styled.div`
//     display: flex;
//     width: 735px;
//     height: 405px;
//     flex-direction: column;
//     justify-content: center;
//     color: #72B6ED;
//     text-align: center;
//     font-family: "Hammersmith One";
//     font-size: 75px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
//     align-self: center;
//     margin-top: -10rem
//     z-index: 1;
// `;

const Cloud1 = styled.div`
    position: absolute;
    background-image: url(${CloudIcon1});
    width: 35rem;
    height: 30rem;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
    left: 0%;
    top: 50%;
`;

const Cloud2 = styled.div`
    position: absolute;
    background-image: url(${CloudIcon2});
    width: 35rem;
    height: 30rem;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
    right: -17%;
    bottom: 50%;
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
`;

const SearchBar = styled.div`
    position: relative;
    width: 400px;
`;

const SearchInput = styled.input`
    border-radius: 50px;
    background: #E1E9F5;
    padding: 15px 25px;
    width: 100%;
    height: 75px;
    color: #A8AAAD;
    font-size: 20px;
    font-family: 'Inter', sans-serif;
    outline: none;
    border: none;
    text-align: center;
`;

const Dropdown = styled.ul`
    position: absolute;
    top: 80px;
    width: 100%;
    background: white;
    list-style-type: none;
    margin: 0;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 10px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
`;

const DropdownItem = styled.li`
    padding: 10px 15px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const TagsContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Tag = styled.div`
    background: #72B6ED;
    color: white;
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
`;

const RemoveTag = styled.span`
    margin-left: 10px;
    cursor: pointer;
    font-weight: bold;
`;

const SearchButton = styled.a`
    margin-top: 20px;
    padding: 10px 20px;
    background: #72B6ED;
    color: white;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    border-radius: 25px;
    text-align: center;
    display: inline-block;
    transition: background-color 0.3s;
    &:hover {
        background-color: #5a94c8;
    }
`;

const LandingPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([
        "accessory",
        "athletic",
        "graphic",
        "hat",
        "jacket",
        "long-sleeve",
        "shirt",
        "short-sleeve",
        "shorts",
        "socks",
        "vintage",
        "modern",
        "object",
    ]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddTag = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
        setSearchTerm("");
    };

    const handleRemoveTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
        <Landing>
            <Cloud1 />
            <Container>
                UCLA's own buy and sell platform
            </Container>
            <SearchContainer>
                <SearchBar>
                    <SearchInput
                        type="text"
                        placeholder="Add filters (e.g., shirts, objects, etc)"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    {searchTerm && (
                        <Dropdown>
                            {suggestions
                                .filter((suggestion) =>
                                    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((suggestion, index) => (
                                    <DropdownItem
                                        key={index}
                                        onClick={() => handleAddTag(suggestion)}
                                    >
                                        {suggestion}
                                    </DropdownItem>
                                ))}
                        </Dropdown>
                    )}
                </SearchBar>
                <TagsContainer>
                    {tags.map((tag, index) => (
                        <Tag key={index}>
                            {tag}
                            <RemoveTag onClick={() => handleRemoveTag(tag)}>×</RemoveTag>
                        </Tag>
                    ))}
                </TagsContainer>
                <SearchButton href={`homepage.html?tags=${tags.join(',')}`}>Search</SearchButton>
            </SearchContainer>
            <Cloud2 />
            {/* <Container_Subtitle>
               Available Listings
            </Container_Subtitle> */}
        </Landing>
    );
};

export default LandingPage;