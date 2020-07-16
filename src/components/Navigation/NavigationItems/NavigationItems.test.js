import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
import React from "react";

configure({
    adapter: new Adapter()
});

describe('<NavigationItems />', () => {
    it('should render two <NavigationItem /> if not authenticated',
        () => {
            const wrapper = shallow(<NavigationItems />);
            expect(wrapper.find(NavigationItem))
                .toHaveLength(2);
        });

    it('should render three <NavigationItem /> if authenticated',
        () => {
            const wrapper = shallow(<NavigationItems isAuthenticated/>);
            expect(wrapper.find(NavigationItem))
                .toHaveLength(3);
        });
});