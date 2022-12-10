import { Dashboard, StackedLineChart, Insights } from '@mui/icons-material';
import * as S from './Sidebar.styled';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const items = [
    {
      icon: <Dashboard />,
      path: '/',
      label: 'Get Started',
    },
    {
      icon: <StackedLineChart />,
      path: '/overview',
      label: 'Overview',
    },
    {
      icon: <Insights />,
      path: '/insights',
      label: 'Insights',
    },
  ];

  function onResize(this: Window) {
    if (this.innerWidth > 800) {
      setOpen(false);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <S.Hamburger open={open} onClick={() => setOpen(!open)}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </S.Hamburger>
      <S.Aside open={open}>
        <S.Nav>
          <h2>Database comparison</h2>
          <S.List>
            {items.map((item) => (
              <S.Item key={item.label}>
                <NavLink
                  to={item.path}
                  onClick={() => setOpen(false)}
                  tabIndex={isMobile && open ? 0 : -1}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </S.Item>
            ))}
          </S.List>
        </S.Nav>
      </S.Aside>
    </>
  );
};

export default Sidebar;
