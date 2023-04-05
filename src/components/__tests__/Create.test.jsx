import { render, fireEvent, renderHook } from "@testing-library/react";
import Create from '../Create';
import "@testing-library/jest-dom";
import axios from 'axios';


jest.mock("axios");

jest.mock("../../Pages/stringWrapper", () => ({ stringWrapper: (str) => 
    {return str;}}));
  

test("Display text at the top of the screen", () => {
    var wrapper = render(<Create/>)
    var textElem = wrapper.queryAllByText("Create a New Event");
    expect(textElem).toHaveLength(1);
});

test("Display all options for trip type", () => {
    var wrapper = render(<Create/>);
    var listElem = wrapper.getAllByTestId('typeOpt');
    expect(listElem).toHaveLength(4);
});

test("Display submit button", () => {
    var wrapper = render(<Create/>);
    var buttonElem = wrapper.queryAllByText("Add trip", {selector: 'button'});
    expect(buttonElem).toHaveLength(1);
});

test("Process change in a string input component", () => {
    var wrapper = render(<Create/>);
    const tripTitle = wrapper.getByTestId('tripTitle');
    fireEvent.change(tripTitle, {target: { value: "New title"}});
    expect(tripTitle.value).toEqual("New title");

    const tripLoc = wrapper.getByTestId('location');
    fireEvent.change(tripLoc, {target: { value: "TN"}});
    expect(tripLoc.value).toEqual("TN");

    const tripDesc = wrapper.getByTestId('desc');
    fireEvent.change(tripDesc, {target: { value: "New desc" }});
    expect(tripDesc.value).toEqual("New desc");
});

test("Process change in a date input component", () => {
    var wrapper = render(<Create/>);
    const tripLeave = wrapper.getByTestId('tripLeave');
    const tripReturn = wrapper.getByTestId('tripReturn');
    fireEvent.change(tripLeave, {target: { value: '2020-08-28' }});
    fireEvent.change(tripReturn, {target: { value: '2020-08-30' }});
    expect(tripLeave.value).toEqual('2020-08-28');
    expect(tripReturn.value).toEqual('2020-08-30');
});

test("Process change in an option input component", () => {
    var wrapper = render(<Create/>);
    var tripType = wrapper.getByTestId('tripType');
    fireEvent.change(tripType, { target: { value: 1 }})
    var listElem = wrapper.getAllByTestId('typeOpt');
    expect(listElem[0].selected).toBeTruthy();
});


test("Submit button with accept, reject, blank promise", () => {
    var wrapper = render(<Create/>)
    const tripTitle = wrapper.getByTestId('tripTitle');
    fireEvent.change(tripTitle, {target: { value: "New title"}});
    expect(tripTitle.value).toEqual("New title");

    const tripLoc = wrapper.getByTestId('location');
    fireEvent.change(tripLoc, {target: { value: "TN"}});
    expect(tripLoc.value).toEqual("TN");

    const tripDesc = wrapper.getByTestId('desc');
    fireEvent.change(tripDesc, {target: { value: "New desc" }});
    expect(tripDesc.value).toEqual("New desc");

    const tripLeave = wrapper.getByTestId('tripLeave');
    const tripReturn = wrapper.getByTestId('tripReturn');
    fireEvent.change(tripLeave, {target: { value: '2020-08-28' }});
    fireEvent.change(tripReturn, {target: { value: '2020-08-30' }});
    expect(tripLeave.value).toEqual('2020-08-28');
    expect(tripReturn.value).toEqual('2020-08-30');

    var tripType = wrapper.getByTestId('tripType');
    fireEvent.change(tripType, { target: { value: 1 }})
    var listElem = wrapper.getAllByTestId('typeOpt');
    expect(listElem[0].selected).toBeTruthy();

    var buttonElem = wrapper.queryAllByText("Add trip", {selector: 'button'});
    axios.post.mockResolvedValueOnce(Promise.resolve( {status: 200, res: "Good"}))
    fireEvent.click(buttonElem[0]);
    expect(axios.post).toBeCalledWith("http://localhost:3001/trips/addtrip", {"description": "New desc", "leaveDate": "2020-08-28", "location": "TN", "returnDate": "2020-08-30", "tripName": "New title", "tripType": ""});

    axios.post.mockRejectedValueOnce(new Error( {status: 500, res: "Bad"}));
    fireEvent.click(buttonElem[0]);
    expect(axios.post).toBeCalledWith("http://localhost:3001/trips/addtrip", {"description": "New desc", "leaveDate": "2020-08-28", "location": "TN", "returnDate": "2020-08-30", "tripName": "New title", "tripType": ""});

    axios.post.mockResolvedValueOnce(Promise.resolve());
    fireEvent.click(buttonElem[0]);
    expect(axios.post).toBeCalledWith("http://localhost:3001/trips/addtrip", {"description": "New desc", "leaveDate": "2020-08-28", "location": "TN", "returnDate": "2020-08-30", "tripName": "New title", "tripType": ""});
});


test("Test pending state change", () => {
    var { result } = renderHook(() => Create());
    expect(result.current.isPending).toBeFalsy();
})