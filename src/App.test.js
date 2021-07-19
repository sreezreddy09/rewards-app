import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('rewards are correctly calculated', () => {
  let component = new App();
  expect(component.calculateRewards(0)).toEqual(0);
  expect(component.calculateRewards(46)).toEqual(0);
  expect(component.calculateRewards(94)).toEqual(44);
  expect(component.calculateRewards(136)).toEqual(122);
})

test('display user records per month based on the mock data passed', () => {
  let component = new App();
  let UserRecordsforMay = component.displayUserRecordsPerPeriod('may');
  expect(Object.keys(UserRecordsforMay).length).toEqual(10);
  expect(UserRecordsforMay["Bonnie Green"].transactions.length).toEqual(6);
  let UserRecordsforJune = component.displayUserRecordsPerPeriod('june');
  expect(Object.keys(UserRecordsforJune).length).toEqual(10);
  expect(UserRecordsforJune["Bonnie Green"].transactions.length).toEqual(7);
  let UserRecordsforJuly = component.displayUserRecordsPerPeriod('july');
  expect(Object.keys(UserRecordsforJuly).length).toEqual(10);
  expect(UserRecordsforJuly["Bonnie Green"].transactions.length).toEqual(2);
  let UserRecordsAll = component.displayUserRecordsPerPeriod('all');
  expect(Object.keys(UserRecordsAll).length).toEqual(10);
  expect(UserRecordsAll["Bonnie Green"].transactions.length).toEqual(15);
})

test('renders the title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Rewards Summary/i);
  expect(linkElement).toBeInTheDocument();
});

test('click on any of the month in the menu to show user rewards for that month', () => {
  render(<App />);
  const julyMenuElement = screen.getByTestId('june-21')
  expect(julyMenuElement).toHaveClass("menu-item")
  fireEvent.click(julyMenuElement)
  expect(julyMenuElement).toHaveClass("menu-item selected")
})
