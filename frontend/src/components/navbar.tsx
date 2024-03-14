import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { IconChevronDown } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '@/styles/navbar.module.css';
import Link from 'next/link';
import {useMovieStore} from '@/store/store';
import { useRouter } from 'next/router';

const filmes = [
  {
    link: '/filmes',
    label: 'Filmes',
    category:'',
    links: [
      { link: '/filmes/docs', label: 'Produções', category: 'production' },
      { link: '/filmes/resources', label: 'Co-Produções', category: 'co-production'  },
      { link: '/filmes/community', label: 'Futuro', category: 'future'  },
    ],
  },
];
const sobre = [

  {
    link: '/about',
    label: 'Sobre',
    links: [
      { link: '/faq', label: 'Produtora' },
      { link: '/demo', label: 'Produtor' },
      { link: '/forums', label: 'Contactos' },
    ],
  },
];

export function Navbar() {
  const router = useRouter()
  const [opened, { toggle }] = useDisclosure(false);
 const { setFilter } = useMovieStore((state: any) => state);
  const dropFilmes = filmes.map((link) => {
    const menuItems = link.links?.map((item) => (
      // router.push(`/filmes`, router.asPath),
      <Menu.Item key={item.link} onClick={() =>(  setFilter(`${item.category}`))}>
        <Link href={link.link}>
        {item.label}
        </Link>
        
        </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal position="bottom-start">

          <Menu.Target>
            <Link
              href={link.link}
              className={classes.link}
              onClick={() =>(  setFilter(`${link.category}`))}
              // onClick={(event) => event.preventDefault()}
              
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                {/* <IconChevronDown size="0.9rem" stroke={1.5} /> */}
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown classNames={{}}>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });
  const dropSobre = sobre.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item className={classes.dropdowni} key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal position="bottom-end" >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                {/* <IconChevronDown size="0.9rem" stroke={1.5} /> */}
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown className={classes.dropdown}>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    // mix-blend-difference
    <header className='w-screen text-white z-50 fixed h-[rem(56px)] ' >
      <Container size="xxl">
        <div className={classes.inner}>
            <Group gap={5} visibleFrom="sm">
                {dropFilmes}
            </Group>

            <Link href='/'> PRIMEIRA IDADE </Link>

            <Group gap={5} visibleFrom="sm">
                {dropSobre}
            </Group>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}