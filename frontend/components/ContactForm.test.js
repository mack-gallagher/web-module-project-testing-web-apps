import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', () => {
  const wrapper = render(
    <ContactForm />
  );
  const header = wrapper.queryByText(/Contact Form/i);
  expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  const wrapper = render(
    <ContactForm />
  )
  const firstName = wrapper.queryByText(/First Name*/i);
  userEvent.type(firstName, "abcd");
  const lastName = wrapper.queryByText(/Last Name*/i);
  userEvent.type(lastName, "abc");
  const email = wrapper.queryByText(/Email/i);
  userEvent.type(email, "magallagher00@gmail.com");
  const submitButton = wrapper.queryByText(/SUBMIT/i);
  await userEvent.click(submitButton);
  const errorMsgs = wrapper.queryAllByText(/Error/i);
  expect(errorMsgs).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  const wrapper = render(
    <ContactForm />
  );
  const firstname = wrapper.queryByText(/First Name*/i);
  userEvent.click(firstname);
  const submitButton = wrapper.queryByText(/SUBMIT/i);
  await userEvent.click(submitButton);
  const errorMsgs = wrapper.queryAllByText(/Error/i);
  expect(errorMsgs).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  const wrapper = render(
    <ContactForm />
  )
  const firstName = wrapper.queryByText(/First Name*/i);
  userEvent.type(firstName, "abcde");
  const lastName = wrapper.queryByText(/Last Name*/i);
  userEvent.type(lastName, "abc");
  const submitButton = wrapper.queryByText(/SUBMIT/i);
  await userEvent.click(submitButton);
  const errorMsgs = wrapper.queryAllByText(/Error/i);
  expect(errorMsgs).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  const wrapper = render(
    <ContactForm />
  );
  const firstName = wrapper.queryByText(/First Name*/i);
  userEvent.type(firstName, "abcde");
  const lastName = wrapper.queryByText(/Last Name*/i);
  userEvent.type(lastName, "abc");
  const email = wrapper.queryByText(/Email/i);
  userEvent.type(email,"abc");
  const submitButton = wrapper.queryByText(/SUBMIT/i);
  await userEvent.click(submitButton);
  const errorMsg = wrapper.queryByText(/Error/i);
  expect(errorMsg).toHaveTextContent(/email must be a valid email address/i);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  const wrapper = render(
    <ContactForm />
  );
  const firstName = wrapper.queryByText(/First Name*/i);
  userEvent.type(firstName, "abcde");
  const email = wrapper.queryByText(/email/i);
  userEvent.type(email, "magallagher00@gmail.com");
  const submitButton = wrapper.queryByText(/SUBMIT/i);
  await userEvent.click(submitButton);
  const errorMsg = wrapper.queryByText(/Error/i);
  expect(errorMsg).toHaveTextContent(/lastName is a required field/i);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  const wrapper = render(
    <ContactForm />
  );
  const firstName = wrapper.queryByText(/First Name*/i);
  userEvent.type(firstName, "abcde");
  const lastName = wrapper.queryByText(/Last Name*/i);
  userEvent.type(lastName, "abcde");
  const email = wrapper.queryByText(/Email/i);
  userEvent.type(email, 'magallagher00@gmail.com');
  const submitButton = wrapper.queryByText(/SUBMIT/i);
  await userEvent.click(submitButton);

  const firstNameDisplay = wrapper.queryByTestId('firstnameDisplay');
  const lastNameDisplay = wrapper.queryByTestId('lastnameDisplay');
  const emailDisplay = wrapper.queryByTestId('emailDisplay');
  const messageDisplay = wrapper.queryByTestId('messageDisplay');

  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
  expect(messageDisplay).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
  const wrapper = render(
    <ContactForm />
  );
  const firstName = wrapper.queryByText(/First Name*/i);
  userEvent.type(firstName, "abcde");
  const lastName = wrapper.queryByText(/Last Name*/i);
  userEvent.type(lastName, "abcde");
  const email = wrapper.queryByText(/Email/i);
  userEvent.type(email, 'magallagher00@gmail.com');
  const message = wrapper.queryByText(/Message/i);
  userEvent.type(message, ':)');
  const submitButton = wrapper.queryByText(/SUBMIT/i);
  await userEvent.click(submitButton);

  const firstNameDisplay = wrapper.queryByTestId('firstnameDisplay');
  const lastNameDisplay = wrapper.queryByTestId('lastnameDisplay');
  const emailDisplay = wrapper.queryByTestId('emailDisplay');
  const messageDisplay = wrapper.queryByTestId('messageDisplay');

  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
  expect(messageDisplay).toBeInTheDocument();
});
