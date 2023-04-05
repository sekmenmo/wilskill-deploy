import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import EventDetails from "../EventDetails";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

jest.mock("../../Pages/stringWrapper", () => ({
  stringWrapper: (str) => {
    return str;
  },
}));

jest.mock("../../Pages/useFetch", () => ({
  useFetch: (url) => {
    return {
      data: [
        {
          ID: 1,
          location: "TN",
          tripName: "Rafting 1",
          tripType: "Rafting",
          leaveDate: "2023",
          returnDate: "2023",
          description: "Fun times!",
        },
      ],
    };
  },
}));

jest.mock("../../context/AuthContext", () => ({
  UserAuth: () => {
    return {
      user: {
        displayName: "Jeff",
        email: "example@gmail.com",
        location: "Dublin",
        tripName: "Example trip",
      },
    };
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => {
    return { id: 1 };
  },
}));

test("Should display Trip Name at top of screen", () => {
  var wrapper = render(
    <BrowserRouter>
      {" "}
      <EventDetails />{" "}
    </BrowserRouter>
  );
  var textElem = wrapper.queryAllByText("Trip Name: Rafting 1", {
    selector: "h1",
  });
  expect(textElem).toHaveLength(1);
});

test("Should display signup header", () => {
  var wrapper = render(
    <BrowserRouter>
      {" "}
      <EventDetails />{" "}
    </BrowserRouter>
  );
  var textElem = wrapper.queryAllByText("Sign Up for Rafting 1", {
    selector: "h1",
  });
  expect(textElem).toHaveLength(1);
});

test("Delete button with acceptance, rejection, blank promise", () => {
  var wrapper = render(
    <BrowserRouter>
      {" "}
      <EventDetails />{" "}
    </BrowserRouter>
  );
  var buttonElem = wrapper.queryAllByText("PRESS THIS TO DELETE (CAREFUL)", {
    selector: "button",
  });
  expect(buttonElem).toHaveLength(1);

  axios.delete.mockResolvedValueOnce(
    Promise.resolve({ status: 200, res: "Good" })
  );
  fireEvent.click(buttonElem[0]);
  expect(axios.delete).toBeCalledWith(
    "http://localhost:3001/trips/deletetrip/1"
  );

  axios.delete.mockRejectedValueOnce(new Error({ status: 500, res: "Bad" }));
  fireEvent.click(buttonElem[0]);
  expect(axios.delete).toBeCalledWith(
    "http://localhost:3001/trips/deletetrip/1"
  );

  axios.delete.mockResolvedValueOnce(Promise.resolve());
  fireEvent.click(buttonElem[0]);
  expect(axios.delete).toBeCalledWith(
    "http://localhost:3001/trips/deletetrip/1"
  );
});

test("Update button with acceptance, rejection, blank promise", () => {
  var wrapper = render(
    <BrowserRouter>
      {" "}
      <EventDetails />{" "}
    </BrowserRouter>
  );
  var buttonElem = wrapper.queryAllByText(
    'UPDATE BUTTON, Updates Description to "Desc from Update Query"',
    { selector: "button" }
  );
  expect(buttonElem).toHaveLength(1);

  axios.post.mockResolvedValueOnce(
    Promise.resolve({ status: 200, res: "Good" })
  );
  fireEvent.click(buttonElem[0]);
  expect(axios.post).toBeCalledWith("http://localhost:3001/trips/updatetrip/1");

  axios.post.mockRejectedValueOnce(new Error({ status: 500, res: "Bad" }));
  fireEvent.click(buttonElem[0]);
  expect(axios.post).toBeCalledWith("http://localhost:3001/trips/updatetrip/1");

  axios.post.mockResolvedValueOnce(Promise.resolve());
  fireEvent.click(buttonElem[0]);
  expect(axios.post).toBeCalledWith("http://localhost:3001/trips/updatetrip/1");
});

test("Submit button and emailJS with accept, reject, blank Promise", () => {
  var wrapper = render(
    <BrowserRouter>
      {" "}
      <EventDetails />{" "}
    </BrowserRouter>
  );

  const name = wrapper.getByTestId("name");
  fireEvent.change(name, { target: { value: "Jeff" } });
  expect(name.value).toEqual("Jeff");

  const email = wrapper.getByTestId("email");
  fireEvent.change(email, { target: { value: "example@gmail.com" } });
  expect(email.value).toEqual("example@gmail.com");

  const vunetid = wrapper.getByTestId("vunetid");
  fireEvent.change(vunetid, { target: { value: "jeffjeff" } });
  expect(vunetid.value).toEqual("jeffjeff");

  const number = wrapper.getByTestId("number");
  fireEvent.change(number, { target: { value: "123456789" } });
  expect(number.value).toEqual("123456789");

  const earliestTime = wrapper.getByTestId("earliestTime");
  fireEvent.change(earliestTime, { target: { value: "5:30AM" } });
  expect(earliestTime.value).toEqual("5:30AM");

  const dietaryRes = wrapper.getByTestId("dietaryRes");
  fireEvent.change(dietaryRes, { target: { value: "I cannot eat anything" } });
  expect(dietaryRes.value).toEqual("I cannot eat anything");

  const needs = wrapper.getByTestId("needs");
  fireEvent.change(needs, { target: { value: "Nothing" } });
  expect(needs.value).toEqual("Nothing");

  const comms = wrapper.getByTestId("comms");
  fireEvent.change(comms, { target: { value: "N/A" } });
  expect(comms.value).toEqual("N/A");

  var buttonElem = wrapper.queryAllByText("Sign Up", { selector: "button" });
  expect(buttonElem).toHaveLength(1);

  axios.post.mockResolvedValueOnce(
    Promise.resolve({ status: 200, res: "Good" })
  );
  fireEvent.click(buttonElem[0]);
  expect(axios.post).toBeCalledWith("http://localhost:3001/signups/addsignup", {
    allergiesDietary: "I cannot eat anything",
    commentsQs: "N/A",
    disclaimerAck: 0,
    earliestDepartTime: "5:30AM",
    email: "example@gmail.com",
    missingItems: "Nothing",
    namePronouns: "Jeff",
    phoneNumber: "123456789",
    tripID: 1,
    vunetID: "jeffjeff",
  });

  axios.post.mockRejectedValueOnce(new Error({ status: 500, res: "Bad" }));
  fireEvent.click(buttonElem[0]);
  expect(axios.post).toBeCalledWith("http://localhost:3001/signups/addsignup", {
    allergiesDietary: "I cannot eat anything",
    commentsQs: "N/A",
    disclaimerAck: 0,
    earliestDepartTime: "5:30AM",
    email: "example@gmail.com",
    missingItems: "Nothing",
    namePronouns: "Jeff",
    phoneNumber: "123456789",
    tripID: 1,
    vunetID: "jeffjeff",
  });

  axios.post.mockRejectedValueOnce(Promise.resolve());
  fireEvent.click(buttonElem[0]);
  expect(axios.post).toBeCalledWith("http://localhost:3001/signups/addsignup", {
    allergiesDietary: "I cannot eat anything",
    commentsQs: "N/A",
    disclaimerAck: 0,
    earliestDepartTime: "5:30AM",
    email: "example@gmail.com",
    missingItems: "Nothing",
    namePronouns: "Jeff",
    phoneNumber: "123456789",
    tripID: 1,
    vunetID: "jeffjeff",
  });
});
