export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="navbutton">Logout</button>
    </form>
  )
}
