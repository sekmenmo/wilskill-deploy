import UserHome from "../userHome";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";


const events = [
    {ID: 1, location: 'TN', tripName: 'Rafting 1', tripType: 'Rafting', leaveDate: '2023', returnDate: '2023', description: 'Fun times!'},
    {ID: 2, location: 'TN', tripName: 'Rafting 2', tripType: 'Rafting', leaveDate: '2023', returnDate: '2023', descritpion: 'Funner times'}
];

jest.mock("../../Pages/useFetch", () => ({ useFetch: (url) => 
    {return {data: events};}
}));

test("UserHome", () => {
    var wrapper = render(<BrowserRouter> <UserHome/></BrowserRouter>);
    var textElem = wrapper.queryAllByText("All Available Events");
    expect(textElem).toHaveLength(1);
})



