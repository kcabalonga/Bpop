import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


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
    align-items: center;
    z-index: 1;
    position: relative;
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

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
`;

const SearchBar = styled.div`
    position: relative;
    width: 100%;
    align-self: center;
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
    width: 100%;
    justify-content: center;
    align-items: center;
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

const SearchButton = styled(Link)`
    margin-top: 20px;
    padding: 10px 20px;
    background: #72B6ED;
    color: white;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    align-self: center;
    text-decoration: none;
    border-radius: 25px;
    text-align: center;
    display: inline-block;
    transition: background-color 0.3s;
    &:hover {
        background-color: #5a94c8;
    }
`;

const Landing = () => {
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
        <div>
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
                <SearchButton to={`/listings?tags=${tags.join(',')}`}>Search</SearchButton>
            </SearchContainer>
            {/* <Container_Subtitle>
               Available Listings
            </Container_Subtitle> */}
        </div>
    );
};

export default Landing;