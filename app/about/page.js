import React from 'react'

const About = () => {
  return (
    <>
      <div className="px-8 md:px-4 py-8">
        <div className="flex flex-col justify-center items-center text-white">
          <div className="flex text-3xl pt-16 gap-2 justify-center items-center">
            About FundRaze
            <span>
              <img className="w-10 invert pb-4 " src="/coffee-cup.png" alt="" />
            </span>
          </div>
          <div className='flex flex-col justify-center items-center md:w-3/4 w-full'>
          <p className="p-5 text-l">
            FundRaze is a crowdfunding platform for creators. Get funded by your fans and followers.
          </p>
          <p className="p-5 text-l">
            We believe in the power of community and the idea that people should be able to support the creators they love. That's why we've built a platform that makes it easy for creators to raise funds for their projects.
          </p>
          <p className="p-5 text-l">
            Whether you're an artist, musician, filmmaker, designer, or any other type of creator, FundRaze is the perfect platform for you. We provide the tools you need to connect with your audience and get the funding you need to bring your ideas to life.
          </p>
          <p className="p-5 text-l">
            With FundRaze, you can create a campaign, share your story, set a fundraising goal, and start raising money in a matter of minutes. We've made it as simple as possible so you can focus on what you do best: creating.
          </p>
          <p className="p-5 text-l">
          Our platform is built with transparency and trust in mind. We provide a secure and reliable way for backers to support their favorite creators. Backers can see exactly where their money is going and creators can keep track of their funding progress in real-time.
          </p>
          <p className="p-5 text-l">
          FundRaze is more than just a crowdfunding platform. It's a community of creators and supporters who believe in the power of creativity and the importance of supporting independent work. Join us today and start making your creative dreams a reality.
          </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About

export const metadata = {
  title: "About - FundRaze",
}