'use client';

import {FormEvent} from 'react';

export default function Login() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password}),
    });

    // Handle response if necessary
    const data = await response.json();
    // ...
    return data;
  }
  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email</label>
          <input type="text" name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
