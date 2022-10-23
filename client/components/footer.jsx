import Image from 'next/image';
import { 
  FaLinkedinIn as LinkedInIcon,
  FaFacebookF as FacebookIcon,
  FaTwitter as TwitterIcon,
  FaInstagram as InstagramIcon
} from 'react-icons/fa'

const SOCIAL_NETWORK_ICONS = {
  linkedIn: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon
}
const Footer = () => {
  return (
    <footer className={`Footer bg-gray-100 p-5 lg:px-80 mt-10 min-h-48`}>
      <div className="lg:flex lg:items-center lg:justify-around mb-10">
        <div className="lg:flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-[80%] md:w-[20rem] min-h-[10rem] relative">
              <Image src="/nzse-logo.svg" alt="nzse-logo" layout="fill" objectFit="contain" />
            </div>
          </div>
          <div className="lg:ml-10">
            <ul className="list-none text-center lg:text-left">
              <li>Field 1</li>
              <li>Field 2</li>
              <li>Field 3</li>
              <li>Field 4</li>
            </ul>
          </div>
        </div>
        <div className="lg:flex lg:flex-col lg:items-end">
          <div className="mt-5 lg:mt-0 flex flex-col items-center lg:ml-10">
            <div className="flex space-x-6">
              {
                Object.keys(SOCIAL_NETWORK_ICONS).map((networkName, index) => {
                  const IconComponent = SOCIAL_NETWORK_ICONS[networkName];
                  return (
                    <a key={`social-link-${index}`} href="www.google.com">
                      <IconComponent className="hover:fill-lightest-blue" size="1.5em" color="#4cbedb" />
                    </a>
                  )
                })
              }
            </div>
          </div>
          <div className="mt-5 lg:ml-10">
            <ul className="list-none text-center">
              {[1, 2, 3].map((elem, index) => {
                return (
                  <li key={index} className="cursor-pointer mb-5 last:mb-0 lg:inline lg:ml-5 "><a>Link {elem}</a></li>
                )
              })}
            </ul>
          </div>
          <div className="text-center lg:text-none mt-5">
            11 Sample Road, Wellington, New Zealand
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;