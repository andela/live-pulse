import React from 'react';
import  renderer from  'react-test-renderer';
import  { act } from  'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import SignIn from './SignIn';
import { SIGNIN_MUTATION } from '../../mutations/authMutation';
import wait from 'waait';

describe('Signin/SignUp Component ', () => {
  const signIn = { token: 'fsdgfgfhghl', user: {id:'hnhgdc', emai:'wale@mail.com'}}
  const mocks = [
    {
      request: {
        query: SIGNIN_MUTATION,
        variables: {
          email: 'wale@email.com',
          password: '1234',
        },
      },
      result: {
        data: { signIn }
      }
    },
  ];
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SignIn />
    </MockedProvider>
   );
   const compInstance = component.root;
   const button = compInstance.findByProps({type: 'submit'});

  it('Regression test => Should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Should render email field correctly', () => {
    expect(compInstance.findByProps({name: 'email'}));
  });
  it('Should render password field correctly', () => {
    expect(compInstance.findByProps({name: 'password'}));
  });
  it('Should render SignIN button correctly', () => {
    expect(button.props.children).toEqual('Log in');
  });
  it('Should signIN a user successfully', async () => {  
    act(() => {
      button.props.onClick();
    });
    await wait(0);
    expect(compInstance.findByProps({id: 'errorMsg'}).props.children).toEqual('.')

  });
  it('Shows Signup components when create account is clicked', () => {
    const p = compInstance.findByProps({id: "acct-auth"});
    act(() => {
      p.props.onClick();
    });
    expect(p.props.children).toBe('Already have an account? log in');
    expect(compInstance.findByProps({name: 'email2'}));
    expect(compInstance.findByProps({type: 'submit'})
      .props.children).toEqual('Create account');
  });
});
