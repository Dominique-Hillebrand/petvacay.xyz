import Link from 'next/link'
import Messages from './messages'

export default function Login() {
  return (
    <main>
      <form className="signUp-form" action="/auth/sign-in" method="post">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="input-text"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="input-text"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="button-green">Sign In</button>
        <button formAction="/auth/sign-up" className="button-gray">
          Register a new account
        </button>
        <Messages />
      </form>
    </main>
  )
}
