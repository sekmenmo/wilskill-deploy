import { render, fireEvent, renderHook } from "@testing-library/react";
import EditTrip from '../EditTrip';
import "@testing-library/jest-dom";
import axios from 'axios';

jest.mock("axios");

jest.mock("../../Pages/stringWrapper", () => ({ stringWrapper: (str) => 
    {return str;}}));

jest.mock("../../Pages/useFetch", () => ({ useFetch: (url) => 
  {return {data: [{ID: 1, location: 'TN', tripName: 'Rafting 1', tripType: 'Rafting', leaveDate: '2023', returnDate: '2023', description: 'Fun times!'}]}}
}));

jest.mock("react-router-dom", () => ({ 
    ...jest.requireActual('react-router-dom'),
    useParams: () => 
        {return {id: 1}} }));
      

test("Display text at the top of the screen", () => {
    var wrapper = render(<EditTrip/>)
    var textElem = wrapper.queryAllByText("Update Trip Information for Rafting 1");
    expect(textElem).toHaveLength(1);
});

test("Display all options for trip type", () => {
    var wrapper = render(<EditTrip/>);
    var listElem = wrapper.getAllByTestId('typeOpt');
    expect(listElem).toHaveLength(4);
});

test("Display submit button", () => {
    var wrapper = render(<EditTrip/>);
    var buttonElem = wrapper.queryAllByText("Update Trip Information", {selector: 'button'});
    expect(buttonElem).toHaveLength(1);
});

test("Submit button with accept, reject, blank promise", () => {
    var wrapper = render(<EditTrip/>)
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

    var buttonElem = wrapper.queryAllByText("Update Trip Information", {selector: 'button'});
    axios.post.mockResolvedValueOnce(Promise.resolve( {status: 200, res: "Good"}))
    fireEvent.click(buttonElem[0]);
    expect(axios.post).toBeCalledWith("http://localhost:3001/trips/updatetrip", {"description": "New desc", "leaveDate": "2020-08-28", "location": "TN", "returnDate": "2020-08-30", "tripName": "New title", "tripType": ""});

    axios.post.mockRejectedValueOnce(new Error( {status: 500, res: "Bad"}));
    fireEvent.click(buttonElem[0]);
    expect(axios.post).toBeCalledWith("http://localhost:3001/trips/updatetrip", {"description": "New desc", "leaveDate": "2020-08-28", "location": "TN", "returnDate": "2020-08-30", "tripName": "New title", "tripType": ""});

    axios.post.mockResolvedValueOnce(Promise.resolve());
    fireEvent.click(buttonElem[0]);
    expect(axios.post).toBeCalledWith("http://localhost:3001/trips/updatetrip", {"description": "New desc", "leaveDate": "2020-08-28", "location": "TN", "returnDate": "2020-08-30", "tripName": "New title", "tripType": ""});
});


test("Test pending state change", () => {
    var { result } = renderHook(() => EditTrip());
    expect(result.current.isPending).toBeFalsy();
});