import { useRecoilState } from "recoil";
import { avatarNumber } from "../../utils/store";

export default function Step3() {
  const [avatar, setAvatar] = useRecoilState(avatarNumber);
  return (
    <section className="bg-white dark:bg-gray-900 mt-24">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-font dark:text-white">
            Bitte wähle einen Avatar
          </h2>
        </div>
        <div>
          <div className="flex lg:flex-nowrap flex-wrap justify-center">
            <div className="w-4/12 md:w-6/12 px-4" onClick={() => setAvatar(1)}>
              <img src="https://avatars.dicebear.com/api/avataaars/teste.svg" alt="avatar" className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${avatar === 1 ? 'p-1 ring-2 ring-green-dark' : ''}`} />
            </div>
            <div className="w-4/12 md:w-6/12 px-4" onClick={() => setAvatar(2)}>
              <img src="https://avatars.dicebear.com/api/avataaars/rik.svg" alt="avatar" className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${avatar === 2 ? 'p-1 ring-2 ring-green-dark' : ''}`} />
            </div>
            <div className="w-4/12 md:w-6/12 px-4" onClick={() => setAvatar(3)}>
              <img src="https://avatars.dicebear.com/api/avataaars/alf.svg" alt="avatar" className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${avatar === 3 ? 'p-1 ring-2 ring-green-dark' : ''}`} />
            </div>
            <div className="w-4/12 md:w-6/12 px-4" onClick={() => setAvatar(4)}>
              <img src="https://avatars.dicebear.com/api/avataaars/kar.svg" alt="avatar" className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${avatar === 4 ? 'p-1 ring-2 ring-green-dark' : ''}`} />
            </div>
            <div className="w-4/12 md:w-6/12 px-4" onClick={() => setAvatar(5)}>
              <img src="https://avatars.dicebear.com/api/avataaars/kars.svg" alt="avatar" className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${avatar === 5 ? 'p-1 ring-2 ring-green-dark' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
