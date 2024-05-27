import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';

const HeroText = ({ children }) => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      setData(
        await (await fetch(`https://api.github.com/repos/${children}`)).json()
      );
    })();
  }, []);
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
      }}
      className="w-full flex justify-evenly items-center font-thin font-['Melodrama'] opacity-0"
    >
      {(data ? (data.description ? data.description : ' ') : ' ')
        .split('')
        .map((letter, key) => (
          <motion.div key={key}>{letter}</motion.div>
        ))}
    </motion.div>
  );
};

const Github = ({ children }) => {
  const [data, setData] = useState();
  const [socials, setSocials] = useState();
  useEffect(() => {
    (async () => {
      setData(
        await (await fetch(`https://api.github.com/users/${children}`)).json()
      );
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setSocials(
        await (
          await fetch(
            `https://api.github.com/users/${children}/social_accounts`
          )
        ).json()
      );
    })();
  }, []);
  return (
    <div className="h-full w-full p-[10cqmin] flex flex-col justify-between select-none">
      <div className="h-full flex flex-col justify-between">
        <div className="text-justify">{data?.bio}</div>
        <div className="flex justify-between items-end text-[0.44em]">
          <div className="flex flex-col items-start">
            {Array.isArray(socials) &&
              socials?.map((social, key) => (
                <Link key={key} href={social.url}>
                  {social.url}
                </Link>
              ))}
          </div>
          <div className="flex flex-col items-end">
            <div>{data?.hireable && 'HIREABLE'}</div>
            <div>{data?.company}</div>
            <div>{data?.location}</div>
            <div>
              {data?.email && (
                <Link href={`mailto:${data?.email}`}>{data?.email}</Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[10cqmin] flex justify-between items-center">
        <div className="flex items-baseline">
          {data?.name}
          <div className="text-[0.44em]">
            <Link href={data?.html_url}>{data?.login}</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-full h-[11cqmin] aspect-square">
          <img
            className="h-full w-full aspect-square object-cover"
            src={data?.avatar_url}
          />
        </div>
      </div>
    </div>
  );
};

const Background = ({ children }) => {
  return (
    <div className="fixed -z-10 overflow-hidden size-full">
      <img className="size-full object-cover" src={children} />
    </div>
  );
};

const Repos = ({ children }) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${children}/repos`
        );
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setData([]);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      {Array.isArray(data) && (
        <div className="flex flex-col gap-3">
          <div className="mx-1 text-[2em]">GitHub repositories</div>
          {data?.map((repo, key) => (
            <div key={key} className="flex">
              <div className="flex text-nowrap">
                <Link href={repo.html_url}> {repo.name} &rarr; </Link>
              </div>
              <div className="mx-1 opacity-70">{repo.description}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Link = ({ href, children }) => {
  return (
    <a
      className="cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre"
      href={href}
      data-hover-pointer
    >
      {children}
    </a>
  );
};

export default function Page() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  return (
    <>
      {/* <Background></Background> */}
      <header>
        <motion.section
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 0.5], {
              ease: easeInOut,
            }),
            y: useTransform(scrollYProgress, [0.66, 1], ['0vh', '-60vh'], {
              ease: easeInOut,
            }),
          }}
          className="fixed size-full overflow-hidden z-50"
        >
          <section ref={ref} className="relative h-[350vh] cursor-none">
            <section className="sticky top-0 h-[100svh] overflow-hidden">
              <div className="absolute overflow-hidden bg-white h-full w-full text-black flex items-center justify-center">
                <motion.div
                  style={{
                    scale: useTransform(scrollYProgress, [0, 1], [1, 33], {
                      ease: easeInOut,
                    }),
                    opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0], {
                      ease: easeInOut,
                    }),
                  }}
                  className="h-full w-full absolute text-[3.5vmax]"
                >
                  <div className="h-full w-full flex flex-col justify-center items-center select-none">
                    <div className="flex justify-center items-center overflow-hidden w-full h-full">
                      <HeroText>appleicat/appleicat.github.io</HeroText>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.15, 0.7],
                      [0, 1],
                      {
                        ease: easeInOut,
                      }
                    ),
                    scale: useTransform(
                      scrollYProgress,
                      [0.15, 0.9],
                      [0.8, 1],
                      {
                        ease: easeInOut,
                      }
                    ),
                    display: useTransform(
                      scrollYProgress,
                      [0, 0.15, 1],
                      ['none', 'none', 'flex'],
                      {
                        ease: easeInOut,
                      }
                    ),
                  }}
                  className="h-full w-full absolute text-[7vmin]"
                >
                  <Github>appleicat</Github>
                </motion.div>
              </div>
            </section>
          </section>
        </motion.section>
        <section className="h-[300vh] -z-50" />
      </header>
      <main>
        <section className="mx-auto py-5 w-1/2 text-[5em]">Hı.</section>
        <section className="px-[5cqmin] py-5 text-[5em]">
          I'm frontend web developer.
        </section>
        <section className="px-[5cqmin] py-5 text-[5em]">
          Check out my
          <Link href="https://appleicat.github.io/qrc/">
            &nbsp;QRcode&nbsp;generator&nbsp;&rarr;&nbsp;
          </Link>
          or some kind of
          <Link href="https://appleicat.github.io/crypt/">
            &nbsp;cryptography&nbsp;&rarr;&nbsp;
          </Link>
          stuff.
        </section>
      </main>
      <section className="min-h-svh flex flex-col-reverse">
        <section className="mx-auto w-1/2 p-[5cqmin] bg-white text-black">
          <Repos>appleicat</Repos>
        </section>
      </section>
      {/* <footer>
        <section className="text-black bg-white">
          <section className="relative h-screen w-screen [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
            <section className="fixed h-screen w-screen inset-0"></section>
          </section>
        </section>
      </footer> */}
    </>
  );
}
