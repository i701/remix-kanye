import { LoaderArgs, V2_MetaFunction, json, fetch } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useRevalidator } from "react-router-dom"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Kanye go brrr" }]
}

export async function loader({ params }: LoaderArgs) {
  const response = await fetch("https://api.kanye.rest/")
  const data = await response.json()
  return json(data)
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  let revalidator = useRevalidator()

  return (
    <div className="font-space max-w-md mx-auto min-h-screen flex items-center justify-center flex-col">
      <div className="p-4 border rounded bg-red-200 space-y-4">
        <h2 className="text-4xl font-extrabold">
          Some dank ass shit kanye said ✨📢
        </h2>
        <p>"{data.quote}"</p>
        <button
          disabled={revalidator.state === "loading"}
          onClick={() => revalidator.revalidate()}
          className="px-4 py-2 rounded border-2 border-red-400 hover:bg-red-50 shadow bg-white"
        >
          {revalidator.state === "loading" ? "Loading..." : "Fetch new shit"}
        </button>
      </div>

      <div className="mt-8 text-sm space-y-4">
        <p className="">Made with remix & Tailwind CSS</p>
        <p>
          The data is coming from https://api.kanye.rest and the api credit goes
          to the rightful owner{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
            href="https://twitter.com/andrewjazbec"
          >
            @andrewjazbec
          </a>{" "}
          on twitter.
        </p>

        <p>
          I made this just to mess around with remix run framework. Quite fun
          tbh.
        </p>

        <a
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
          href="https://github.com/i701/remix-kanye"
        >
          Source code
        </a>
      </div>
    </div>
  )
}
