import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { IconChevronDown } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './navbar.module.css';
import Link from 'next/link';

const filmes = [
  {
    link: '#1',
    label: 'Filmes',
    links: [
      { link: '/docs', label: 'Produções' },
      { link: '/resources', label: 'Co-Produções' },
      { link: '/community', label: 'Futuro' },
    ],
  },
];
const sobre = [

  {
    link: '#2',
    label: 'Sobre',
    links: [
      { link: '/faq', label: 'Produtora' },
      { link: '/demo', label: 'Produtor' },
      { link: '/forums', label: 'Contactos' },
    ],
  },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);

  const dropFilmes = filmes.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal position="bottom-start">

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
    <header className={classes.header}>
      <Container size="xxl">
        <div className={classes.inner}>
            <Group gap={5} visibleFrom="sm">
                {dropFilmes}
            </Group>

            <Link href={'/'}> PRIMEIRA IDADE </Link>

            <Group gap={5} visibleFrom="sm">
                {dropSobre}
            </Group>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}