import Image from 'next/image';
const Footer = () => {
  return (
    <footer className={`Footer bg-gray-100 p-5 lg:px-80 mt-10 min-h-48`}>
      <div className="flex flex-col items-center">
        <div className="w-[80%] min-h-[10rem] relative">
          <Image src="/nzse-logo.svg" alt="nzse-logo" layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className="mt-5">
        <ul className="list-none text-center">
          <li>Field 1kjhkjhkjh</li>
          <li>Field 2</li>
          <li>Field 3</li>
        </ul>
      </div>
      <div className="mt-5 text-center">
        Social Links
      </div>
      <div className="mt-5">
        <ul className="list-none text-center">
          {[1, 2, 3].map((elem, index) => {
            return (
              <li key={index} className="mb-5 last:mb-0"><a>Link {elem}</a></li>
            )
          })}
        </ul>
      </div>
      <div className="text-center mt-5">
        11 Sample Road, Wellington, New Zealand
      </div>
    </footer>
  )
}

export default Footer;