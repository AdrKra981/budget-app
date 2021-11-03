import styled from 'styled-components';
import Wrapper from '../Wrapper';

export const Container = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.colors.gray.light};
    padding: ${({theme}) => theme.spacing.sm}px 0;
    justify-content: space-between;
`;

export const List = styled.ul`
    display: flex;
`;

export const NavigationWrapper = styled(Wrapper)`
    display: flex;
    justify-content: space-between;
`;
