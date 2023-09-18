import Link from 'next/link'
import Messages from './messages'

export default function Login() {
  return (
    <main>
      {/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link> */}

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
  );
}
