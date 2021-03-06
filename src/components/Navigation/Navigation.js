import { Container, List, NavigationWrapper } from './NavigationStyles';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const Navigation = ({items = [], RightElement}) => {
    const {t} = useTranslation();
    return(
        <Container>
            <NavigationWrapper>
                <List>
                    {items.map(item => (
                        <li key={item.to}>
                            <Link to={item.to}>{t(item.content)}</Link>
                        </li>
                    ))}
                </List>
                {RightElement}
            </NavigationWrapper>
        </Container>
    );
}

Navigation.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Navigation;