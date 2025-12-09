"use client";
// Import Lib
import {
  useActionState,
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { authenticate } from "@/lib/action";
import { useSearchParams } from "next/navigation";

import style from "@/components/Auth/AuthForm.module.css";
// type FormDataSignType = {
//   [key: string]: string | null;
// };

export default function AuthForm() {
  // Url Parameters
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/fr";

  // Verify
  const verifyRef = useRef<HTMLInputElement | null>(null);
  const [verify, setVerify] = useState("");
  // State form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("123456");
  // const [isPassword, setIsPassword] = useState<boolean>(false);

  // Use form
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  /**
   * escFunction()
   *  Catch key action
   */
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      // Disable for table navigration verify field
      if (verifyRef && verifyRef?.current) {
        if (event.type === "keydown") {
          verifyRef?.current?.setAttribute("tabIndex", "-1");
        } else if (event.type === "keyup") {
          verifyRef?.current?.setAttribute("tabIndex", "0");
        }
      }
    },
    [verifyRef],
  );

  useEffect(() => {
    document.addEventListener("keyup", escFunction, false);
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keyup", escFunction, false);
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  /**
   * handleSubmit()
   *
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "nom") {
      setVerify(e.target.value);
    }
  };

  return (
    <form
      autoComplete="new-password"
      action={formAction}
      className="w-1/1 max-w-md space-y-3 sm:w-1/2"
    >
      <div className="flex-1 rounded-lg px-6 pt-8 pb-4">
        <h1 className={`font-cinderela text-one mb-3 text-7xl`}>Club</h1>
        <div className="w-full">
          <div>
            <div className={style.nameForm}>
              <div className="relative">
                <span className="icon-gm-person absolute top-4 left-3"></span>
                <input
                  ref={verifyRef}
                  className="border-one mb-3 block w-full border-b-4 py-3 pl-10 outline-0"
                  id="nom"
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={verify}
                  onChange={handleChange}
                  autoComplete={"new-password"}
                  role="presentation"
                />
              </div>
            </div>
            <div className="relative">
              <span className="i-gntl--person absolute top-4 left-3"></span>
              <input
                className="border-one mb-3 block w-full border-b-4 py-3 pl-10 outline-0 dark:placeholder:text-gray-400"
                id="username"
                type="text"
                name="username"
                placeholder="Nom utilisateur"
                required
                value={username}
                onChange={handleChange}
                autoComplete={"new-password"}
                role="presentation"
              />
            </div>
          </div>

          <div className="relative">
            <span className="i-gntl--vpn_key absolute top-4 left-3"></span>
            <input
              className="border-one mb-3 block w-full border-b-4 py-3 pl-10 outline-0"
              id="password"
              type="password"
              name="password"
              placeholder="Mot de passe"
              minLength={6}
              value={password}
              required
              onChange={handleChange}
              autoComplete={"new-password"}
              role="presentation"
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        {username && username.length > 3 && (
          <button
            className="mb-3 block w-full cursor-pointer p-3 text-right outline-0 focus-within:font-bold"
            aria-disabled={isPending}
          >
            Se connecter <span className="icon-gm-save"></span>
          </button>
        )}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
