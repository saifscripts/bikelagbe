import { FeaturedBikes } from '@/features/home/featured-bikes';
import { Hero } from '@/features/home/hero';
import { Testimonials } from '@/features/home/testimonials';
import { WhyChooseUs } from '@/features/home/why-choose-us';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedBikes />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
};

export default Home;
