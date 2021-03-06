import {BurgerBuilder} from "./BurgerBuilder";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import React from "react";


configure({
    adapter: new Adapter()
});


describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach( () =>{
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it('should render <BuildCOntrols /> when receiving ingredients',() => {
       wrapper.setProps({
           ings: {
               salad: 0
           }
       }) ;
       expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should not render <BuildCOntrols /> when receiving no ingredients',() => {
        wrapper.setProps({
            ings: null
        }) ;
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
})