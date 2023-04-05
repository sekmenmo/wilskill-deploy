import EventList from "../EventList";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

const events = [
    {ID: 1, location: 'TN', tripName: 'Rafting 1', tripType: 'Rafting', leaveDate: '2023', returnDate: '2023', description: 'Fun times!'},
    {ID: 2, location: 'TN', tripName: 'Rafting 2', tripType: 'Rafting', leaveDate: '2023', returnDate: '2023', descritpion: 'Funner times'}
];

test("Event List", () => {
    var wrapper = render(<BrowserRouter><EventList events = {events} title="All Available Events"/> </BrowserRouter>);
    var textElem = wrapper.queryAllByText("All Available Events");
    expect(textElem).toHaveLength(1);
    var stateElem = wrapper.queryAllByText("Location: TN");
    expect(stateElem).toHaveLength(2);
})
