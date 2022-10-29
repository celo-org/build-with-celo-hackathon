import Link from "next/link";
export const NavListDefault = () => {
  return (
    <ul className="hidden sm:flex">
      <li className="p-4">
        <Link href="/">Home</Link>
      </li>
      <li className="p-4">
        <Link href="/startups">Startups</Link>
      </li>
      <li className="p-4">
        <Link href="/funding">Funding</Link>
      </li>
      <li className="p-4">
        <Link href="/login"> Login </Link>
      </li>
    </ul>
  );
};
export const NavListFunding = () => {
  return (
    <ul className="hidden sm:flex">
      <li className="p-4">
        <Link href="/">Categories</Link>
      </li>
      <li className="p-4">
        <Link href="/startups">Know more</Link>
      </li>
      <li className="p-4">
        <Link href="/funding">Account</Link>
      </li>
      <li className="p-4">
        <Link href="/login">
          <button className="bg-black px-7 rounded-full text-white border-none">
            Connect wallet
          </button>
        </Link>
      </li>
    </ul>
  );
};

export const NavListHome = () => {
  return (
    <ul className="hidden sm:flex">
      <li className="p-4">
        <Link href="/login"> Login </Link>
      </li>
    </ul>
  );
};
