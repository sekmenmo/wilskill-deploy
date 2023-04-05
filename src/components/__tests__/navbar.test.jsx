import NavBar from "../navbar";
import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';

jest.mock("../../context/AuthContext");



// jest.mock("../../context/AuthContext", () => ({ UserAuth: () => 
//     {return {user: {displayName: 'Jeff', email: 'example@gmail.com', location: 'Dublin', tripName: 'Example trip'}, logOut: {}} } 
// }));



test("Text presence", () => {
    UserAuth.mockReturnValueOnce({user: {displayName: 'Jeff', email: 'example@gmail.com', location: 'Dublin', tripName: 'Example trip'}, logOut: {}});
    var wrapper = render(<BrowserRouter> <NavBar/> </BrowserRouter>);
    var textElem = wrapper.queryAllByText("Vanderbilt Wilderness Skills");
    expect(textElem).toHaveLength(1);
});

test("Button presence", () => {
    UserAuth.mockReturnValueOnce({user: {displayName: 'Jeff', email: 'example@gmail.com', location: 'Dublin', tripName: 'Example trip'}, logOut: {}});
    var wrapper = render(<BrowserRouter> <NavBar/> </BrowserRouter>);
    var buttonElem = wrapper.queryAllByText("Sign-out", {selector: 'button'});
    expect(buttonElem).toHaveLength(1);

    fireEvent.click(buttonElem[0]);

});

test("Sign in button presence", () => {
    UserAuth.mockReturnValueOnce({user: {displayName: null, email: 'example@gmail.com', location: 'Dublin', tripName: 'Example trip'}, logOut: {}});
    var wrapper = render(<BrowserRouter> <NavBar/> </BrowserRouter>);
    var buttonElem = wrapper.queryAllByText("Sign-in", {selector: 'button'});
    expect(buttonElem).toHaveLength(1);

    fireEvent.click(buttonElem[0]);

});