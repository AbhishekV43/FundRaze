import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white px-5 md:px-0 text-xs md:text-base">
        <div className="flex md:text-6xl text-4xl pt-32 md:gap-4 gap-2 justify-center items-center">
          Buy me a Coffee!
          <span>
            <img className="md:w-16 invert pb-4 w-12" src="/coffee-cup.png" alt="" />
          </span>
        </div>
        <p className="pt-5 text-xl text-center">
          A crowdfunding platform for creators. Get funded by your fans and followers.
        </p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-6">Start Now</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-6">Read more</button>
          </Link>
        </div>
      </div>
      {/* <div className="bg-white h-1 opacity-75"></div> */}

      <div className="text-white container mx-auto py-32 px-10">
        <h2 className="text-2xl text-center mb-14">
          Your fans can buy you a coffee
        </h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/coin.png" alt="" className="rounded-full p-2 invert bg-transparent" width={88} />
            <p className="font-bold text-center">
              Want help
            </p>
            <p className="text-center">
              Your fans are available for you to help
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/crowdfunding.png" alt="" className="rounded-full p-2 invert bg-transparent" width={88} />
            <p className="font-bold text-center">
              Strengthen your community
            </p>
            <p className="text-center">
              Get to know more about your listeners
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/crowd.png" alt="" className="rounded-full p-2 invert bg-transparent" width={88} />
            <p className="font-bold text-center">
              Get heard
            </p>
            <p className="text-center">
              Cut through the noise and get heard
            </p>
          </div>
        </div>
      </div>

      <div className="text-white container mx-auto py-4 px-10">
        <h2 className="text-2xl text-center mb-14">
          Learn more about us
        </h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/coin.png" alt="" className="rounded-full p-2 invert bg-transparent" width={88} />
            <p className="font-bold text-center">
              More income
            </p>
            <p className="text-center">
            More ways to get paid and make money
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/razorpay.png" alt="" className="rounded-full p-2 bg-transparent" width={88} />
            <p className="font-bold text-center">
              Earning made easy
            </p>
            <p className="text-center">
              Payments powered by Razorpay™
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/crowd.png" alt="" className="rounded-full p-2 invert bg-transparent" width={88} />
            <p className="font-bold text-center">
              Build real community
            </p>
            <p className="text-center">
            Turn your viewers into your own people
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg pt-36 container mx-auto pb-32">
          <video className="size-3/5 h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700" autoPlay muted controls>
          <source src="/intro2.mp4" type="video/mp4">
          </source>
          </video>
          </div>
      </div>
    </>
  );
}
