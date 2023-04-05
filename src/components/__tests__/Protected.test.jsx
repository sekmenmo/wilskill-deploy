import Protected from "../Protected";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';

// jest.mock("../../context/AuthContext", () => ({ UserAuth: () => 
//     {return {user: {displayName: 'Jeff', email: 'example@gmail.com', location: 'Dublin', tripName: 'Example trip'}, logOut: {}} } 
// }));

jest.mock("../../context/AuthContext");

test("Protected", () => {
    UserAuth.mockReturnValueOnce({user: {displayName: 'Jeff', email: 'example@gmail.com', location: 'Dublin', tripName: 'Example trip'}, logOut: {}} );
    render(<BrowserRouter><Protected/></BrowserRouter>);
})

// TIMES OUT??
// test("Protected no name", () => {
//     UserAuth.mockReturnValueOnce({user: null});
//     render(<BrowserRouter><Protected/></BrowserRouter>);
// })