import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    border: 2px solid black;
    width: 100%;
`;

export default function Button(props) {
    return (
        <StyledInput {...props} />
    )
}