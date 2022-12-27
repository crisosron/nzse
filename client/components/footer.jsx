import Image from 'next/image';
import Link from 'next/link';
import { buildPageUrl } from '../lib/utils';
import {
  FaLinkedinIn as LinkedInIcon,
  FaFacebookF as FacebookIcon,
  FaTwitter as TwitterIcon,
  FaInstagram as InstagramIcon
} from 'react-icons/fa';

const SOCIAL_NETWORK_ICONS = {
  linkedIn: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon
};

const Footer = ({ footerData }) => {
  const { emailAddress, organizationName, phoneNumber, poBox } = footerData.contactFields;
  const links = footerData.links.data;
  const socialLinks = footerData.socialLinks;
  const address = footerData.address;

  return (
    <footer
      className={`Footer bg-gray-100 p-5 lg:px-80 min-h-48 font-poppins text-sm md:text-base lg:text-sm`}
    >
      <div className='lg:flex lg:items-center lg:justify-around mb-10 lg:mb-0'>
        <div className='lg:flex items-center'>
          <div className='flex flex-col items-center'>
            <div className='w-[80%] md:w-[20rem] min-h-[10rem] relative'>
              <Image src='/nzse-logo.svg' alt='nzse-logo' layout='fill' objectFit='contain' />
            </div>
          </div>
          <div className='lg:ml-10'>
            <ul className='list-none text-center lg:text-left'>
              <li>{emailAddress}</li>
              <li>{phoneNumber}</li>
              <li>{poBox}</li>
              <li>{organizationName}</li>
            </ul>
          </div>
        </div>
        <div className='lg:flex lg:flex-col lg:items-end'>
          <div className='mt-5 lg:mt-0 flex flex-col items-center lg:ml-10'>
            <div className='flex space-x-6'>
              {Object.keys(SOCIAL_NETWORK_ICONS).map((networkName, index) => {
                const IconComponent = SOCIAL_NETWORK_ICONS[networkName];
                const url = socialLinks[`${networkName}Link`];
                if (url) {
                  return (
                    <a key={`social-link-${index}`} href={url}>
                      <IconComponent
                        className='hover:fill-lightest-blue'
                        size='1.5em'
                        color='#4cbedb'
                      />
                    </a>
                  );
                }
              })}
            </div>
          </div>
          <div className='mt-5 lg:ml-10'>
            <ul className='list-none text-center lg:text-right'>
              {links.map((elem, index) => {
                return (
                  <li key={index} className='cursor-pointer md:mb-0 lg:ml-5 '>
                    <Link href={buildPageUrl(elem)}>{elem.attributes.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='text-center lg:text-none mt-5'>{address}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
