import DownloadIcon from '@mui/icons-material/Download';
import SocialMedia from '@/components/social-media/SocialMedia';
import Image from 'next/image'
import CountUpCard from '@/components/countup/CountUpCard';

function HomePage() {
  return (
    <section className="bg-primary-deep-purple pt-[200px] pb-[50px] circle">
      <div className="container">
        {/* Hero Section: Introduction and personal information */}
        <div className="grid grid-cols-2 relative z-10">
          <div>
            <span className="sora-800 text-4xl text-primary-light-gray">I am Javad</span>
            <h1 className="sora-800 text-7xl leading-tight text-transparent bg-clip-text bg-primary-gradient-light my-5">
              Web Developer +
              <br />
              React, Next
            </h1>
            <p className="sora-400 text-xl text-primary-light-gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sed debitis excepturi, voluptates dolore inventore modi. Sunt ullam natus dicta?
            </p>
            <div className="mt-10 flex items-center gap-x-3">
              <a href="/" className="border-primary-purple border-[1px] sora-600 text-primary-purple text-base px-[35px] py-[15px] rounded-full transition-[.5s] hover:bg-primary-purple hover:text-primary-light-gray">Download CV <DownloadIcon sx={{ fontSize: 20 }} /></a>
              <ul className="flex items-center gap-x-3">
                <SocialMedia />
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <figure className="rotate-[4.30deg] transition-[1s] hover:rotate-0 border-primary-pale-purple hover:border-primary-purple border-[2px] rounded-[40px] overflow-hidden">
              <Image
                src="/image/me.webp"
                width={450}
                height={450}
                alt='...'
                priority
              />
            </figure>
          </div>
        </div>
        {/* Hero Section: Introduction and personal information */}
        {/* CountUp Section: Animated statistics */}
        <div className="grid grid-cols-4 mt-28 relative z-10">
          <CountUpCard />
        </div>
        {/* CountUp Section: Animated statistics */}
      </div>
    </section>
  );
}

export default HomePage;