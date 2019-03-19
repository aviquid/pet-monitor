import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    border: 2px solid black;
`;

export default function Button(props) {
    return (
        <StyledInput {...props} />
    )
}